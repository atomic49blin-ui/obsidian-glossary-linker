'use strict';

const { Menu, Notice } = require('obsidian');
const { MaterializePreviewModal, HarvestPreviewModal } = require('./modals');

// Turning terms into links + collecting aliases. Mixed into the plugin prototype.
module.exports = {
  buildMaterialization(text, currentCanonical) {
    const matches = this.findMatches(text, currentCanonical, { protect: true });
    const seen = new Set();
    const chosen = [];
    for (const m of matches) {
      if (this.settings.linkFirstOnly && seen.has(m.canonical)) continue;
      seen.add(m.canonical);
      chosen.push(m);
    }
    return this.applyLinks(text, chosen);
  },

  async materializeCurrent() {
    const file = this.app.workspace.getActiveFile();
    if (!file) { new Notice('No active note'); return; }
    const text = await this.app.vault.cachedRead(file);
    const { newText, changes } = this.buildMaterialization(text, this.canonicalForPath(file.path));
    if (!changes.length) { new Notice('Glossary Linker: no matches found'); return; }
    new MaterializePreviewModal(this.app, [{ file, original: text, newText, changes }], async (files) => {
      const f = files[0];
      if ((await this.app.vault.read(f.file)) !== f.original) {
        new Notice('Glossary Linker: note changed since preview, nothing written');
        return;
      }
      await this.app.vault.modify(f.file, f.newText);
      new Notice(`Glossary Linker: ${f.changes.length} link(s) created`);
      this.updateStatusBar();
    }).open();
  },

  materializeSelection(editor) {
    const sel = editor.getSelection();
    if (!sel) { new Notice('No selection'); return; }
    const file = this.app.workspace.getActiveFile();
    const { newText, changes } = this.buildMaterialization(sel, file ? this.canonicalForPath(file.path) : null);
    if (!changes.length) { new Notice('Glossary Linker: no matches found'); return; }
    new MaterializePreviewModal(this.app, [{ file: null, newText, changes, label: 'selection' }], () => {
      editor.replaceSelection(newText);
      new Notice(`Glossary Linker: ${changes.length} link(s) created`);
    }).open();
  },

  // Scan in-scope notes with compute(text, file) -> { newText, changes }, keeping
  // only files that changed, with a progress notice.
  async scanScope(compute) {
    const files = this.getScopeFiles();
    const fileChanges = [];
    const notice = new Notice('Glossary Linker: scanning…', 0);
    try {
      for (let i = 0; i < files.length; i++) {
        if (i % 25 === 0) notice.setMessage(`Glossary Linker: scanning ${i + 1}/${files.length}…`);
        const file = files[i];
        const text = await this.app.vault.cachedRead(file);
        const { newText, changes } = compute(text, file);
        if (changes.length) fileChanges.push({ file, original: text, newText, changes });
      }
    } finally {
      notice.hide();
    }
    return fileChanges;
  },

  previewMaterialization(fileChanges) {
    new MaterializePreviewModal(this.app, fileChanges, async (selected) => {
      let total = 0;
      let skipped = 0;
      // Skip notes edited since the preview rather than overwriting them with stale text.
      for (const f of selected) {
        if ((await this.app.vault.read(f.file)) !== f.original) { skipped++; continue; }
        await this.app.vault.modify(f.file, f.newText);
        total += f.changes.length;
      }
      let msg = `Glossary Linker: ${selected.length - skipped} file(s), ${total} link(s)`;
      if (skipped) msg += `, ${skipped} skipped (changed since preview)`;
      new Notice(msg);
      this.updateStatusBar();
    }).open();
  },

  async materializeScope() {
    const fileChanges = await this.scanScope((text, file) =>
      this.buildMaterialization(text, this.canonicalForPath(file.path)));
    if (!fileChanges.length) { new Notice('Glossary Linker: no matches found'); return; }
    this.previewMaterialization(fileChanges);
  },

  async createTermFromSelection(editor, replaceWithLink) {
    const sel = (editor.getSelection() || '').trim();
    if (!sel) { new Notice('Glossary Linker: nothing selected'); return; }
    const name = sel.replace(/[\\/:*?"<>|#^\[\]]/g, '').replace(/\s+/g, ' ').trim();
    if (!name) { new Notice('Glossary Linker: selection is not a valid term name'); return; }

    await this.ensureGlossaryFolder();
    const folder = this.settings.glossaryFolder.replace(/\/+$/, '');
    const path = folder ? `${folder}/${name}.md` : `${name}.md`;
    let file = this.app.vault.getAbstractFileByPath(path);
    if (file) {
      new Notice(`Glossary Linker: term "${name}" already exists`);
    } else {
      try { file = await this.app.vault.create(path, ''); }
      catch (e) { new Notice('Glossary Linker: could not create term note'); return; }
    }

    if (replaceWithLink) editor.replaceSelection(this.wikiLink(name, sel));
    this.rebuildIndex();
    this.updateStatusBar();
    await this.app.workspace.getLeaf('tab').openFile(file);
  },

  showLinkMenu(evt, canonical, display, file, nearOffset, occurrence) {
    const sourcePath = file ? file.path : '';
    const groups = [];

    if (file && this.settings.menuTurnInto) {
      groups.push((menu) => {
        menu.addItem((i) => i.setTitle('Turn into link').setIcon('link')
          .onClick(() => this.materializeSingle(file, canonical, display, nearOffset, occurrence)));
        menu.addItem((i) => i.setTitle(`Turn all "${canonical}" into links: this note`).setIcon('links-coming-in')
          .onClick(() => this.materializeTerm(file, canonical)));
        menu.addItem((i) => i.setTitle(`Turn all "${canonical}" into links: all notes`).setIcon('links-going-out')
          .onClick(() => this.materializeTermScope(canonical)));
      });
    }
    if (this.settings.menuExclude) {
      groups.push((menu) => {
        menu.addItem((i) => i.setTitle(`Add "${display}" to excluded words`).setIcon('ban')
          .onClick(() => this.addToExclusion('excludeWords', display.toLowerCase())));
        menu.addItem((i) => i.setTitle(`Add "${canonical}" to excluded terms`).setIcon('trash-2')
          .onClick(() => this.addToExclusion('excludeTerms', canonical)));
      });
    }
    if (this.settings.menuOpen) {
      groups.push((menu) => {
        menu.addItem((i) => i.setTitle('Open glossary note').setIcon('file-text')
          .onClick(() => this.openTerm(canonical, sourcePath, false)));
        menu.addItem((i) => i.setTitle('Open in new tab').setIcon('file-plus')
          .onClick(() => this.openTerm(canonical, sourcePath, true)));
      });
    }

    if (!groups.length) return false;
    const menu = new Menu();
    groups.forEach((group, i) => { if (i) menu.addSeparator(); group(menu); });
    evt.preventDefault();
    menu.showAtMouseEvent(evt);
    return true;
  },

  // Append a value to a newline list setting (excludeWords / excludeTerms) and apply it.
  async addToExclusion(listKey, value) {
    const lines = (this.settings[listKey] || '').split('\n').map((s) => s.trim()).filter(Boolean);
    if (lines.some((l) => l.toLowerCase() === value.toLowerCase())) {
      new Notice(`Glossary Linker: "${value}" is already excluded`);
      return;
    }
    lines.push(value);
    this.settings[listKey] = lines.join('\n');
    await this.saveSettings();
    this.rebuildIndex();
    this.rerenderViews();
    this.updateStatusBar();
    const where = listKey === 'excludeWords' ? 'excluded words' : 'excluded terms';
    new Notice(`Glossary Linker: added "${value}" to ${where}`);
  },

  async materializeSingle(file, canonical, display, nearOffset, occurrence) {
    const text = await this.app.vault.read(file);
    const matches = this.findMatches(text, this.canonicalForPath(file.path), { protect: true })
      .filter((m) => m.canonical === canonical && m.display === display);
    if (!matches.length) { new Notice('Glossary Linker: occurrence not found'); return; }
    let target = matches[0];
    if (occurrence != null && matches[occurrence]) {
      target = matches[occurrence];
    } else if (nearOffset != null) {
      target = matches.reduce((best, m) => (Math.abs(m.start - nearOffset) < Math.abs(best.start - nearOffset) ? m : best), matches[0]);
    }
    const { newText } = this.applyLinks(text, [target]);
    await this.app.vault.modify(file, newText);
    new Notice('Glossary Linker: link created');
    this.updateStatusBar();
  },

  async materializeTerm(file, canonical) {
    const text = await this.app.vault.read(file);
    const matches = this.findMatches(text, this.canonicalForPath(file.path), { protect: true })
      .filter((m) => m.canonical === canonical);
    if (!matches.length) { new Notice('Glossary Linker: no occurrences found'); return; }
    const { newText } = this.applyLinks(text, matches);
    await this.app.vault.modify(file, newText);
    new Notice(`Glossary Linker: ${matches.length} link(s) created`);
    this.updateStatusBar();
  },

  async materializeTermScope(canonical) {
    const fileChanges = await this.scanScope((text, file) => {
      let matches = this.findMatches(text, this.canonicalForPath(file.path), { protect: true })
        .filter((m) => m.canonical === canonical);
      if (this.settings.linkFirstOnly) matches = matches.slice(0, 1);
      return this.applyLinks(text, matches);
    });
    if (!fileChanges.length) { new Notice('Glossary Linker: no occurrences found'); return; }
    this.previewMaterialization(fileChanges);
  },

  // Keys and literals of a term's existing forms, so harvesting can skip what already matches.
  termFormKeys(file) {
    const forms = [file.basename, ...this.aliasesOf(file)].filter((x) => typeof x === 'string' && x.trim());
    const keys = new Set();
    const literals = new Set();
    for (const form of forms) {
      literals.add(form.toLowerCase());
      const words = this.tokenizeForm(form);
      if (words.length === 1) for (const k of words[0].keys) keys.add(k);
    }
    return { keys, literals };
  },

  harvestCandidates(display) {
    if (this.settings.harvestSingleWordOnly && this.tokenizeForm(display).length > 1) return [];
    const lower = display.toLowerCase();
    const out = [];
    const mode = this.settings.aliasHarvestMode;
    if (mode === 'literal' || mode === 'both') out.push(lower);
    if (mode === 'lemma' || mode === 'both') out.push(this.lemmaFor(display));
    const min = Math.max(1, this.settings.harvestMinLength || 1);
    return [...new Set(out)].filter((a) => a && a.length >= min);
  },

  async harvestFiles(files, silent) {
    const perTerm = new Map();

    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      if (!cache || !cache.links) continue;
      for (const link of cache.links) {
        const display = link.displayText;
        if (!display) continue;
        const targetFile = this.app.metadataCache.getFirstLinkpathDest(link.link, file.path);
        if (!targetFile || !this.isGlossaryFile(targetFile)) continue;
        if (display.toLowerCase() === targetFile.basename.toLowerCase()) continue;

        let entry = perTerm.get(targetFile.path);
        if (!entry) { entry = { file: targetFile, add: new Map(), info: this.termFormKeys(targetFile) }; perTerm.set(targetFile.path, entry); }

        for (const cand of this.harvestCandidates(display)) {
          if (entry.info.literals.has(cand)) continue;        // already the title or an alias
          if (entry.add.has(cand)) continue;                  // already queued
          if (this.keysFor(cand).some((k) => entry.info.keys.has(k))) continue; // already matched
          entry.add.set(cand, { source: display });
        }
      }
    }

    const additions = [];
    for (const entry of perTerm.values()) {
      if (entry.add.size) additions.push({ file: entry.file, aliases: [...entry.add.keys()] });
    }
    if (!additions.length) { if (!silent) new Notice('Glossary Linker: no new aliases found'); return; }

    const apply = async (selected) => {
      await this.ensureGlossaryFolder();
      let total = 0;
      for (const a of selected) {
        await this.app.fileManager.processFrontMatter(a.file, (fm) => {
          let list = fm.aliases;
          if (!Array.isArray(list)) list = (typeof list === 'string' && list.trim()) ? [list] : [];
          const existing = new Set(list.map((x) => String(x).toLowerCase()));
          for (const al of a.aliases) {
            if (!existing.has(al.toLowerCase())) { list.push(al); existing.add(al.toLowerCase()); total++; }
          }
          fm.aliases = list;
        });
      }
      this.rebuildIndex();
      this.updateStatusBar();
      new Notice(`Glossary Linker: ${total} alias(es) added`);
    };

    if (silent) { await apply(additions); return; }
    new HarvestPreviewModal(this.app, additions, apply).open();
  },
};
