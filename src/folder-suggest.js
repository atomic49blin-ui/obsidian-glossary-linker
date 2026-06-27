'use strict';

const obsidian = require('obsidian');
const { AbstractInputSuggest, TFolder } = obsidian;

// Folder autocomplete for a single-line text input. AbstractInputSuggest landed
// after the plugin's minAppVersion, so callers feature-detect before using this.
class FolderSuggest extends AbstractInputSuggest {
  constructor(app, inputEl) {
    super(app, inputEl);
    this.inputEl = inputEl;
  }

  getSuggestions(query) {
    const q = query.toLowerCase();
    return this.app.vault.getAllLoadedFiles()
      .filter((f) => f instanceof TFolder && f.path.toLowerCase().includes(q));
  }

  renderSuggestion(folder, el) {
    el.setText(folder.path || '/');
  }

  selectSuggestion(folder) {
    this.setValue(folder.path);
    this.inputEl.trigger('input');
    this.close();
  }
}

const folderSuggestAvailable = () => typeof AbstractInputSuggest === 'function';

module.exports = { FolderSuggest, folderSuggestAvailable };
