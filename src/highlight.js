'use strict';

// Highlighting in Reading view (DOM) and in the editor (CM6). Mixed into the plugin prototype.
module.exports = {
  processReadingMode(el, ctx) {
    if (!this.settings.highlightInReading) return;
    const sourcePath = ctx.sourcePath;
    const currentCanonical = this.canonicalForPath(sourcePath);

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        let p = node.parentElement;
        while (p) {
          const tag = p.tagName;
          if (tag === 'CODE' || tag === 'PRE' || tag === 'A') return NodeFilter.FILTER_REJECT;
          if (this.settings.skipHeadings && /^H[1-6]$/.test(tag)) return NodeFilter.FILTER_REJECT;
          if (p.classList && p.classList.contains('glossary-link')) return NodeFilter.FILTER_REJECT;
          if (p === el) break;
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) this.decorateTextNode(node, currentCanonical, sourcePath);
  },

  decorateTextNode(node, currentCanonical, sourcePath) {
    const text = node.textContent;
    if (!text || text.length < 2) return;
    const matches = this.findMatches(text, currentCanonical);
    if (!matches.length) return;

    const frag = document.createDocumentFragment();
    let cursor = 0;
    for (const m of matches) {
      if (m.start > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, m.start)));
      const canonical = m.canonical;
      const display = m.display;
      const a = document.createElement('a');
      a.className = 'internal-link glossary-link';
      a.textContent = display;
      a.href = canonical;
      a.setAttribute('data-href', canonical);
      if (m.alts && m.alts.length) a.title = 'Glossary: also matches ' + m.alts.join(', ');
      a.addEventListener('contextmenu', (e) => {
        const file = sourcePath ? this.app.vault.getAbstractFileByPath(sourcePath) : null;
        // Reading-rendered links carry no source offset, so identify the clicked
        // occurrence by its DOM-order index, which matches findMatches' order.
        const root = a.closest('.markdown-reading-view, .markdown-source-view, .markdown-preview-view') || a.ownerDocument;
        let occurrence = 0;
        for (const other of root.querySelectorAll('a.glossary-link')) {
          if (other === a) break;
          if (other.getAttribute('data-href') === canonical && other.textContent === display) occurrence++;
        }
        if (this.showLinkMenu(e, canonical, display, file, null, occurrence)) e.stopPropagation();
      });
      frag.appendChild(a);
      cursor = m.end;
    }
    if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
    node.parentNode.replaceChild(frag, node);
  },

  // Editor highlight (Live Preview / Source). Always registered; the
  // editingHighlight setting controls if and how often it recomputes.
  registerEditingHighlight() {
    let view, state, language;
    try {
      view = require('@codemirror/view');
      state = require('@codemirror/state');
      language = require('@codemirror/language');
    } catch (e) {
      console.warn('Glossary Linker: CM6 modules unavailable, editor highlight disabled', e);
      return;
    }
    const { ViewPlugin, Decoration } = view;
    const { RangeSetBuilder, StateEffect } = state;
    const { syntaxTree } = language;
    const plugin = this;

    const refresh = StateEffect.define();
    this.cmRefreshEffect = refresh;

    const markCache = new Map();
    const markFor = (canonical) => {
      let m = markCache.get(canonical);
      if (!m) {
        m = Decoration.mark({ class: 'cm-glossary-link', attributes: { 'data-glossary-target': canonical } });
        markCache.set(canonical, m);
      }
      return m;
    };
    // Collision marks carry a per-match title, so they are not cached.
    const markWithAlts = (canonical, alts) => Decoration.mark({
      class: 'cm-glossary-link',
      attributes: { 'data-glossary-target': canonical, title: 'Glossary: also matches ' + alts.join(', ') },
    });

    const skipNode = (name) => /code|link|url|header|hashtag|frontmatter|comment|tag|escape/i.test(name);

    const buildDeco = (editorView) => {
      const builder = new RangeSetBuilder();
      const currentCanonical = plugin.activeCanonical();
      const tree = syntaxTree(editorView.state);
      for (const { from, to } of editorView.visibleRanges) {
        const text = editorView.state.doc.sliceString(from, to);
        for (const m of plugin.findMatches(text, currentCanonical)) {
          const start = from + m.start;
          const end = from + m.end;
          let skip = false;
          tree.iterate({ from: start, to: end, enter: (n) => { if (skipNode(n.type.name)) skip = true; } });
          if (!skip) builder.add(start, end, m.alts && m.alts.length ? markWithAlts(m.canonical, m.alts) : markFor(m.canonical));
        }
      }
      return builder.finish();
    };

    const targetEl = (e) => (e.target instanceof HTMLElement ? e.target.closest('.cm-glossary-link') : null);
    const canonicalOf = (el) => el.getAttribute('data-glossary-target');

    const vp = ViewPlugin.fromClass(
      class {
        constructor(v) { this.decorations = plugin.settings.editingHighlight === 'off' ? Decoration.none : buildDeco(v); }
        update(u) {
          const mode = plugin.settings.editingHighlight;
          if (mode === 'off') { if (this.decorations.size) this.decorations = Decoration.none; return; }
          const forced = u.transactions.some((tr) => tr.effects.some((e) => e.is(refresh)));
          if (u.viewportChanged || forced || (mode === 'live' && (u.docChanged || u.selectionSet))) {
            this.decorations = buildDeco(u.view);
          } else if (u.docChanged) {
            this.decorations = this.decorations.map(u.changes);
          }
        }
      },
      {
        decorations: (v) => v.decorations,
        eventHandlers: {
          mousedown(e) {
            const el = targetEl(e);
            if (!el) return;
            const file = plugin.app.workspace.getActiveFile();
            const sourcePath = file ? file.path : '';
            // Like Obsidian's links: middle-click opens a tab, Ctrl/Cmd+click follows.
            if (e.button === 1) {
              plugin.openTerm(canonicalOf(el), sourcePath, true);
              e.preventDefault();
              return;
            }
            if (e.button !== 0 || !(e.ctrlKey || e.metaKey)) return;
            plugin.openTerm(canonicalOf(el), sourcePath, false);
            e.preventDefault();
          },
          mouseover(e) {
            const el = targetEl(e);
            if (!el) return;
            const file = plugin.app.workspace.getActiveFile();
            plugin.hoverTerm(e, el, canonicalOf(el), file ? file.path : '');
          },
          contextmenu(e, view) {
            const el = targetEl(e);
            if (!el) return;
            // Read the term off the clicked decoration; posAtDOM gives its doc offset.
            const file = plugin.app.workspace.getActiveFile();
            plugin.showLinkMenu(e, canonicalOf(el), el.textContent, file, view.posAtDOM(el));
          },
        },
      }
    );
    this.registerEditorExtension(vp);
  },
};
