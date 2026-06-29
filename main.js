/* Glossary Linker — bundled from src/ by esbuild. Do not edit directly; edit src/ and run "npm run build". */
"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/constants.js
var require_constants = __commonJS({
  "src/constants.js"(exports2, module2) {
    "use strict";
    var DEFAULT_SETTINGS2 = {
      glossaryFolder: "glossary",
      termTemplate: "",
      // path to a template note; empty = create an empty note (as before)
      scopeMode: "vault",
      // 'folders' | 'vault'
      scopeFolders: "",
      excludeFolders: "",
      matchMode: "stemmer",
      // 'stemmer' | 'endingStrip' | 'exact'
      minTermLength: 2,
      // forms (title/alias) shorter than this are not indexed — keeps single letters from matching everywhere
      enabledLanguages: null,
      // null until first-run defaults are picked
      languageOrder: [],
      // ids in priority order (first = highest); overrides module defaults
      aliasHarvestMode: "lemma",
      // 'lemma' | 'literal' | 'both'
      harvestOnSave: "off",
      // 'off' | 'silent' | 'preview'
      harvestSingleWordOnly: true,
      harvestMinLength: 2,
      excludeTerms: "",
      excludeWords: "",
      linkFirstOnly: false,
      linkSuggest: false,
      // offer [[link]] autocomplete while typing
      suggestMinChars: 3,
      // min typed length before autocomplete triggers
      aliasCollisionWarnings: true,
      // warn when a collected/created alias collides with another term
      candidateMinNotes: 3,
      // overview: a candidate must appear in at least this many notes
      overviewSort: "usage",
      // overview terms order: 'usage' | 'name'
      overviewCandidateSort: "notes",
      // overview candidates order: 'notes' | 'count'
      overviewCountLinks: true,
      // overview usage count also counts direct [[Term]] links
      overviewWholeVault: false,
      // overview scans every note instead of the linker scope
      overviewTermsCollapsed: false,
      overviewCandidatesCollapsed: false,
      showRibbonIcon: true,
      highlightInReading: true,
      editingHighlight: "live",
      // 'off' | 'live' | 'onSave'
      skipHeadings: true,
      statusBar: true,
      statusBarIncludeLinks: true,
      menuTurnInto: true,
      menuCollect: true,
      menuOpen: true,
      menuCreateTerm: true,
      menuExclude: true,
      menuUnlink: true
    };
    var splitLines2 = (s) => (s || "").split("\n").map((x) => x.trim()).filter(Boolean);
    var sanitizeFolder2 = (s) => (s || "").split("/").map((x) => x.trim()).filter((x) => x && x !== "." && x !== "..").join("/");
    module2.exports = { DEFAULT_SETTINGS: DEFAULT_SETTINGS2, splitLines: splitLines2, sanitizeFolder: sanitizeFolder2 };
  }
});

// languages/ru.js
var require_ru = __commonJS({
  "languages/ru.js"(exports2, module2) {
    "use strict";
    var RVRE = /^(.*?[аеиоуыэюя])(.*)$/;
    var PERFECTIVEGROUND = /((ив|ивши|ившись|ыв|ывши|ывшись)|((?<=[ая])(в|вши|вшись)))$/;
    var REFLEXIVE = /(с[яь])$/;
    var ADJECTIVE = /(ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$/;
    var PARTICIPLE = /((ивш|ывш|ующ)|((?<=[ая])(ем|нн|вш|ющ|щ)))$/;
    var VERB = /((ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)|((?<=[ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)))$/;
    var NOUN = /(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/;
    var DERIVATIONAL = /[^аеиоуыэюя][аеиоуыэюя]+[^аеиоуыэюя]+[аеиоуыэюя].*(?:[^аеиоуыэюя]+[аеиоуыэюя]+[^аеиоуыэюя]+)?(ость?)$/;
    var DER = /ость?$/;
    var SUPERLATIVE = /(ейше|ейш)$/;
    var I = /и$/;
    var P = /ь$/;
    var NN = /нн$/;
    var ENDINGS = [
      "\u0438\u044F\u043C\u0438",
      "\u044F\u043C\u0438",
      "\u0430\u043C\u0438",
      "\u0430\u0445",
      "\u044F\u0445",
      "\u043E\u0432",
      "\u0435\u0432",
      "\u043E\u044E",
      "\u0435\u044E",
      "\u043E\u043C",
      "\u0435\u043C",
      "\u0430\u043C",
      "\u044F\u043C",
      "\u043E\u0433\u043E",
      "\u0435\u0433\u043E",
      "\u043E\u043C\u0443",
      "\u0435\u043C\u0443",
      "\u044B\u043C\u0438",
      "\u0438\u043C\u0438",
      "\u043E\u0439",
      "\u0435\u0439",
      "\u0438\u0439",
      "\u044B\u0439",
      "\u0443\u044E",
      "\u044E\u044E",
      "\u0430",
      "\u044F",
      "\u0443",
      "\u044E",
      "\u043E",
      "\u0435",
      "\u0438",
      "\u044B",
      "\u044C"
    ].sort((a, b) => b.length - a.length);
    var VOWELS = "\u0430\u0435\u0451\u0438\u043E\u0443\u044B\u044D\u044E\u044F";
    function stem(word) {
      word = word.toLowerCase().replace(/ё/g, "\u0435");
      const m = RVRE.exec(word);
      if (!m)
        return word;
      const pre = m[1];
      let rv = m[2];
      let temp = rv.replace(PERFECTIVEGROUND, "");
      if (temp === rv) {
        rv = rv.replace(REFLEXIVE, "");
        temp = rv.replace(ADJECTIVE, "");
        if (temp !== rv) {
          rv = temp.replace(PARTICIPLE, "");
        } else {
          temp = rv.replace(VERB, "");
          rv = temp === rv ? rv.replace(NOUN, "") : temp;
        }
      } else {
        rv = temp;
      }
      rv = rv.replace(I, "");
      if (DERIVATIONAL.test(rv))
        rv = rv.replace(DER, "");
      temp = rv.replace(P, "");
      if (temp === rv) {
        rv = rv.replace(SUPERLATIVE, "");
        rv = rv.replace(NN, "\u043D");
      } else {
        rv = temp;
      }
      return pre + rv;
    }
    function strip(word) {
      word = word.toLowerCase().replace(/ё/g, "\u0435");
      for (const e of ENDINGS) {
        if (word.length - e.length >= 3 && word.endsWith(e))
          return word.slice(0, -e.length);
      }
      return word;
    }
    function stemKeys(word) {
      const es = strip(word);
      const st = stem(word);
      if (st !== es && es.length - st.length <= 1)
        return [es, st];
      return [es];
    }
    function softStemNoun(word) {
      const w = word.toLowerCase().replace(/ё/g, "\u0435");
      if (w.length > 3 && w.endsWith("\u0435\u043C")) {
        const before = w[w.length - 3];
        if (VOWELS.includes(before))
          return w.slice(0, -2) + "\u0439";
      }
      return null;
    }
    function lemma(word) {
      return softStemNoun(word) || strip(word);
    }
    module2.exports = {
      id: "ru",
      name: "Russian",
      priority: 0,
      match: (word) => /[Ѐ-ӿ]/.test(word),
      keys(word, mode) {
        const w = word.toLowerCase();
        if (mode === "exact")
          return [w];
        const keyer = (x) => mode === "endingStrip" ? [strip(x)] : stemKeys(x);
        const ks = keyer(w);
        const soft = softStemNoun(w);
        if (soft) {
          for (const sk of keyer(soft))
            if (!ks.includes(sk))
              ks.push(sk);
        }
        return ks;
      },
      lemma
    };
  }
});

// languages/uk.js
var require_uk = __commonJS({
  "languages/uk.js"(exports2, module2) {
    "use strict";
    var ENDINGS = [
      "\u0430\u043C\u0438",
      "\u044F\u043C\u0438",
      "\u043E\u0432\u0456",
      "\u0435\u0432\u0456",
      "\u043E\u0433\u043E",
      "\u043E\u043C\u0443",
      "\u0435\u043C\u0443",
      "\u0438\u043C\u0438",
      "\u0438\u0445",
      "\u0430\u0445",
      "\u044F\u0445",
      "\u0456\u0432",
      "\u043E\u044E",
      "\u0435\u044E",
      "\u043E\u043C",
      "\u0435\u043C",
      "\u0435\u0439",
      "\u0438\u0439",
      "\u0456\u0439",
      "\u0430",
      "\u044F",
      "\u0443",
      "\u044E",
      "\u0435",
      "\u043E",
      "\u0438",
      "\u0456",
      "\u0457",
      "\u044C"
    ].sort((a, b) => b.length - a.length);
    var CLOSED_SYLLABLE = /^(.*)і([^аеєиіїоуюя]+)$/;
    function strip(word) {
      const w = word.toLowerCase();
      for (const e of ENDINGS) {
        if (w.length - e.length >= 3 && w.endsWith(e))
          return w.slice(0, -e.length);
      }
      return w;
    }
    function alternations(stem) {
      const m = CLOSED_SYLLABLE.exec(stem);
      return m ? [m[1] + "\u043E" + m[2], m[1] + "\u0435" + m[2]] : [];
    }
    module2.exports = {
      id: "uk",
      name: "Ukrainian",
      priority: 0,
      match: (word) => /[а-яіїєґ]/i.test(word),
      keys(word, mode) {
        const w = word.toLowerCase();
        if (mode === "exact")
          return [w];
        if (mode === "endingStrip")
          return [strip(w)];
        const stem = strip(w);
        return [.../* @__PURE__ */ new Set([stem, ...alternations(stem)])];
      },
      lemma: (word) => strip(word)
    };
  }
});

// languages/en.js
var require_en = __commonJS({
  "languages/en.js"(exports2, module2) {
    "use strict";
    var STEP2 = { ational: "ate", tional: "tion", enci: "ence", anci: "ance", izer: "ize", bli: "ble", alli: "al", entli: "ent", eli: "e", ousli: "ous", ization: "ize", ation: "ate", ator: "ate", alism: "al", iveness: "ive", fulness: "ful", ousness: "ous", aliti: "al", iviti: "ive", biliti: "ble", logi: "log" };
    var STEP3 = { icate: "ic", ative: "", alize: "al", iciti: "ic", ical: "ic", ful: "", ness: "" };
    var C = "[^aeiou]";
    var V = "[aeiouy]";
    var CC = C + "[^aeiouy]*";
    var VV = V + "[aeiou]*";
    var MGR0 = new RegExp("^(" + CC + ")?" + VV + CC);
    var MEQ1 = new RegExp("^(" + CC + ")?" + VV + CC + "(" + VV + ")?$");
    var MGR1 = new RegExp("^(" + CC + ")?" + VV + CC + VV + CC);
    var S_V = new RegExp("^(" + CC + ")?" + V);
    function stem(word) {
      let w = word.toLowerCase();
      if (w.length < 3)
        return w;
      let st, suffix, fp, re, re2, re3, re4;
      const firstch = w.substr(0, 1);
      if (firstch === "y")
        w = firstch.toUpperCase() + w.substr(1);
      re = /^(.+?)(ss|i)es$/;
      re2 = /^(.+?)([^s])s$/;
      if (re.test(w))
        w = w.replace(re, "$1$2");
      else if (re2.test(w))
        w = w.replace(re2, "$1$2");
      re = /^(.+?)eed$/;
      re2 = /^(.+?)(ed|ing)$/;
      if (re.test(w)) {
        fp = re.exec(w);
        if (MGR0.test(fp[1]))
          w = w.replace(/.$/, "");
      } else if (re2.test(w)) {
        fp = re2.exec(w);
        st = fp[1];
        if (S_V.test(st)) {
          w = st;
          re2 = /(at|bl|iz)$/;
          re3 = /([^aeiouylsz])\1$/;
          re4 = new RegExp("^" + CC + V + "[^aeiouwxy]$");
          if (re2.test(w))
            w = w + "e";
          else if (re3.test(w))
            w = w.replace(/.$/, "");
          else if (re4.test(w))
            w = w + "e";
        }
      }
      re = /^(.+?)y$/;
      if (re.test(w)) {
        fp = re.exec(w);
        st = fp[1];
        if (S_V.test(st))
          w = st + "i";
      }
      re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
      if (re.test(w)) {
        fp = re.exec(w);
        st = fp[1];
        suffix = fp[2];
        if (MGR0.test(st))
          w = st + STEP2[suffix];
      }
      re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
      if (re.test(w)) {
        fp = re.exec(w);
        st = fp[1];
        suffix = fp[2];
        if (MGR0.test(st))
          w = st + STEP3[suffix];
      }
      re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
      re2 = /^(.+?)(s|t)(ion)$/;
      if (re.test(w)) {
        fp = re.exec(w);
        st = fp[1];
        if (MGR1.test(st))
          w = st;
      } else if (re2.test(w)) {
        fp = re2.exec(w);
        st = fp[1] + fp[2];
        if (MGR1.test(st))
          w = st;
      }
      re = /^(.+?)e$/;
      if (re.test(w)) {
        fp = re.exec(w);
        st = fp[1];
        re3 = new RegExp("^" + CC + V + "[^aeiouwxy]$");
        if (MGR1.test(st) || MEQ1.test(st) && !re3.test(st))
          w = st;
      }
      if (/ll$/.test(w) && MGR1.test(w))
        w = w.replace(/.$/, "");
      if (firstch === "y")
        w = firstch.toLowerCase() + w.substr(1);
      return w;
    }
    function strip(word) {
      const w = word.toLowerCase();
      if (w.length > 4 && w.endsWith("ies"))
        return w.slice(0, -3) + "y";
      if (w.length > 3 && w.endsWith("es"))
        return w.slice(0, -2);
      if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss"))
        return w.slice(0, -1);
      return w;
    }
    function stemKeys(word) {
      return [stem(word)];
    }
    function lemma(word) {
      return stem(word.toLowerCase());
    }
    module2.exports = {
      id: "en",
      name: "English",
      priority: 0,
      match: (word) => /[A-Za-z]/.test(word),
      keys(word, mode) {
        const w = word.toLowerCase();
        if (mode === "exact")
          return [w];
        if (mode === "endingStrip")
          return [strip(w)];
        return stemKeys(w);
      },
      lemma
    };
  }
});

// languages/es.js
var require_es = __commonJS({
  "languages/es.js"(exports2, module2) {
    "use strict";
    function fold(word) {
      return word.toLowerCase().replace(/[àáâä]/g, "a").replace(/[òóôö]/g, "o").replace(/[èéêë]/g, "e").replace(/[ùúûü]/g, "u").replace(/[ìíîï]/g, "i");
    }
    function stem(word) {
      const s = fold(word);
      const len = s.length;
      if (len < 5)
        return s;
      const last = s[len - 1];
      if (last === "o" || last === "a" || last === "e")
        return s.slice(0, len - 1);
      if (last === "s") {
        if (s[len - 2] === "e" && s[len - 3] === "s" && s[len - 4] === "e")
          return s.slice(0, len - 2);
        if (s[len - 2] === "e" && s[len - 3] === "c")
          return s.slice(0, len - 3) + "z";
        if (s[len - 2] === "o" || s[len - 2] === "a" || s[len - 2] === "e")
          return s.slice(0, len - 2);
      }
      return s;
    }
    function strip(word) {
      const s = fold(word);
      if (s.length > 4 && s.endsWith("ces"))
        return s.slice(0, -3) + "z";
      if (s.length > 3 && s.endsWith("es"))
        return s.slice(0, -2);
      if (s.length > 3 && s.endsWith("s"))
        return s.slice(0, -1);
      return s;
    }
    function stemKeys(word) {
      const a = stem(word);
      const b = strip(word);
      return a === b ? [a] : [a, b];
    }
    function lemma(word) {
      return strip(word);
    }
    module2.exports = {
      id: "es",
      name: "Spanish",
      priority: 0,
      match: (word) => /[a-záéíóúüñ]/i.test(word),
      keys(word, mode) {
        const w = word.toLowerCase();
        if (mode === "exact")
          return [w];
        if (mode === "endingStrip")
          return [strip(w)];
        return stemKeys(w);
      },
      lemma
    };
  }
});

// languages/de.js
var require_de = __commonJS({
  "languages/de.js"(exports2, module2) {
    "use strict";
    function fold(word) {
      return word.toLowerCase().replace(/ß/g, "ss").replace(/[äàáâ]/g, "a").replace(/[öòóô]/g, "o").replace(/[ïìíî]/g, "i").replace(/[üùúû]/g, "u");
    }
    function stEnding(ch) {
      return ch === "b" || ch === "d" || ch === "f" || ch === "g" || ch === "h" || ch === "k" || ch === "l" || ch === "m" || ch === "n" || ch === "t";
    }
    function step1(s, len) {
      if (len > 5 && s[len - 3] === "e" && s[len - 2] === "r" && s[len - 1] === "n")
        return len - 3;
      if (len > 4 && s[len - 2] === "e") {
        const c = s[len - 1];
        if (c === "m" || c === "n" || c === "r" || c === "s")
          return len - 2;
      }
      if (len > 3 && s[len - 1] === "e")
        return len - 1;
      if (len > 3 && s[len - 1] === "s" && stEnding(s[len - 2]))
        return len - 1;
      return len;
    }
    function step2(s, len) {
      if (len > 5 && s[len - 3] === "e" && s[len - 2] === "s" && s[len - 1] === "t")
        return len - 3;
      if (len > 4 && s[len - 2] === "e" && (s[len - 1] === "r" || s[len - 1] === "n"))
        return len - 2;
      if (len > 4 && s[len - 2] === "s" && s[len - 1] === "t" && stEnding(s[len - 3]))
        return len - 2;
      return len;
    }
    function stem(word) {
      const s = fold(word);
      let len = s.length;
      len = step1(s, len);
      len = step2(s, len);
      return s.slice(0, len);
    }
    function strip(word) {
      const s = fold(word);
      for (const e of ["en", "er", "es", "e", "n", "s"]) {
        if (s.length - e.length >= 3 && s.endsWith(e))
          return s.slice(0, -e.length);
      }
      return s;
    }
    function stemKeys(word) {
      const a = stem(word);
      const b = strip(word);
      return a === b ? [a] : [a, b];
    }
    function lemma(word) {
      return strip(word);
    }
    module2.exports = {
      id: "de",
      name: "German",
      priority: 0,
      match: (word) => /[a-zäöüß]/i.test(word),
      keys(word, mode) {
        const w = word.toLowerCase();
        if (mode === "exact")
          return [w];
        if (mode === "endingStrip")
          return [strip(w)];
        return stemKeys(w);
      },
      lemma
    };
  }
});

// languages/fr.js
var require_fr = __commonJS({
  "languages/fr.js"(exports2, module2) {
    "use strict";
    function endsWith(s, len, suffix) {
      const sl = suffix.length;
      if (sl > len)
        return false;
      for (let i = 0; i < sl; i++)
        if (s[len - sl + i] !== suffix[i])
          return false;
      return true;
    }
    function deleteAt(s, pos, len) {
      for (let i = pos; i < len - 1; i++)
        s[i] = s[i + 1];
      return len - 1;
    }
    function norm(s, len) {
      if (len > 4) {
        for (let i = 0; i < len; i++) {
          switch (s[i]) {
            case "\xE0":
            case "\xE1":
            case "\xE2":
              s[i] = "a";
              break;
            case "\xF4":
              s[i] = "o";
              break;
            case "\xE8":
            case "\xE9":
            case "\xEA":
              s[i] = "e";
              break;
            case "\xF9":
            case "\xFB":
              s[i] = "u";
              break;
            case "\xEE":
              s[i] = "i";
              break;
            case "\xE7":
              s[i] = "c";
              break;
          }
        }
        let ch = s[0];
        for (let i = 1; i < len; i++) {
          if (s[i] === ch && /[a-z]/.test(ch))
            len = deleteAt(s, i--, len);
          else
            ch = s[i];
        }
      }
      if (len > 4 && endsWith(s, len, "ie"))
        len -= 2;
      if (len > 4) {
        if (s[len - 1] === "r")
          len--;
        if (s[len - 1] === "e")
          len--;
        if (s[len - 1] === "e")
          len--;
        if (s[len - 1] === s[len - 2] && /[a-z]/.test(s[len - 1]))
          len--;
      }
      return len;
    }
    function stemArr(s, len) {
      if (len > 5 && s[len - 1] === "x") {
        if (s[len - 3] === "a" && s[len - 2] === "u" && s[len - 4] !== "e")
          s[len - 2] = "l";
        len--;
      }
      if (len > 3 && s[len - 1] === "x")
        len--;
      if (len > 3 && s[len - 1] === "s")
        len--;
      if (len > 9 && endsWith(s, len, "issement")) {
        len -= 6;
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 8 && endsWith(s, len, "issant")) {
        len -= 4;
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 6 && endsWith(s, len, "ement")) {
        len -= 4;
        if (len > 3 && endsWith(s, len, "ive")) {
          len--;
          s[len - 1] = "f";
        }
        return norm(s, len);
      }
      if (len > 11 && endsWith(s, len, "ficatrice")) {
        len -= 5;
        s[len - 2] = "e";
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 10 && endsWith(s, len, "ficateur")) {
        len -= 4;
        s[len - 2] = "e";
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 9 && endsWith(s, len, "catrice")) {
        len -= 3;
        s[len - 4] = "q";
        s[len - 3] = "u";
        s[len - 2] = "e";
        return norm(s, len);
      }
      if (len > 8 && endsWith(s, len, "cateur")) {
        len -= 2;
        s[len - 4] = "q";
        s[len - 3] = "u";
        s[len - 2] = "e";
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 8 && endsWith(s, len, "atrice")) {
        len -= 4;
        s[len - 2] = "e";
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 7 && endsWith(s, len, "ateur")) {
        len -= 3;
        s[len - 2] = "e";
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 6 && endsWith(s, len, "trice")) {
        len--;
        s[len - 3] = "e";
        s[len - 2] = "u";
        s[len - 1] = "r";
      }
      if (len > 5 && endsWith(s, len, "i\xE8me"))
        return norm(s, len - 4);
      if (len > 7 && endsWith(s, len, "teuse")) {
        len -= 2;
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 6 && endsWith(s, len, "teur")) {
        len--;
        s[len - 1] = "r";
        return norm(s, len);
      }
      if (len > 5 && endsWith(s, len, "euse"))
        return norm(s, len - 2);
      if (len > 8 && endsWith(s, len, "\xE8re")) {
        len--;
        s[len - 2] = "e";
        return norm(s, len);
      }
      if (len > 7 && endsWith(s, len, "ive")) {
        len--;
        s[len - 1] = "f";
        return norm(s, len);
      }
      if (len > 4 && (endsWith(s, len, "folle") || endsWith(s, len, "molle"))) {
        len -= 2;
        s[len - 1] = "u";
        return norm(s, len);
      }
      if (len > 9 && endsWith(s, len, "nnelle"))
        return norm(s, len - 5);
      if (len > 9 && endsWith(s, len, "nnel"))
        return norm(s, len - 3);
      if (len > 4 && endsWith(s, len, "\xE8te")) {
        len--;
        s[len - 2] = "e";
      }
      if (len > 8 && endsWith(s, len, "ique"))
        len -= 4;
      if (len > 8 && endsWith(s, len, "esse"))
        return norm(s, len - 3);
      if (len > 7 && endsWith(s, len, "inage"))
        return norm(s, len - 3);
      if (len > 9 && endsWith(s, len, "isation")) {
        len -= 7;
        if (len > 5 && endsWith(s, len, "ual"))
          s[len - 2] = "e";
        return norm(s, len);
      }
      if (len > 9 && endsWith(s, len, "isateur"))
        return norm(s, len - 7);
      if (len > 8 && endsWith(s, len, "ation"))
        return norm(s, len - 5);
      if (len > 8 && endsWith(s, len, "ition"))
        return norm(s, len - 5);
      return norm(s, len);
    }
    function stem(word) {
      const arr = word.toLowerCase().split("");
      const len = stemArr(arr, arr.length);
      return arr.slice(0, len).join("");
    }
    function fold(word) {
      return word.toLowerCase().replace(/[àâä]/g, "a").replace(/[ôö]/g, "o").replace(/[èéêë]/g, "e").replace(/[ùûü]/g, "u").replace(/[îï]/g, "i").replace(/ç/g, "c").replace(/ÿ/g, "y");
    }
    function strip(word) {
      const s = fold(word);
      if (s.length > 3 && (s.endsWith("s") || s.endsWith("x")))
        return s.slice(0, -1);
      return s;
    }
    function stemKeys(word) {
      const a = stem(word);
      const b = strip(word);
      return a === b ? [a] : [a, b];
    }
    function lemma(word) {
      return strip(word);
    }
    module2.exports = {
      id: "fr",
      name: "French",
      priority: 0,
      match: (word) => /[a-zàâäçéèêëîïôöùûüÿ]/i.test(word),
      keys(word, mode) {
        const w = word.toLowerCase();
        if (mode === "exact")
          return [w];
        if (mode === "endingStrip")
          return [strip(w)];
        return stemKeys(w);
      },
      lemma
    };
  }
});

// src/builtin-languages.js
var require_builtin_languages = __commonJS({
  "src/builtin-languages.js"(exports2, module2) {
    "use strict";
    module2.exports = [
      require_ru(),
      require_uk(),
      require_en(),
      require_es(),
      require_de(),
      require_fr()
    ];
  }
});

// src/language-api.js
var require_language_api = __commonJS({
  "src/language-api.js"(exports2, module2) {
    "use strict";
    var MATCH_MODES = ["stemmer", "endingStrip", "exact"];
    var ID_PATTERN = /^[a-z][a-z0-9-]*$/;
    function validateLanguage2(lang) {
      if (!lang || typeof lang !== "object")
        return "module does not export an object";
      if (typeof lang.id !== "string" || !ID_PATTERN.test(lang.id))
        return 'invalid "id" (expected a lowercase code like "en")';
      if (typeof lang.name !== "string" || !lang.name.trim())
        return 'missing "name"';
      if ("priority" in lang && typeof lang.priority !== "number")
        return '"priority" must be a number';
      if (typeof lang.match !== "function")
        return "missing match(word) function";
      if (typeof lang.keys !== "function")
        return "missing keys(word, mode) function";
      if ("lemma" in lang && typeof lang.lemma !== "function")
        return '"lemma" must be a function';
      const sample = lang.id;
      try {
        lang.match(sample);
      } catch (e) {
        return `match() threw: ${e && e.message || e}`;
      }
      for (const mode of MATCH_MODES) {
        let out;
        try {
          out = lang.keys(sample, mode);
        } catch (e) {
          return `keys() threw in mode "${mode}": ${e && e.message || e}`;
        }
        if (!Array.isArray(out) || !out.length || out.some((k) => typeof k !== "string")) {
          return `keys() must return a non-empty array of strings (mode "${mode}")`;
        }
      }
      return null;
    }
    module2.exports = { MATCH_MODES, ID_PATTERN, validateLanguage: validateLanguage2 };
  }
});

// src/folder-suggest.js
var require_folder_suggest = __commonJS({
  "src/folder-suggest.js"(exports2, module2) {
    "use strict";
    var obsidian = require("obsidian");
    var { AbstractInputSuggest, TFolder: TFolder2 } = obsidian;
    var FolderSuggest = class extends AbstractInputSuggest {
      constructor(app, inputEl) {
        super(app, inputEl);
        this.inputEl = inputEl;
      }
      getSuggestions(query) {
        const q = query.toLowerCase();
        return this.app.vault.getAllLoadedFiles().filter((f) => f instanceof TFolder2 && f.path.toLowerCase().includes(q));
      }
      renderSuggestion(folder, el) {
        el.setText(folder.path || "/");
      }
      selectSuggestion(folder) {
        this.setValue(folder.path);
        this.inputEl.trigger("input");
        this.close();
      }
    };
    var FileSuggest = class extends AbstractInputSuggest {
      constructor(app, inputEl) {
        super(app, inputEl);
        this.inputEl = inputEl;
      }
      getSuggestions(query) {
        const q = query.toLowerCase();
        return this.app.vault.getMarkdownFiles().filter((f) => f.path.toLowerCase().includes(q)).slice(0, 50);
      }
      renderSuggestion(file, el) {
        el.setText(file.path);
      }
      selectSuggestion(file) {
        this.setValue(file.path);
        this.inputEl.trigger("input");
        this.close();
      }
    };
    var folderSuggestAvailable = () => typeof AbstractInputSuggest === "function";
    module2.exports = { FolderSuggest, FileSuggest, folderSuggestAvailable };
  }
});

// src/settings-tab.js
var require_settings_tab = __commonJS({
  "src/settings-tab.js"(exports2, module2) {
    "use strict";
    var { PluginSettingTab, Setting, Notice: Notice2 } = require("obsidian");
    var { sanitizeFolder: sanitizeFolder2 } = require_constants();
    var { FolderSuggest, FileSuggest, folderSuggestAvailable } = require_folder_suggest();
    var GlossaryLinkerSettingTab2 = class extends PluginSettingTab {
      constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
      }
      display() {
        const { containerEl } = this;
        containerEl.empty();
        const s = this.plugin.settings;
        const save = async (rebuild) => {
          await this.plugin.saveSettings();
          if (rebuild) {
            this.plugin.rebuildIndex();
            this.plugin.rerenderViews();
            this.plugin.updateStatusBar();
          }
        };
        const saveScope = async () => {
          await this.plugin.saveSettings();
          this.plugin.rerenderViews();
          this.plugin.updateStatusBar();
          this.plugin.refreshOverviewDebounced();
        };
        containerEl.createEl("h3", { text: "Scope" });
        new Setting(containerEl).setName("Glossary folder").setDesc("Folder with one note per term (file name = the term title).").addText((t) => {
          t.setValue(s.glossaryFolder).onChange(async (v) => {
            s.glossaryFolder = sanitizeFolder2(v);
            await save(true);
            this.renderFolderStatus();
            this.plugin.refreshOverviewDebounced();
          });
          if (folderSuggestAvailable())
            new FolderSuggest(this.app, t.inputEl);
        });
        this.folderStatusEl = containerEl.createEl("div", { cls: "glossary-section-desc" });
        this.renderFolderStatus();
        new Setting(containerEl).setName("Term template").setDesc("Note used as the body of new term notes; placeholders like {{title}} and {{date}} are filled in. Empty = blank note.").addText((t) => {
          t.setValue(s.termTemplate).onChange(async (v) => {
            s.termTemplate = v.trim();
            await save(false);
          });
          if (folderSuggestAvailable())
            new FileSuggest(this.app, t.inputEl);
        });
        new Setting(containerEl).setName("Link scope").setDesc("Which notes terms are highlighted and linked in.").addDropdown((d) => d.addOption("folders", "Listed paths only").addOption("vault", "Everywhere").setValue(s.scopeMode).onChange(async (v) => {
          s.scopeMode = v;
          await saveScope();
          this.display();
        }));
        if (s.scopeMode === "folders") {
          new Setting(containerEl).setName("Paths to include").setDesc('One path per line \u2014 a file or a folder. Only these (and notes inside listed folders) are in scope. To exclude folders instead, use "Everywhere" and the Always-excluded paths below.').addTextArea((t) => {
            t.setValue(s.scopeFolders).onChange(async (v) => {
              s.scopeFolders = v;
              await saveScope();
            });
            t.inputEl.rows = 5;
          });
        }
        new Setting(containerEl).setName("Always-excluded paths").setDesc("One path per line \u2014 a file or a folder, never highlighted, linked or scanned, whatever the mode above is.").addTextArea((t) => {
          t.setValue(s.excludeFolders).onChange(async (v) => {
            s.excludeFolders = v;
            await saveScope();
          });
          t.inputEl.rows = 3;
        });
        containerEl.createEl("h3", { text: "Matching" });
        new Setting(containerEl).setName("Morphology").setDesc("How an inflected word is matched to a term.").addDropdown((d) => d.addOption("stemmer", "Stemmer (recommended)").addOption("endingStrip", "Ending strip").addOption("exact", "Exact match").setValue(s.matchMode).onChange(async (v) => {
          s.matchMode = v;
          await save(true);
        }));
        new Setting(containerEl).setName("Minimum term length").setDesc("Ignore term titles and aliases shorter than this many characters, so single letters do not match everywhere.").addText((t) => {
          t.inputEl.type = "number";
          t.inputEl.min = "1";
          t.setValue(String(s.minTermLength)).onChange(async (v) => {
            const n = parseInt(v, 10);
            s.minTermLength = Number.isFinite(n) && n > 0 ? n : 1;
            await save(true);
          });
        });
        const langs = this.plugin.languages;
        const errors = this.plugin.languageErrors || [];
        const enabledCount = langs.filter((l) => (s.enabledLanguages || []).includes(l.id)).length;
        if (this.showLanguages === void 0)
          this.showLanguages = false;
        const langDesc = `Bundled morphology modules \u2014 ${enabledCount} of ${langs.length} enabled` + (errors.length ? `, ${errors.length} invalid` : "") + ".";
        new Setting(containerEl).setName("Languages").setDesc(langDesc).addExtraButton((b) => b.setIcon(this.showLanguages ? "chevron-up" : "chevron-down").setTooltip(this.showLanguages ? "Hide languages" : "Show languages").onClick(() => {
          this.showLanguages = !this.showLanguages;
          this.display();
        }));
        if (this.showLanguages) {
          langs.forEach((lang, i) => {
            const row = new Setting(containerEl).setName(lang.name).setDesc(`id: ${lang.id}`).addExtraButton((b) => b.setIcon("chevron-up").setTooltip("Higher priority").setDisabled(i === 0).onClick(async () => {
              this.plugin.moveLanguage(lang.id, -1);
              await this.applyLanguageChange();
            })).addExtraButton((b) => b.setIcon("chevron-down").setTooltip("Lower priority").setDisabled(i === langs.length - 1).onClick(async () => {
              this.plugin.moveLanguage(lang.id, 1);
              await this.applyLanguageChange();
            })).addToggle((t) => t.setValue((s.enabledLanguages || []).includes(lang.id)).onChange(async (v) => {
              const set = new Set(s.enabledLanguages || []);
              if (v)
                set.add(lang.id);
              else
                set.delete(lang.id);
              s.enabledLanguages = [...set];
              await this.applyLanguageChange();
            }));
            row.settingEl.addClass("glossary-lang-row");
          });
          for (const bad of errors) {
            const row = new Setting(containerEl).setName(bad.id).setDesc(`Invalid module: ${bad.error}`).addExtraButton((b) => b.setIcon("alert-triangle").setTooltip(`Invalid module: ${bad.error}`).setDisabled(true));
            row.nameEl.addClass("glossary-lang-error");
            row.settingEl.addClass("glossary-lang-row");
            row.settingEl.addClass("mod-warning");
          }
        }
        new Setting(containerEl).setName("Link first occurrence only").setDesc("When turning terms into links, link only the first occurrence of each term on a page.").addToggle((t) => t.setValue(s.linkFirstOnly).onChange(async (v) => {
          s.linkFirstOnly = v;
          await save(false);
        }));
        new Setting(containerEl).setName("Excluded terms").setDesc("Term titles or aliases, one per line \u2014 drops the whole matching entry from the index.").addTextArea((t) => {
          t.setValue(s.excludeTerms).onChange(async (v) => {
            s.excludeTerms = v;
            await save(true);
          });
          t.inputEl.rows = 3;
        });
        new Setting(containerEl).setName("Excluded words").setDesc("Surface words, one per line, that never trigger a link even if they match a term.").addTextArea((t) => {
          t.setValue(s.excludeWords).onChange(async (v) => {
            s.excludeWords = v;
            await save(true);
          });
          t.inputEl.rows = 3;
        });
        containerEl.createEl("h3", { text: "Highlighting" });
        new Setting(containerEl).setName("Highlight in Reading view").setDesc("Underline detected terms as clickable links in Reading view (file unchanged).").addToggle((t) => t.setValue(s.highlightInReading).onChange(async (v) => {
          s.highlightInReading = v;
          await save(false);
          this.plugin.rerenderViews();
        }));
        new Setting(containerEl).setName("Highlight while editing").setDesc("Underline terms in the editor (Live Preview / Source) too.").addDropdown((d) => d.addOption("off", "Off").addOption("live", "Live (as you type)").addOption("onSave", "On save").setValue(s.editingHighlight).onChange(async (v) => {
          s.editingHighlight = v;
          await save(false);
          this.plugin.refreshEditors();
        }));
        new Setting(containerEl).setName("Skip headings").setDesc("Do not highlight or link terms that appear inside Markdown headings.").addToggle((t) => t.setValue(s.skipHeadings).onChange(async (v) => {
          s.skipHeadings = v;
          await save(false);
          this.plugin.rerenderViews();
        }));
        new Setting(containerEl).setName("Status bar count").setDesc("Show how many glossary terms are on the current note in the status bar.").addToggle((t) => t.setValue(s.statusBar).onChange(async (v) => {
          s.statusBar = v;
          await save(false);
          this.plugin.updateStatusBar();
        }));
        new Setting(containerEl).setName("Count direct links").setDesc("Also count terms already linked directly, not only plain-text mentions.").addToggle((t) => t.setValue(s.statusBarIncludeLinks).onChange(async (v) => {
          s.statusBarIncludeLinks = v;
          await save(false);
          this.plugin.updateStatusBar();
        }));
        containerEl.createEl("h3", { text: "Autocomplete" });
        new Setting(containerEl).setName("Suggest links while typing").setDesc("As you type in an in-scope note, offer to insert a [[link]] to a matching glossary term (prefix of a title/alias, or an inflected form).").addToggle((t) => t.setValue(s.linkSuggest).onChange(async (v) => {
          s.linkSuggest = v;
          await save(false);
        }));
        new Setting(containerEl).setName("Minimum characters").setDesc("How many characters to type before suggestions appear.").addText((t) => {
          t.inputEl.type = "number";
          t.inputEl.min = "1";
          t.setValue(String(s.suggestMinChars)).onChange(async (v) => {
            const n = parseInt(v, 10);
            s.suggestMinChars = Number.isFinite(n) && n > 0 ? n : 1;
            await save(false);
          });
        });
        containerEl.createEl("h3", { text: "Collecting aliases" });
        containerEl.createEl("div", { cls: "glossary-section-desc", text: "Reads the links you already made by hand, like [[Term|some wording]], and adds that wording to the term's aliases \u2014 so the same wording links automatically next time." });
        new Setting(containerEl).setName("Alias form").setDesc("How collected link text is stored as an alias.").addDropdown((d) => d.addOption("lemma", "Base form").addOption("literal", "As written").addOption("both", "Both").setValue(s.aliasHarvestMode).onChange(async (v) => {
          s.aliasHarvestMode = v;
          await save(false);
        }));
        new Setting(containerEl).setName("Collect on save").setDesc("Collect aliases automatically when a note is saved.").addDropdown((d) => d.addOption("off", "Off").addOption("silent", "Silent (add automatically)").addOption("preview", "Ask first").setValue(s.harvestOnSave).onChange(async (v) => {
          s.harvestOnSave = v;
          await save(false);
        }));
        new Setting(containerEl).setName("Single-word aliases only").setDesc("Only collect link texts that are a single word.").addToggle((t) => t.setValue(s.harvestSingleWordOnly).onChange(async (v) => {
          s.harvestSingleWordOnly = v;
          await save(false);
        }));
        new Setting(containerEl).setName("Minimum alias length").setDesc("Ignore collected aliases shorter than this many characters.").addText((t) => {
          t.inputEl.type = "number";
          t.inputEl.min = "1";
          t.setValue(String(s.harvestMinLength)).onChange(async (v) => {
            const n = parseInt(v, 10);
            s.harvestMinLength = Number.isFinite(n) && n > 0 ? n : 1;
            await save(false);
          });
        });
        new Setting(containerEl).setName("Warn about alias collisions").setDesc("When collecting an alias or creating a term, flag wording that already matches a different term (so you can avoid making a word point at two terms).").addToggle((t) => t.setValue(s.aliasCollisionWarnings).onChange(async (v) => {
          s.aliasCollisionWarnings = v;
          await save(false);
        }));
        containerEl.createEl("h3", { text: "Context menu" });
        new Setting(containerEl).setName('"Link to term" items').setDesc('Show the "Link to term" / "Link all \u2026 to term" actions when right-clicking a highlighted term.').addToggle((t) => t.setValue(s.menuTurnInto).onChange(async (v) => {
          s.menuTurnInto = v;
          await save(false);
        }));
        new Setting(containerEl).setName('"Collect aliases" item').setDesc('Show "Collect aliases from links (this note)" in the editor right-click menu.').addToggle((t) => t.setValue(s.menuCollect).onChange(async (v) => {
          s.menuCollect = v;
          await save(false);
        }));
        new Setting(containerEl).setName('"Exclude word / term" items').setDesc('Show "Add \u2026 to excluded words / terms" when right-clicking a term, and "Add \u2026 to excluded words" on a selected word.').addToggle((t) => t.setValue(s.menuExclude).onChange(async (v) => {
          s.menuExclude = v;
          await save(false);
        }));
        new Setting(containerEl).setName('"Open glossary note" items').setDesc('Show "Open glossary note" / "Open in new tab" when right-clicking a highlighted term.').addToggle((t) => t.setValue(s.menuOpen).onChange(async (v) => {
          s.menuOpen = v;
          await save(false);
        }));
        new Setting(containerEl).setName('"Create term from selection" items').setDesc('Show the "Glossary: create term\u2026" actions when right-clicking a plain text selection.').addToggle((t) => t.setValue(s.menuCreateTerm).onChange(async (v) => {
          s.menuCreateTerm = v;
          await save(false);
        }));
        new Setting(containerEl).setName('"Unlink term" item').setDesc('Show "Glossary: unlink this term" when right-clicking an existing glossary link.').addToggle((t) => t.setValue(s.menuUnlink).onChange(async (v) => {
          s.menuUnlink = v;
          await save(false);
        }));
        containerEl.createEl("h3", { text: "Overview" });
        new Setting(containerEl).setName("Ribbon icon").setDesc('Show a ribbon button that opens the glossary overview panel. The "Open glossary overview" command works either way.').addToggle((t) => t.setValue(s.showRibbonIcon).onChange(async (v) => {
          s.showRibbonIcon = v;
          await save(false);
          this.plugin.applyRibbonIcon();
        }));
        containerEl.createEl("h3", { text: "Maintenance" });
        new Setting(containerEl).setName("Rebuild glossary index").setDesc("Re-scan the glossary folder now.").addButton((b) => b.setButtonText("Rebuild").onClick(() => {
          this.plugin.rebuildIndex();
          new Notice2("Glossary Linker: index rebuilt");
          this.renderFolderStatus();
        }));
      }
      async applyLanguageChange() {
        await this.plugin.saveSettings();
        this.plugin.refreshActiveLanguages();
        this.plugin.rebuildIndex();
        this.plugin.rerenderViews();
        this.display();
      }
      renderFolderStatus() {
        const el = this.folderStatusEl;
        if (!el)
          return;
        el.empty();
        el.removeClass("glossary-lang-error");
        const path = (this.plugin.settings.glossaryFolder || "").replace(/\/+$/, "");
        const f = path ? this.app.vault.getAbstractFileByPath(path) : null;
        const isFolder = !!f && f.children !== void 0;
        if (!isFolder) {
          el.addClass("glossary-lang-error");
          el.setText("\u26A0 Folder not found \u2014 no terms will be indexed.");
          return;
        }
        const n = this.plugin.index && this.plugin.index.termCount || 0;
        el.setText(`${n} term${n === 1 ? "" : "s"} indexed.`);
      }
    };
    module2.exports = { GlossaryLinkerSettingTab: GlossaryLinkerSettingTab2 };
  }
});

// src/matcher.js
var require_matcher = __commonJS({
  "src/matcher.js"(exports2, module2) {
    "use strict";
    var { splitLines: splitLines2 } = require_constants();
    module2.exports = {
      // Keys for a word: the union from every language that claims it (same-script
      // languages overlap); words no language claims fall back to the exact form.
      keysFor(word) {
        const cacheKey = word.toLowerCase();
        if (!this.keysCache)
          this.keysCache = /* @__PURE__ */ new Map();
        const cached = this.keysCache.get(cacheKey);
        if (cached)
          return cached;
        const out = [];
        const seen = /* @__PURE__ */ new Set();
        for (const lang of this.activeLanguages) {
          if (!lang.match(word))
            continue;
          for (const k of lang.keys(word, this.settings.matchMode)) {
            if (!seen.has(k)) {
              seen.add(k);
              out.push(k);
            }
          }
        }
        if (!out.length)
          out.push(cacheKey);
        this.keysCache.set(cacheKey, out);
        return out;
      },
      // Base form for collected aliases: the first claiming language wins (by priority).
      lemmaFor(word) {
        for (const lang of this.activeLanguages) {
          if (lang.match(word))
            return lang.lemma ? lang.lemma(word) : word.toLowerCase();
        }
        return word.toLowerCase();
      },
      tokenizeForm(form) {
        const words = [...form.matchAll(/[\p{L}\p{Nd}]+/gu)].map((m) => m[0]);
        return words.map((raw) => ({ raw, lower: raw.toLowerCase(), keys: this.keysFor(raw) }));
      },
      rebuildIndex() {
        this.keysCache = /* @__PURE__ */ new Map();
        const byKey = /* @__PURE__ */ new Map();
        const canonicals = /* @__PURE__ */ new Set();
        const terms = [];
        const minTermLength = Math.max(1, this.settings.minTermLength || 1);
        const excludeTerms = new Set(splitLines2(this.settings.excludeTerms).map((s) => s.toLowerCase()));
        this.excludeWordKeys = /* @__PURE__ */ new Set();
        for (const w of splitLines2(this.settings.excludeWords)) {
          for (const k of this.keysFor(w))
            this.excludeWordKeys.add(k);
        }
        const files = this.app.vault.getMarkdownFiles().filter((f) => this.isGlossaryFile(f));
        for (const file of files) {
          const canonical = file.basename;
          const aliases = this.aliasesOf(file);
          if ([canonical, ...aliases].some((f) => excludeTerms.has(f.toLowerCase())))
            continue;
          const forms = [canonical, ...aliases].filter((x) => typeof x === "string" && x.trim());
          const target = { canonical, path: file.path };
          canonicals.add(canonical);
          terms.push({ canonical, path: file.path, aliases });
          for (const form of forms) {
            if (form.trim().length < minTermLength)
              continue;
            const words = this.tokenizeForm(form);
            if (!words.length)
              continue;
            if (words.length === 1 && words[0].keys.some((k) => this.excludeWordKeys.has(k)))
              continue;
            const matcher2 = { canonical, target, words, wordCount: words.length };
            for (const k of words[0].keys) {
              if (!byKey.has(k))
                byKey.set(k, []);
              byKey.get(k).push(matcher2);
            }
          }
        }
        this.index = { byKey, termCount: canonicals.size };
        this.terms = terms;
        if (this._indexListeners)
          for (const cb of this._indexListeners) {
            try {
              cb();
            } catch (e) {
            }
          }
      },
      // Canonicals of every term whose form matches `text`, optionally excluding one.
      // Runs the same matcher as highlighting, so collisions agree with what gets linked.
      termsMatchingText(text, except) {
        const out = /* @__PURE__ */ new Set();
        for (const m of this.findMatches(text, null)) {
          out.add(m.canonical);
          if (m.alts)
            for (const a of m.alts)
              out.add(a);
        }
        if (except)
          out.delete(except);
        return [...out];
      },
      findMatches(text, currentCanonical, opts = {}) {
        const protect = opts.protect ? this.computeProtected(text) : null;
        const tokens = [...text.matchAll(/[\p{L}\p{Nd}]+/gu)].map((m) => {
          const raw = m[0];
          return { raw, start: m.index, end: m.index + raw.length, keys: this.keysFor(raw) };
        });
        const results = [];
        let i = 0;
        while (i < tokens.length) {
          const tk = tokens[i];
          const cands = [];
          const seen = /* @__PURE__ */ new Set();
          for (const k of tk.keys) {
            const bucket = this.index.byKey.get(k);
            if (!bucket)
              continue;
            for (const c of bucket) {
              if (!seen.has(c)) {
                seen.add(c);
                cands.push(c);
              }
            }
          }
          const fits = (c) => {
            const wc = c.wordCount;
            if (i + wc > tokens.length)
              return false;
            for (let k = 0; k < wc; k++) {
              const t2 = tokens[i + k];
              const w = c.words[k];
              if (k > 0) {
                const between = text.slice(tokens[i + k - 1].end, t2.start);
                if (/[^\s-]/.test(between))
                  return false;
              }
              const t2keys = k === 0 ? t2.keys : this.keysFor(t2.raw);
              if (!t2keys.some((kk) => w.keys.includes(kk)))
                return false;
            }
            return true;
          };
          let matched = null;
          let sorted = null;
          if (cands.length) {
            sorted = cands.length > 1 ? cands.slice().sort((a, b) => b.wordCount - a.wordCount) : cands;
            for (const c of sorted) {
              if (fits(c)) {
                matched = { c, start: tokens[i].start, end: tokens[i + c.wordCount - 1].end, wc: c.wordCount };
                break;
              }
            }
          }
          if (matched && matched.c.canonical !== currentCanonical) {
            const oneWordExcluded = matched.wc === 1 && tk.keys.some((k) => this.excludeWordKeys.has(k));
            const inProtected = protect && this.overlapsProtected(protect, matched.start, matched.end);
            if (!oneWordExcluded && !inProtected) {
              let alts = null;
              if (sorted.length > 1) {
                const seenCanon = /* @__PURE__ */ new Set([matched.c.canonical]);
                for (const c of sorted) {
                  if (c.wordCount !== matched.wc || seenCanon.has(c.canonical))
                    continue;
                  if (fits(c)) {
                    seenCanon.add(c.canonical);
                    (alts || (alts = [])).push(c.canonical);
                  }
                }
              }
              results.push({
                start: matched.start,
                end: matched.end,
                canonical: matched.c.canonical,
                display: text.slice(matched.start, matched.end),
                alts
              });
              i += matched.wc;
              continue;
            }
          }
          i++;
        }
        return results;
      },
      // Ranges in raw markdown that must not be linked: frontmatter, code, links, urls, headings.
      computeProtected(text) {
        const ranges = [];
        const push = (re) => {
          let m;
          while ((m = re.exec(text)) !== null)
            ranges.push([m.index, m.index + m[0].length]);
        };
        if (/^---\r?\n/.test(text)) {
          const end = text.indexOf("\n---", 3);
          if (end !== -1)
            ranges.push([0, end + 4]);
        }
        push(/```[\s\S]*?```/g);
        push(/~~~[\s\S]*?~~~/g);
        push(/`[^`\n]+`/g);
        push(/\[\[[^\]]*\]\]/g);
        push(/\[[^\]]*\]\([^)]*\)/g);
        push(/(?:https?:\/\/|www\.)\S+/g);
        if (this.settings.skipHeadings)
          push(/^[ \t]*#{1,6}[ \t].*$/gm);
        return ranges.sort((a, b) => a[0] - b[0]);
      },
      // Frontmatter and code (fenced or inline) — the spans where a [[...]] isn't a real link.
      // Unlike computeProtected it keeps wikilinks and headings, since unlink acts on links and a
      // link inside a heading is still real.
      codeFrontmatterRanges(text) {
        const ranges = [];
        const push = (re) => {
          let m;
          while ((m = re.exec(text)) !== null)
            ranges.push([m.index, m.index + m[0].length]);
        };
        if (/^---\r?\n/.test(text)) {
          const end = text.indexOf("\n---", 3);
          if (end !== -1)
            ranges.push([0, end + 4]);
        }
        push(/```[\s\S]*?```/g);
        push(/~~~[\s\S]*?~~~/g);
        push(/`[^`\n]+`/g);
        return ranges.sort((a, b) => a[0] - b[0]);
      },
      overlapsProtected(ranges, s, e) {
        for (const [rs, re] of ranges) {
          if (rs >= e)
            break;
          if (re > s)
            return true;
        }
        return false;
      }
    };
  }
});

// src/highlight.js
var require_highlight = __commonJS({
  "src/highlight.js"(exports2, module2) {
    "use strict";
    var { Platform } = require("obsidian");
    var LONG_PRESS_MS = 500;
    var fireContextMenu = (el, x, y) => el.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: x, clientY: y }));
    function longPressTracker(fire) {
      let timer = null, x = 0, y = 0, target = null;
      const cancel = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
      return {
        start(t, el) {
          target = el;
          x = t.clientX;
          y = t.clientY;
          timer = setTimeout(() => {
            timer = null;
            fire(target, x, y);
          }, LONG_PRESS_MS);
        },
        move(t) {
          if (timer && (Math.abs(t.clientX - x) > 10 || Math.abs(t.clientY - y) > 10))
            cancel();
        },
        cancel
      };
    }
    module2.exports = {
      processReadingMode(el, ctx) {
        if (!this.settings.highlightInReading)
          return;
        const sourcePath = ctx.sourcePath;
        if (sourcePath && !this.inScope(sourcePath))
          return;
        const currentCanonical = this.canonicalForPath(sourcePath);
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
          acceptNode: (node) => {
            let p = node.parentElement;
            while (p) {
              const tag = p.tagName;
              if (tag === "CODE" || tag === "PRE" || tag === "A")
                return NodeFilter.FILTER_REJECT;
              if (this.settings.skipHeadings && /^H[1-6]$/.test(tag))
                return NodeFilter.FILTER_REJECT;
              if (p.classList && p.classList.contains("glossary-link"))
                return NodeFilter.FILTER_REJECT;
              if (p === el)
                break;
              p = p.parentElement;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const nodes = [];
        while (walker.nextNode())
          nodes.push(walker.currentNode);
        for (const node of nodes)
          this.decorateTextNode(node, currentCanonical, sourcePath);
      },
      decorateTextNode(node, currentCanonical, sourcePath) {
        const text = node.textContent;
        if (!text || text.length < 2)
          return;
        const matches = this.findMatches(text, currentCanonical, { protect: true });
        if (!matches.length)
          return;
        const frag = document.createDocumentFragment();
        let cursor = 0;
        for (const m of matches) {
          if (m.start > cursor)
            frag.appendChild(document.createTextNode(text.slice(cursor, m.start)));
          const canonical = m.canonical;
          const display = m.display;
          const a = document.createElement("a");
          a.textContent = display;
          a.setAttribute("data-glossary-target", canonical);
          if (m.alts && m.alts.length) {
            a.className = "glossary-link glossary-ambiguous";
            const candidates = [canonical, ...m.alts];
            a.setAttribute("aria-label", "Matches: " + candidates.join(", "));
            const pick = (e, newTab) => {
              e.preventDefault();
              e.stopPropagation();
              this.chooseTerm(candidates, newTab ? "Open in new tab\u2026" : "Open\u2026", (c) => this.openTerm(c, sourcePath, newTab));
            };
            a.addEventListener("click", (e) => pick(e, e.ctrlKey || e.metaKey));
            a.addEventListener("auxclick", (e) => {
              if (e.button === 1)
                pick(e, true);
            });
            a.addEventListener("mousedown", (e) => {
              if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
              }
            });
          } else {
            a.className = "internal-link glossary-link";
            a.href = canonical;
            a.setAttribute("data-href", canonical);
          }
          a.addEventListener("contextmenu", (e) => {
            const file = sourcePath ? this.app.vault.getAbstractFileByPath(sourcePath) : null;
            const root = a.closest(".markdown-reading-view, .markdown-source-view, .markdown-preview-view") || a.ownerDocument;
            let occurrence = 0;
            for (const other of root.querySelectorAll("a.glossary-link")) {
              if (other === a)
                break;
              if (other.getAttribute("data-glossary-target") === canonical && other.textContent === display)
                occurrence++;
            }
            if (this.showLinkMenu(e, canonical, display, file, null, occurrence, m.alts))
              e.stopPropagation();
          });
          if (Platform.isMobile) {
            const lp = longPressTracker(fireContextMenu);
            a.addEventListener("touchstart", (e) => lp.start(e.touches[0], a), { passive: true });
            a.addEventListener("touchmove", (e) => lp.move(e.touches[0]), { passive: true });
            a.addEventListener("touchend", lp.cancel);
            a.addEventListener("touchcancel", lp.cancel);
          }
          frag.appendChild(a);
          cursor = m.end;
        }
        if (cursor < text.length)
          frag.appendChild(document.createTextNode(text.slice(cursor)));
        node.parentNode.replaceChild(frag, node);
      },
      // Editor highlight (Live Preview / Source). Always registered; the
      // editingHighlight setting controls if and how often it recomputes.
      registerEditingHighlight() {
        let view, state, language;
        try {
          view = require("@codemirror/view");
          state = require("@codemirror/state");
          language = require("@codemirror/language");
        } catch (e) {
          console.warn("Glossary Linker: CM6 modules unavailable, editor highlight disabled", e);
          return;
        }
        const { ViewPlugin, Decoration } = view;
        const { RangeSetBuilder, StateEffect } = state;
        const { syntaxTree } = language;
        const plugin = this;
        const refresh = StateEffect.define();
        this.cmRefreshEffect = refresh;
        const markCache = /* @__PURE__ */ new Map();
        const markFor = (canonical) => {
          let m = markCache.get(canonical);
          if (!m) {
            m = Decoration.mark({ class: "cm-glossary-link", attributes: { "data-glossary-target": canonical } });
            markCache.set(canonical, m);
          }
          return m;
        };
        const markWithAlts = (canonical, alts) => Decoration.mark({
          class: "cm-glossary-link cm-glossary-ambiguous",
          attributes: { "data-glossary-target": canonical, "data-glossary-alts": alts.join("\n"), "aria-label": "Matches: " + [canonical, ...alts].join(", ") }
        });
        const skipNode = (name) => /code|link|url|header|hashtag|frontmatter|comment|tag|escape/i.test(name);
        const buildDeco = (editorView) => {
          const builder = new RangeSetBuilder();
          const activeFile = plugin.app.workspace.getActiveFile();
          if (activeFile && !plugin.inScope(activeFile.path))
            return builder.finish();
          const currentCanonical = plugin.activeCanonical();
          const tree = syntaxTree(editorView.state);
          for (const { from, to } of editorView.visibleRanges) {
            const text = editorView.state.doc.sliceString(from, to);
            for (const m of plugin.findMatches(text, currentCanonical)) {
              const start = from + m.start;
              const end = from + m.end;
              let skip = false;
              tree.iterate({ from: start, to: end, enter: (n) => {
                if (skipNode(n.type.name))
                  skip = true;
              } });
              if (!skip)
                builder.add(start, end, m.alts && m.alts.length ? markWithAlts(m.canonical, m.alts) : markFor(m.canonical));
            }
          }
          return builder.finish();
        };
        const targetEl = (e) => e.target instanceof HTMLElement ? e.target.closest(".cm-glossary-link") : null;
        const canonicalOf = (el) => el.getAttribute("data-glossary-target");
        const altsOf = (el) => {
          const v = el.getAttribute("data-glossary-alts");
          return v ? v.split("\n") : null;
        };
        const editorLp = longPressTracker(fireContextMenu);
        const vp = ViewPlugin.fromClass(
          class {
            constructor(v) {
              this.decorations = plugin.settings.editingHighlight === "off" ? Decoration.none : buildDeco(v);
            }
            update(u) {
              const mode = plugin.settings.editingHighlight;
              if (mode === "off") {
                if (this.decorations.size)
                  this.decorations = Decoration.none;
                return;
              }
              const forced = u.transactions.some((tr) => tr.effects.some((e) => e.is(refresh)));
              if (u.viewportChanged || forced || mode === "live" && (u.docChanged || u.selectionSet)) {
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
                if (!el)
                  return;
                const file = plugin.app.workspace.getActiveFile();
                const sourcePath = file ? file.path : "";
                const alts = altsOf(el);
                const candidates = alts && alts.length ? [canonicalOf(el), ...alts] : [canonicalOf(el)];
                if (e.button === 1) {
                  plugin.chooseTerm(candidates, "Open in new tab\u2026", (c) => plugin.openTerm(c, sourcePath, true));
                  e.preventDefault();
                  return;
                }
                if (e.button !== 0 || !(e.ctrlKey || e.metaKey))
                  return;
                plugin.chooseTerm(candidates, "Open\u2026", (c) => plugin.openTerm(c, sourcePath, false));
                e.preventDefault();
              },
              mouseover(e) {
                const el = targetEl(e);
                if (!el)
                  return;
                if (el.hasAttribute("data-glossary-alts"))
                  return;
                const file = plugin.app.workspace.getActiveFile();
                plugin.hoverTerm(e, el, canonicalOf(el), file ? file.path : "");
              },
              contextmenu(e, view2) {
                const el = targetEl(e);
                if (!el)
                  return;
                const file = plugin.app.workspace.getActiveFile();
                plugin.showLinkMenu(e, canonicalOf(el), el.textContent, file, view2.posAtDOM(el), void 0, altsOf(el));
              },
              touchstart(e) {
                if (!Platform.isMobile)
                  return;
                const el = targetEl(e);
                if (el)
                  editorLp.start(e.touches[0], el);
              },
              touchmove(e) {
                editorLp.move(e.touches[0]);
              },
              touchend: editorLp.cancel,
              touchcancel: editorLp.cancel
            }
          }
        );
        this.registerEditorExtension(vp);
      }
    };
  }
});

// src/modals.js
var require_modals = __commonJS({
  "src/modals.js"(exports2, module2) {
    "use strict";
    var { Modal } = require("obsidian");
    var SKIP = "\0skip";
    var MaterializePreviewModal = class extends Modal {
      constructor(app, files, plugin, onApply) {
        super(app);
        this.files = files;
        this.plugin = plugin;
        this.onApply = onApply;
        this.groups = /* @__PURE__ */ new Map();
        for (const fc of files) {
          for (const m of fc.matches) {
            if (!(m.alts && m.alts.length))
              continue;
            const key = m.display.toLowerCase();
            if (!this.groups.has(key))
              this.groups.set(key, { display: m.display, candidates: [m.canonical, ...m.alts], choice: m.canonical, spans: [] });
          }
        }
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: "Link glossary terms \u2014 preview" });
        const total = this.files.reduce((n, f) => n + f.matches.length, 0);
        contentEl.createEl("p", { text: `Files: ${this.files.length}, replacements: ${total}` });
        if (this.groups.size) {
          contentEl.createEl("p", { cls: "glossary-section-desc", text: `${this.groups.size} ambiguous word(s) match more than one term \u2014 pick one (applies to every occurrence):` });
          const panel = contentEl.createDiv({ cls: "glossary-resolve-panel" });
          for (const g of this.groups.values()) {
            const row = panel.createDiv({ cls: "glossary-resolve-row" });
            row.createSpan({ cls: "glossary-resolve-word", text: g.display });
            row.createSpan({ text: "\u2192" });
            const sel = row.createEl("select", { cls: "glossary-term-select" });
            for (const term of g.candidates)
              sel.createEl("option", { text: term, value: term });
            sel.createEl("option", { text: "(skip \u2014 leave as text)", value: SKIP });
            sel.value = g.choice;
            sel.onchange = () => {
              g.choice = sel.value === SKIP ? null : sel.value;
              g.spans.forEach((upd) => upd());
            };
          }
        }
        this.files.forEach((fc) => {
          contentEl.createDiv({ cls: "glossary-preview-file", text: fc.file ? fc.file.path : fc.label || "selection" });
          const table = contentEl.createEl("table", { cls: "glossary-preview-table" });
          fc.matches.slice(0, 50).forEach((m) => {
            const inTable = this.plugin.inTableCell(fc.original, m.start);
            const tr = table.createEl("tr");
            tr.createEl("td", { text: m.display });
            tr.createEl("td", { text: "\u2192" });
            const after = tr.createEl("td");
            if (m.alts && m.alts.length) {
              tr.addClass("glossary-ambiguous-row");
              const g = this.groups.get(m.display.toLowerCase());
              const render = () => after.setText(g.choice == null ? "\u2014 left as text \u2014" : this.plugin.wikiLink(g.choice, m.display, inTable));
              g.spans.push(render);
              render();
            } else {
              after.setText(this.plugin.wikiLink(m.canonical, m.display, inTable));
            }
          });
          if (fc.matches.length > 50)
            contentEl.createEl("div", { cls: "glossary-preview-empty", text: `\u2026and ${fc.matches.length - 50} more` });
        });
        const buttons = contentEl.createDiv({ cls: "glossary-preview-buttons" });
        const apply = buttons.createEl("button", { text: "Apply", cls: "mod-cta" });
        apply.onclick = async () => {
          const results = this.files.map((fc) => {
            const chosen = [];
            for (const m of fc.matches) {
              if (m.alts && m.alts.length) {
                const g = this.groups.get(m.display.toLowerCase());
                if (!g || g.choice == null)
                  continue;
                chosen.push(g.choice === m.canonical ? m : { ...m, canonical: g.choice });
              } else {
                chosen.push(m);
              }
            }
            const { newText } = this.plugin.applyLinks(fc.original, chosen);
            return { file: fc.file, label: fc.label, original: fc.original, newText, count: chosen.length };
          });
          await this.onApply(results);
          this.close();
        };
        buttons.createEl("button", { text: "Cancel" }).onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var HarvestPreviewModal = class extends Modal {
      constructor(app, additions, onApply) {
        super(app);
        this.additions = additions;
        this.onApply = onApply;
        this.checked = /* @__PURE__ */ new Set();
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: "Collect aliases \u2014 preview" });
        const total = this.additions.reduce((n, a) => n + a.aliases.length, 0);
        contentEl.createEl("p", { text: `Terms: ${this.additions.length}, new aliases: ${total}` });
        for (const a of this.additions) {
          contentEl.createDiv({ cls: "glossary-preview-file", text: a.file.basename });
          const list = contentEl.createDiv({ cls: "glossary-harvest-list" });
          for (const al of a.aliases) {
            const collides = al.collidesWith && al.collidesWith.length;
            if (!collides)
              this.checked.add(al);
            const row = list.createDiv({ cls: "glossary-harvest-alias" });
            const label = row.createEl("label");
            const cb = label.createEl("input", { type: "checkbox" });
            cb.checked = !collides;
            cb.onchange = () => {
              if (cb.checked)
                this.checked.add(al);
              else
                this.checked.delete(al);
            };
            label.createSpan({ cls: "glossary-add", text: al.text });
            if (collides) {
              const warn = row.createSpan({ cls: "glossary-collision", text: "\u26A0" });
              warn.setAttribute("aria-label", `Also matches: ${al.collidesWith.join(", ")}`);
            }
          }
          if (a.skipped && a.skipped.length) {
            contentEl.createDiv({ cls: "glossary-section-desc", text: `Already present (skipped): ${a.skipped.join(", ")}` });
          }
        }
        const buttons = contentEl.createDiv({ cls: "glossary-preview-buttons" });
        const apply = buttons.createEl("button", { text: "Write", cls: "mod-cta" });
        apply.onclick = async () => {
          const selected = this.additions.map((a) => ({ file: a.file, aliases: a.aliases.filter((al) => this.checked.has(al)) })).filter((a) => a.aliases.length);
          await this.onApply(selected);
          this.close();
        };
        buttons.createEl("button", { text: "Cancel" }).onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var UnlinkPreviewModal = class extends Modal {
      constructor(app, files, plugin, onApply) {
        super(app);
        this.files = files;
        this.plugin = plugin;
        this.onApply = onApply;
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: "Unlink glossary terms \u2014 preview" });
        const total = this.files.reduce((n, f) => n + f.matches.length, 0);
        contentEl.createEl("p", { text: `Files: ${this.files.length}, links to remove: ${total}` });
        this.files.forEach((fc) => {
          contentEl.createDiv({ cls: "glossary-preview-file", text: fc.file ? fc.file.path : fc.label || "selection" });
          const table = contentEl.createEl("table", { cls: "glossary-preview-table" });
          fc.matches.slice(0, 50).forEach((m) => {
            const tr = table.createEl("tr");
            tr.createEl("td", { text: m.source });
            tr.createEl("td", { text: "\u2192" });
            tr.createEl("td", { text: m.display });
          });
          if (fc.matches.length > 50)
            contentEl.createEl("div", { cls: "glossary-preview-empty", text: `\u2026and ${fc.matches.length - 50} more` });
        });
        const buttons = contentEl.createDiv({ cls: "glossary-preview-buttons" });
        const apply = buttons.createEl("button", { text: "Apply", cls: "mod-cta" });
        apply.onclick = async () => {
          const results = this.files.map((fc) => {
            const { newText, count } = this.plugin.unlinkLinks(fc.original, fc.matches);
            return { file: fc.file, label: fc.label, original: fc.original, newText, count };
          });
          await this.onApply(results);
          this.close();
        };
        buttons.createEl("button", { text: "Cancel" }).onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var ChooseTermModal = class extends Modal {
      constructor(app, opts) {
        super(app);
        this.opts = opts;
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: this.opts.title || "Choose a term" });
        contentEl.createEl("p", { text: "This word matches more than one glossary term \u2014 pick one:" });
        const list = contentEl.createDiv({ cls: "glossary-choose-list" });
        for (const term of this.opts.terms) {
          const b = list.createEl("button", { text: term, cls: "glossary-choose-item" });
          b.onclick = async () => {
            await this.opts.onChoose(term);
            this.close();
          };
        }
        contentEl.createDiv({ cls: "glossary-preview-buttons" }).createEl("button", { text: "Cancel" }).onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    module2.exports = { MaterializePreviewModal, HarvestPreviewModal, ChooseTermModal, UnlinkPreviewModal };
  }
});

// src/actions.js
var require_actions = __commonJS({
  "src/actions.js"(exports2, module2) {
    "use strict";
    var { Menu, Notice: Notice2, TFile: TFile2, moment } = require("obsidian");
    var { splitLines: splitLines2 } = require_constants();
    var { MaterializePreviewModal, HarvestPreviewModal, ChooseTermModal, UnlinkPreviewModal } = require_modals();
    module2.exports = {
      // Ambiguous matches keep their `alts` so the preview can let the user pick a term.
      collectMatches(text, currentCanonical) {
        const matches = this.findMatches(text, currentCanonical, { protect: true });
        if (!this.settings.linkFirstOnly)
          return matches;
        const seen = /* @__PURE__ */ new Set();
        const out = [];
        for (const m of matches) {
          if (seen.has(m.canonical))
            continue;
          seen.add(m.canonical);
          out.push(m);
        }
        return out;
      },
      openMaterializePreview(files, onApply) {
        new MaterializePreviewModal(this.app, files, this, onApply).open();
      },
      // Write each result, skipping notes edited since the preview was built.
      async writeScopeResults(results) {
        let total = 0;
        let skipped = 0;
        for (const r of results) {
          let written = false;
          await this.app.vault.process(r.file, (data) => {
            if (data !== r.original)
              return data;
            written = true;
            return r.newText;
          });
          if (written)
            total += r.count;
          else
            skipped++;
        }
        let msg = `Glossary Linker: ${results.length - skipped} file(s), ${total} link(s)`;
        if (skipped)
          msg += `, ${skipped} skipped (changed since preview)`;
        new Notice2(msg);
        this.updateStatusBar();
      },
      async materializeCurrent() {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
          new Notice2("No active note");
          return;
        }
        const text = await this.app.vault.cachedRead(file);
        const matches = this.collectMatches(text, this.canonicalForPath(file.path));
        if (!matches.length) {
          new Notice2("Glossary Linker: no matches found");
          return;
        }
        this.openMaterializePreview([{ file, original: text, matches }], async (results) => {
          const r = results[0];
          let written = false;
          await this.app.vault.process(r.file, (data) => {
            if (data !== r.original)
              return data;
            written = true;
            return r.newText;
          });
          if (!written) {
            new Notice2("Glossary Linker: note changed since preview, nothing written");
            return;
          }
          new Notice2(`Glossary Linker: ${r.count} link(s) created`);
          this.updateStatusBar();
        });
      },
      materializeSelection(editor) {
        const sel = editor.getSelection();
        if (!sel) {
          new Notice2("No selection");
          return;
        }
        const file = this.app.workspace.getActiveFile();
        const matches = this.collectMatches(sel, file ? this.canonicalForPath(file.path) : null);
        if (!matches.length) {
          new Notice2("Glossary Linker: no matches found");
          return;
        }
        this.openMaterializePreview([{ file: null, original: sel, matches, label: "selection" }], (results) => {
          editor.replaceSelection(results[0].newText);
          new Notice2(`Glossary Linker: ${results[0].count} link(s) created`);
        });
      },
      async scanScopeMatches(compute) {
        const files = this.getScopeFiles();
        const out = [];
        const notice = new Notice2("Glossary Linker: scanning\u2026", 0);
        try {
          for (let i = 0; i < files.length; i++) {
            if (i % 25 === 0)
              notice.setMessage(`Glossary Linker: scanning ${i + 1}/${files.length}\u2026`);
            const file = files[i];
            const text = await this.app.vault.cachedRead(file);
            const matches = compute(text, file);
            if (matches.length)
              out.push({ file, original: text, matches });
          }
        } finally {
          notice.hide();
        }
        return out;
      },
      async materializeScope() {
        const files = await this.scanScopeMatches((text, file) => this.collectMatches(text, this.canonicalForPath(file.path)));
        if (!files.length) {
          new Notice2("Glossary Linker: no matches found");
          return;
        }
        this.openMaterializePreview(files, (results) => this.writeScopeResults(results));
      },
      // Glossary wikilinks in `text` that unlink can revert: each resolves to a glossary note,
      // sits outside code/frontmatter, and isn't a #subpath link (those are deliberate — reverting
      // would drop the anchor). Offsets are into `text`.
      findGlossaryLinks(text, sourcePath) {
        const ranges = this.codeFrontmatterRanges(text);
        const re = /\[\[([^\]\n]+)\]\]/g;
        const out = [];
        let m;
        while ((m = re.exec(text)) !== null) {
          const start = m.index;
          const end = m.index + m[0].length;
          if (this.overlapsProtected(ranges, start, end))
            continue;
          const { target, display, hasSubpath } = this.parseWikiInner(m[1]);
          if (!target || !display || hasSubpath)
            continue;
          const dest = this.app.metadataCache.getFirstLinkpathDest(target, sourcePath || "");
          if (!dest || !this.isGlossaryFile(dest))
            continue;
          out.push({ start, end, canonical: dest.basename, display, source: m[0] });
        }
        return out;
      },
      openUnlinkPreview(files, onApply) {
        new UnlinkPreviewModal(this.app, files, this, onApply).open();
      },
      async unlinkCurrent() {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
          new Notice2("No active note");
          return;
        }
        const text = await this.app.vault.cachedRead(file);
        const links = this.findGlossaryLinks(text, file.path);
        if (!links.length) {
          new Notice2("Glossary Linker: no glossary links found");
          return;
        }
        this.openUnlinkPreview([{ file, original: text, matches: links }], (results) => this.writeScopeResults(results));
      },
      unlinkSelection(editor) {
        const sel = editor.getSelection();
        if (!sel) {
          new Notice2("No selection");
          return;
        }
        const file = this.app.workspace.getActiveFile();
        const links = this.findGlossaryLinks(sel, file ? file.path : "");
        if (!links.length) {
          new Notice2("Glossary Linker: no glossary links found");
          return;
        }
        this.openUnlinkPreview([{ file: null, original: sel, matches: links, label: "selection" }], (results) => {
          editor.replaceSelection(results[0].newText);
          new Notice2(`Glossary Linker: ${results[0].count} link(s) removed`);
        });
      },
      async unlinkScope() {
        const files = await this.scanScopeMatches((text, file) => this.findGlossaryLinks(text, file.path));
        if (!files.length) {
          new Notice2("Glossary Linker: no glossary links found");
          return;
        }
        this.openUnlinkPreview(files, (results) => this.writeScopeResults(results));
      },
      async createTermFromSelection(editor, replaceWithLink) {
        var _a;
        const sel = (editor.getSelection() || "").trim();
        if (!sel) {
          new Notice2("Glossary Linker: nothing selected");
          return;
        }
        if (this.settings.aliasCollisionWarnings) {
          const hits = this.termsMatchingText(sel);
          if (hits.length) {
            const sourcePath = ((_a = this.app.workspace.getActiveFile()) == null ? void 0 : _a.path) || "";
            this.openTerm(hits[0], sourcePath, false);
            new Notice2(`Glossary Linker: "${sel}" already matches "${hits[0]}" \u2014 opened it`);
            return;
          }
        }
        return this.createTermNote(editor, sel, replaceWithLink);
      },
      async createTermNote(editor, sel, replaceWithLink) {
        const name = sel.replace(/[\\/:*?"<>|#^\[\]]/g, "").replace(/\s+/g, " ").trim();
        if (!name) {
          new Notice2("Glossary Linker: selection is not a valid term name");
          return;
        }
        await this.ensureGlossaryFolder();
        const folder = this.settings.glossaryFolder.replace(/\/+$/, "");
        const path = folder ? `${folder}/${name}.md` : `${name}.md`;
        let file = this.app.vault.getAbstractFileByPath(path);
        if (file) {
          new Notice2(`Glossary Linker: term "${name}" already exists`);
        } else {
          try {
            const content = await this.buildTermContent(name, sel);
            file = await this.app.vault.create(path, content);
          } catch (e) {
            new Notice2("Glossary Linker: could not create term note");
            return;
          }
        }
        if (replaceWithLink)
          editor.replaceSelection(this.wikiLink(name, sel));
        this.rebuildIndex();
        this.updateStatusBar();
        await this.app.workspace.getLeaf("tab").openFile(file);
      },
      async buildTermContent(name, sel) {
        const tplPath = (this.settings.termTemplate || "").trim();
        if (!tplPath)
          return "";
        const tpl = this.app.vault.getAbstractFileByPath(tplPath);
        if (!(tpl instanceof TFile2)) {
          new Notice2(`Glossary Linker: template not found: ${tplPath}`);
          return "";
        }
        let text;
        try {
          text = await this.app.vault.read(tpl);
        } catch (e) {
          new Notice2("Glossary Linker: could not read template");
          return "";
        }
        return this.applyTermPlaceholders(text, name, sel);
      },
      applyTermPlaceholders(text, name, sel) {
        const src = this.app.workspace.getActiveFile();
        const m = (() => {
          try {
            return moment ? moment() : null;
          } catch (e) {
            return null;
          }
        })();
        const fmt = (f, fallback) => m ? m.format(f) : fallback();
        return text.replace(/\{\{\s*title\s*\}\}/g, name).replace(/\{\{\s*selection\s*\}\}/g, sel).replace(/\{\{\s*source\s*\}\}/g, src ? src.basename : "").replace(/\{\{\s*sourcePath\s*\}\}/g, src ? src.path : "").replace(/\{\{\s*date(?::([^}]*))?\s*\}\}/g, (_, f) => fmt((f || "YYYY-MM-DD").trim(), () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))).replace(/\{\{\s*time(?::([^}]*))?\s*\}\}/g, (_, f) => fmt((f || "HH:mm").trim(), () => (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)));
      },
      chooseTerm(candidates, title, action) {
        const list = (candidates || []).filter(Boolean);
        if (list.length <= 1)
          return action(list[0]);
        new ChooseTermModal(this.app, { title, terms: list, onChoose: action }).open();
      },
      showLinkMenu(evt, canonical, display, file, nearOffset, occurrence, alts) {
        const sourcePath = file ? file.path : "";
        const candidates = alts && alts.length ? [canonical, ...alts] : [canonical];
        const groups = [];
        if (file && this.settings.menuTurnInto) {
          const scope = this.settings.linkFirstOnly ? "first" : "all";
          groups.push((menu2) => {
            menu2.addItem((i) => i.setTitle("Link to term").setIcon("link").onClick(() => this.chooseTerm(
              candidates,
              `Link "${display}" to\u2026`,
              (c) => this.materializeSingle(file, canonical, display, nearOffset, occurrence, c)
            )));
            menu2.addItem((i) => i.setTitle(`Link ${scope} "${display}" to term: this note`).setIcon("links-coming-in").onClick(() => this.chooseTerm(
              candidates,
              `Link ${scope} "${display}" to\u2026`,
              (c) => this.materializeTerm(file, canonical, c)
            )));
            menu2.addItem((i) => i.setTitle(`Link ${scope} "${display}" to term: all notes`).setIcon("links-going-out").onClick(() => this.chooseTerm(
              candidates,
              `Link ${scope} "${display}" to\u2026`,
              (c) => this.materializeTermScope(canonical, c)
            )));
          });
        }
        if (this.settings.menuExclude) {
          groups.push((menu2) => {
            this.addExclusionMenuItem(menu2, "excludeWords", display);
            this.addExclusionMenuItem(menu2, "excludeTerms", display);
          });
        }
        if (this.settings.menuOpen) {
          groups.push((menu2) => {
            menu2.addItem((i) => i.setTitle("Open glossary note").setIcon("file-text").onClick(() => this.chooseTerm(candidates, "Open\u2026", (c) => this.openTerm(c, sourcePath, false))));
            menu2.addItem((i) => i.setTitle("Open in new tab").setIcon("file-plus").onClick(() => this.chooseTerm(candidates, "Open in new tab\u2026", (c) => this.openTerm(c, sourcePath, true))));
          });
        }
        if (!groups.length)
          return false;
        const menu = new Menu();
        groups.forEach((group, i) => {
          if (i)
            menu.addSeparator();
          group(menu);
        });
        evt.preventDefault();
        menu.showAtMouseEvent(evt);
        return true;
      },
      isExcluded(listKey, value) {
        const v = value.toLowerCase();
        return splitLines2(this.settings[listKey]).some((l) => l.toLowerCase() === v);
      },
      // Add or remove exclusion item for `menu`, toggled by current state. The verb is lower-case
      // with a prefix (native menus) and capitalised without (the plugin's own menu); excludeWords
      // are stored lowercased.
      addExclusionMenuItem(menu, listKey, value, prefix = "") {
        const noun = listKey === "excludeWords" ? "excluded words" : "excluded terms";
        const verb = (w) => prefix ? w : w[0].toUpperCase() + w.slice(1);
        if (this.isExcluded(listKey, value)) {
          menu.addItem((i) => i.setTitle(`${prefix}${verb("remove")} "${value}" from ${noun}`).setIcon("rotate-ccw").onClick(() => this.removeFromExclusion(listKey, value)));
        } else {
          const icon = listKey === "excludeWords" ? "ban" : "trash-2";
          const stored = listKey === "excludeWords" ? value.toLowerCase() : value;
          menu.addItem((i) => i.setTitle(`${prefix}${verb("add")} "${value}" to ${noun}`).setIcon(icon).onClick(() => this.addToExclusion(listKey, stored)));
        }
      },
      async addToExclusion(listKey, value) {
        const lines = splitLines2(this.settings[listKey]);
        if (lines.some((l) => l.toLowerCase() === value.toLowerCase())) {
          new Notice2(`Glossary Linker: "${value}" is already excluded`);
          return;
        }
        lines.push(value);
        this.settings[listKey] = lines.join("\n");
        await this.saveSettings();
        this.rebuildIndex();
        this.rerenderViews();
        this.updateStatusBar();
        const where = listKey === "excludeWords" ? "excluded words" : "excluded terms";
        new Notice2(`Glossary Linker: added "${value}" to ${where}`);
      },
      async removeFromExclusion(listKey, value) {
        const v = value.toLowerCase();
        const lines = splitLines2(this.settings[listKey]);
        const kept = lines.filter((l) => l.toLowerCase() !== v);
        if (kept.length === lines.length) {
          new Notice2(`Glossary Linker: "${value}" was not excluded`);
          return;
        }
        this.settings[listKey] = kept.join("\n");
        await this.saveSettings();
        this.rebuildIndex();
        this.rerenderViews();
        this.updateStatusBar();
        const where = listKey === "excludeWords" ? "excluded words" : "excluded terms";
        new Notice2(`Glossary Linker: removed "${value}" from ${where}`);
      },
      // linkAs (optional) overrides which term the occurrence is linked to — used when
      // a word matches several terms and the user picks an alternative from the menu.
      async materializeSingle(file, canonical, display, nearOffset, occurrence, linkAs) {
        let created = false;
        await this.app.vault.process(file, (text) => {
          const matches = this.findMatches(text, this.canonicalForPath(file.path), { protect: true }).filter((m) => m.canonical === canonical && m.display === display);
          if (!matches.length)
            return text;
          let target = matches[0];
          if (occurrence != null && matches[occurrence]) {
            target = matches[occurrence];
          } else if (nearOffset != null) {
            target = matches.reduce((best, m) => Math.abs(m.start - nearOffset) < Math.abs(best.start - nearOffset) ? m : best, matches[0]);
          }
          const chosen = linkAs && linkAs !== target.canonical ? { ...target, canonical: linkAs } : target;
          created = true;
          return this.applyLinks(text, [chosen]).newText;
        });
        if (!created) {
          new Notice2("Glossary Linker: occurrence not found");
          return;
        }
        new Notice2("Glossary Linker: link created");
        this.updateStatusBar();
      },
      // linkAs (optional) links the matched occurrences to a chosen alternative term
      // instead of the one findMatches picked (used to resolve an alias collision).
      async materializeTerm(file, canonical, linkAs) {
        let count = 0;
        await this.app.vault.process(file, (text) => {
          let matches = this.findMatches(text, this.canonicalForPath(file.path), { protect: true }).filter((m) => m.canonical === canonical);
          if (!matches.length)
            return text;
          if (this.settings.linkFirstOnly)
            matches = matches.slice(0, 1);
          if (linkAs && linkAs !== canonical)
            matches = matches.map((m) => ({ ...m, canonical: linkAs }));
          count = matches.length;
          return this.applyLinks(text, matches).newText;
        });
        if (!count) {
          new Notice2("Glossary Linker: no occurrences found");
          return;
        }
        new Notice2(`Glossary Linker: ${count} link(s) created`);
        this.updateStatusBar();
      },
      async materializeTermScope(canonical, linkAs) {
        const term = linkAs || canonical;
        const files = await this.scanScopeMatches((text, file) => {
          let matches = this.findMatches(text, this.canonicalForPath(file.path), { protect: true }).filter((m) => m.canonical === canonical);
          if (this.settings.linkFirstOnly)
            matches = matches.slice(0, 1);
          return matches.map((m) => ({ ...m, canonical: term, alts: null }));
        });
        if (!files.length) {
          new Notice2("Glossary Linker: no occurrences found");
          return;
        }
        this.openMaterializePreview(files, (results) => this.writeScopeResults(results));
      },
      termLiterals(file) {
        const out = /* @__PURE__ */ new Set();
        for (const form of [file.basename, ...this.aliasesOf(file)]) {
          if (typeof form === "string" && form.trim())
            out.add(form.toLowerCase());
        }
        return out;
      },
      // Obsidian keeps inline markup in displayText; drop it so `code`/*em* doesn't reach an alias.
      // Returns '' (skip the link) when no letters survive.
      normalizeDisplay(display) {
        if (typeof display !== "string")
          return "";
        const clean = display.replace(/[`*_~]/g, "").replace(/\s+/g, " ").trim();
        return /\p{L}/u.test(clean) ? clean : "";
      },
      partialOfMultiwordTitle(file, cand) {
        const words = this.tokenizeForm(file.basename);
        if (words.length < 2)
          return false;
        const keys = this.keysFor(cand);
        return words.some((w) => w.keys.some((k) => keys.includes(k)));
      },
      harvestCandidates(display) {
        if (this.settings.harvestSingleWordOnly && this.tokenizeForm(display).length > 1)
          return [];
        const lower = display.toLowerCase();
        const out = [];
        const mode = this.settings.aliasHarvestMode;
        if (mode === "literal" || mode === "both")
          out.push(lower);
        if (mode === "lemma" || mode === "both")
          out.push(this.lemmaFor(display));
        const min = Math.max(1, this.settings.harvestMinLength || 1);
        return [...new Set(out)].filter((a) => a && a.length >= min);
      },
      // Fills `add` (cand → collidesWith) and `skip` from one link's display. Shared by both harvest paths.
      collectAliasesFromDisplay(file, display, literals, add, skip) {
        if (this.termsMatchingText(display).includes(file.basename))
          return;
        for (const cand of this.harvestCandidates(display)) {
          if (add.has(cand))
            continue;
          if (literals.has(cand)) {
            skip.add(cand);
            continue;
          }
          if (this.partialOfMultiwordTitle(file, cand)) {
            skip.add(cand);
            continue;
          }
          add.set(cand, this.settings.aliasCollisionWarnings ? this.termsMatchingText(cand, file.basename) : []);
        }
      },
      async harvestFiles(files, silent) {
        const perTerm = /* @__PURE__ */ new Map();
        for (const file of files) {
          const cache = this.app.metadataCache.getFileCache(file);
          if (!cache || !cache.links)
            continue;
          for (const link of cache.links) {
            const display = this.normalizeDisplay(link.displayText);
            if (!display)
              continue;
            const targetFile = this.app.metadataCache.getFirstLinkpathDest(link.link, file.path);
            if (!targetFile || !this.isGlossaryFile(targetFile))
              continue;
            if (display.toLowerCase() === targetFile.basename.toLowerCase())
              continue;
            let entry = perTerm.get(targetFile.path);
            if (!entry) {
              entry = { file: targetFile, add: /* @__PURE__ */ new Map(), skip: /* @__PURE__ */ new Set(), literals: this.termLiterals(targetFile) };
              perTerm.set(targetFile.path, entry);
            }
            this.collectAliasesFromDisplay(targetFile, display, entry.literals, entry.add, entry.skip);
          }
        }
        const additions = [];
        for (const entry of perTerm.values()) {
          let chosen = [...entry.add.entries()];
          if (silent)
            chosen = chosen.filter(([, collidesWith]) => !collidesWith.length);
          if (!chosen.length)
            continue;
          const aliases = chosen.map(([text, collidesWith]) => ({ text, collidesWith }));
          additions.push({ file: entry.file, aliases, skipped: [...entry.skip] });
        }
        if (!additions.length) {
          if (!silent)
            new Notice2("Glossary Linker: no new aliases found");
          return;
        }
        if (silent) {
          await this.applyHarvest(additions);
          return;
        }
        new HarvestPreviewModal(this.app, additions, (selected) => this.applyHarvest(selected)).open();
      },
      async applyHarvest(selected) {
        await this.ensureGlossaryFolder();
        let total = 0;
        for (const a of selected) {
          await this.app.fileManager.processFrontMatter(a.file, (fm) => {
            let list = fm.aliases;
            if (!Array.isArray(list))
              list = typeof list === "string" && list.trim() ? [list] : [];
            const existing = new Set(list.map((x) => String(x).toLowerCase()));
            for (const al of a.aliases) {
              const text = typeof al === "string" ? al : al.text;
              if (!existing.has(text.toLowerCase())) {
                list.push(text);
                existing.add(text.toLowerCase());
                total++;
              }
            }
            fm.aliases = list;
          });
        }
        this.rebuildIndex();
        this.updateStatusBar();
        new Notice2(`Glossary Linker: ${total} alias(es) added`);
      },
      // Collect just one link's wording as an alias for its term — the per-link version of
      // harvestFiles, reusing the same candidate rules, collision check and preview/apply.
      async harvestOneLink(targetFile, rawDisplay) {
        const display = this.normalizeDisplay(rawDisplay);
        if (!targetFile || !this.isGlossaryFile(targetFile) || !display)
          return;
        if (display.toLowerCase() === targetFile.basename.toLowerCase()) {
          new Notice2("Glossary Linker: that wording already matches the term");
          return;
        }
        const add = /* @__PURE__ */ new Map();
        const skip = /* @__PURE__ */ new Set();
        this.collectAliasesFromDisplay(targetFile, display, this.termLiterals(targetFile), add, skip);
        if (!add.size) {
          new Notice2("Glossary Linker: no new alias to collect");
          return;
        }
        const aliases = [...add.entries()].map(([text, collidesWith]) => ({ text, collidesWith }));
        const additions = [{ file: targetFile, aliases, skipped: [...skip] }];
        new HarvestPreviewModal(this.app, additions, (selected) => this.applyHarvest(selected)).open();
      }
    };
  }
});

// src/api.js
var require_api = __commonJS({
  "src/api.js"(exports2, module2) {
    "use strict";
    var { Notice: Notice2 } = require("obsidian");
    module2.exports = {
      buildApi() {
        return {
          version: this.manifest.version,
          // Every indexed term: { canonical, path, aliases }.
          getTerms: () => this.getTerms(),
          // Resolve a title or alias (case-insensitive) to its term, or null.
          resolveTerm: (name) => this.resolveTerm(name),
          // Morphology helpers (same engine the matcher uses).
          keysFor: (word) => this.keysFor(String(word || "")),
          lemmaFor: (word) => this.lemmaFor(String(word || "")),
          // Glossary matches in arbitrary text, skipping protected ranges.
          findMatches: (text) => this.findMatches(String(text || ""), null, { protect: true }),
          // Heavy: scans in-scope notes and counts occurrences per term. Call explicitly.
          getUsageReport: (opts) => this.getUsageReport(opts),
          // Heavy: frequent in-scope words that are not yet terms. Call explicitly.
          collectCandidates: (opts) => this.collectCandidates(opts),
          // Subscribe to index rebuilds; returns an unsubscribe function.
          onChange: (cb) => this.onIndexChange(cb)
        };
      },
      getTerms() {
        return (this.terms || []).map((t) => ({ canonical: t.canonical, path: t.path, aliases: t.aliases.slice() }));
      },
      resolveTerm(name) {
        if (!name)
          return null;
        const q = String(name).toLowerCase();
        for (const t of this.terms || []) {
          if (t.canonical.toLowerCase() === q)
            return { canonical: t.canonical, path: t.path, aliases: t.aliases.slice() };
          if (t.aliases.some((a) => a.toLowerCase() === q))
            return { canonical: t.canonical, path: t.path, aliases: t.aliases.slice() };
        }
        return null;
      },
      // For every term, how many times it is used across in-scope notes and in which
      // files. Counts plain-text mentions; with opts.includeLinks, also direct
      // [[Term]] / [[Term|alias]] links. Terms with count 0 are orphans.
      async getUsageReport(opts = {}) {
        const counts = /* @__PURE__ */ new Map();
        for (const t of this.terms || [])
          counts.set(t.canonical, { canonical: t.canonical, path: t.path, count: 0, files: [] });
        const files = opts.wholeVault ? this.app.vault.getMarkdownFiles() : this.getScopeFiles();
        for (const file of files) {
          const here = /* @__PURE__ */ new Map();
          try {
            const text = await this.app.vault.cachedRead(file);
            for (const m of this.findMatches(text, this.canonicalForPath(file.path), { protect: true })) {
              here.set(m.canonical, (here.get(m.canonical) || 0) + 1);
            }
          } catch (e) {
          }
          if (opts.includeLinks) {
            const cache = this.app.metadataCache.getFileCache(file);
            for (const link of cache && cache.links || []) {
              const dest = this.app.metadataCache.getFirstLinkpathDest(link.link, file.path);
              if (dest && this.isGlossaryFile(dest))
                here.set(dest.basename, (here.get(dest.basename) || 0) + 1);
            }
          }
          for (const [canonical, n] of here) {
            const entry = counts.get(canonical);
            if (!entry)
              continue;
            entry.count += n;
            entry.files.push({ path: file.path, count: n });
          }
        }
        return [...counts.values()];
      },
      // Frequent in-scope words that are not yet terms — candidates worth defining.
      // Pure frequency: a word is kept when its lemma appears in at least
      // candidateMinNotes notes. Inflected forms collapse onto one lemma.
      async collectCandidates(opts = {}) {
        const minLen = Math.max(1, this.settings.minTermLength || 1);
        const minNotes = Math.max(1, this.settings.candidateMinNotes || 1);
        const groups = /* @__PURE__ */ new Map();
        const files = opts.wholeVault ? this.app.vault.getMarkdownFiles() : this.getScopeFiles();
        const notice = new Notice2("Glossary Linker: scanning\u2026", 0);
        try {
          for (let i = 0; i < files.length; i++) {
            if (i % 25 === 0)
              notice.setMessage(`Glossary Linker: scanning ${i + 1}/${files.length}\u2026`);
            let text;
            try {
              text = await this.app.vault.cachedRead(files[i]);
            } catch (e) {
              continue;
            }
            const protect = this.computeProtected(text);
            for (const m of text.matchAll(/[\p{L}\p{Nd}]+/gu)) {
              const raw = m[0];
              if (/^\p{Nd}+$/u.test(raw))
                continue;
              if (this.overlapsProtected(protect, m.index, m.index + raw.length))
                continue;
              if (this.keysFor(raw).some((k) => this.index.byKey.has(k) || this.excludeWordKeys.has(k)))
                continue;
              const lemma = this.lemmaFor(raw);
              if (lemma.length < minLen)
                continue;
              let g = groups.get(lemma);
              if (!g) {
                g = { forms: /* @__PURE__ */ new Map(), total: 0, files: /* @__PURE__ */ new Set() };
                groups.set(lemma, g);
              }
              g.forms.set(raw, (g.forms.get(raw) || 0) + 1);
              g.total++;
              g.files.add(files[i].path);
            }
          }
        } finally {
          notice.hide();
        }
        const out = [];
        for (const [lemma, g] of groups) {
          if (g.files.size < minNotes)
            continue;
          let display = lemma, best = -1;
          for (const [form, n] of g.forms)
            if (n > best) {
              best = n;
              display = form;
            }
          out.push({ lemma, display, count: g.total, docFreq: g.files.size });
        }
        out.sort((a, b) => b.docFreq - a.docFreq || b.count - a.count);
        return out.slice(0, 100);
      },
      onIndexChange(cb) {
        if (typeof cb !== "function")
          return () => {
          };
        if (!this._indexListeners)
          this._indexListeners = /* @__PURE__ */ new Set();
        this._indexListeners.add(cb);
        return () => this._indexListeners.delete(cb);
      }
    };
  }
});

// src/term-suggest.js
var require_term_suggest = __commonJS({
  "src/term-suggest.js"(exports2, module2) {
    "use strict";
    var obsidian = require("obsidian");
    var { EditorSuggest } = obsidian;
    var GlossaryTermSuggest2 = class extends EditorSuggest {
      constructor(app, plugin) {
        super(app);
        this.plugin = plugin;
      }
      onTrigger(cursor, editor, file) {
        const plugin = this.plugin;
        if (!plugin.settings.linkSuggest)
          return null;
        if (!file || !plugin.inScope(file.path) || plugin.isGlossaryFile(file))
          return null;
        const line = editor.getLine(cursor.line);
        if (/[\p{L}\p{Nd}]/u.test(line[cursor.ch] || ""))
          return null;
        const m = line.slice(0, cursor.ch).match(/[\p{L}\p{Nd}]+$/u);
        if (!m)
          return null;
        const query = m[0];
        if (query.length < Math.max(1, plugin.settings.suggestMinChars || 1))
          return null;
        const off = editor.posToOffset(cursor);
        if (plugin.overlapsProtected(plugin.computeProtected(editor.getValue()), off, off))
          return null;
        return { start: { line: cursor.line, ch: cursor.ch - query.length }, end: cursor, query };
      }
      getSuggestions(context) {
        const plugin = this.plugin;
        const q = context.query;
        const qLower = q.toLowerCase();
        const byCanonical = /* @__PURE__ */ new Map();
        const seenCand = /* @__PURE__ */ new Set();
        for (const key of plugin.keysFor(q)) {
          const bucket = plugin.index.byKey.get(key);
          if (!bucket)
            continue;
          for (const c of bucket) {
            if (c.wordCount !== 1 || seenCand.has(c))
              continue;
            seenCand.add(c);
            if (!byCanonical.has(c.canonical))
              byCanonical.set(c.canonical, { canonical: c.canonical, matchedForm: c.canonical, kind: "form" });
          }
        }
        for (const t of plugin.terms || []) {
          if (byCanonical.has(t.canonical))
            continue;
          let form = null;
          if (t.canonical.toLowerCase().startsWith(qLower))
            form = t.canonical;
          else {
            const a = t.aliases.find((al) => al.toLowerCase().startsWith(qLower));
            if (a)
              form = a;
          }
          if (form)
            byCanonical.set(t.canonical, { canonical: t.canonical, matchedForm: form, kind: "prefix" });
        }
        const items = [...byCanonical.values()];
        const rank = (it) => it.kind === "form" ? 0 : 1;
        items.sort((a, b) => rank(a) - rank(b) || a.matchedForm.length - b.matchedForm.length || a.canonical.localeCompare(b.canonical));
        return items.slice(0, 8);
      }
      renderSuggestion(item, el) {
        el.addClass("glossary-suggestion");
        el.createSpan({ cls: "glossary-suggestion-title", text: item.canonical });
        let note = "";
        if (item.kind === "form")
          note = "inflection";
        else if (item.matchedForm !== item.canonical)
          note = `alias: ${item.matchedForm}`;
        if (note)
          el.createSpan({ cls: "glossary-suggestion-note", text: note });
      }
      selectSuggestion(item) {
        const ctx = this.context;
        if (!ctx)
          return;
        const editor = ctx.editor;
        const display = item.kind === "form" ? ctx.query : item.canonical;
        const inTable = this.plugin.inTableCell(editor.getValue(), editor.posToOffset(ctx.start));
        const link = this.plugin.wikiLink(item.canonical, display, inTable);
        editor.replaceRange(link, ctx.start, ctx.end);
        editor.setCursor(editor.offsetToPos(editor.posToOffset(ctx.start) + link.length));
      }
    };
    var suggestAvailable2 = () => typeof EditorSuggest === "function";
    module2.exports = { GlossaryTermSuggest: GlossaryTermSuggest2, suggestAvailable: suggestAvailable2 };
  }
});

// src/overview-view.js
var require_overview_view = __commonJS({
  "src/overview-view.js"(exports2, module2) {
    "use strict";
    var { ItemView } = require("obsidian");
    var OVERVIEW_VIEW_TYPE2 = "glossary-overview";
    var plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
    var GlossaryOverviewView2 = class extends ItemView {
      constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
        this.terms = [];
        this.candidates = [];
      }
      getViewType() {
        return OVERVIEW_VIEW_TYPE2;
      }
      getDisplayText() {
        return "Glossary";
      }
      getIcon() {
        return "book-a";
      }
      async onOpen() {
        this.contentEl.addClass("glossary-overview");
        this.renderShell();
        this.unsubscribe = this.plugin.onIndexChange(() => this.refreshTerms());
        await this.refresh();
      }
      async onClose() {
        if (this.unsubscribe)
          this.unsubscribe();
      }
      renderShell() {
        const root = this.contentEl;
        root.empty();
        const bar = root.createDiv({ cls: "glossary-overview-bar" });
        bar.createEl("button", { text: "Rescan", cls: "mod-cta" }).onclick = () => this.refresh();
        const scope = bar.createEl("label", { cls: "glossary-overview-check" });
        const sc = scope.createEl("input", { type: "checkbox" });
        sc.checked = this.plugin.settings.overviewWholeVault;
        scope.createSpan({ text: "whole vault" });
        scope.setAttribute("aria-label", "Scan every note instead of only the linker scope");
        sc.onchange = async () => {
          this.plugin.settings.overviewWholeVault = sc.checked;
          await this.plugin.saveSettings();
          await this.refresh();
        };
        this.termsSection = root.createDiv();
        this.candidatesSection = root.createDiv();
      }
      foldHeader(el, label, count, collapsed, onToggle) {
        const head = el.createDiv({ cls: "glossary-overview-head is-toggle" });
        head.createSpan({ cls: "glossary-overview-caret", text: collapsed ? "\u25B8" : "\u25BE" });
        head.createSpan({ text: collapsed ? label : `${label} (${count})` });
        head.onclick = onToggle;
      }
      sortControl(controls, options, value, onChange) {
        controls.createSpan({ text: "Sort" });
        const sel = controls.createEl("select");
        for (const [text, val] of options)
          sel.createEl("option", { text, value: val });
        sel.value = value;
        sel.onchange = () => onChange(sel.value);
      }
      async refresh() {
        await this.loadUsage();
        this.renderTerms();
        await this.refreshCandidates();
      }
      async loadUsage() {
        this.terms = await this.plugin.getUsageReport({
          includeLinks: this.plugin.settings.overviewCountLinks,
          wholeVault: this.plugin.settings.overviewWholeVault
        });
      }
      // Index changes (new/renamed/excluded terms) only change membership, not counts —
      // carry counts over and let an explicit Rescan recompute them.
      refreshTerms() {
        const prev = new Map(this.terms.map((t) => [t.canonical, t.count]));
        this.terms = this.plugin.getTerms().map((t) => ({ canonical: t.canonical, path: t.path, count: prev.get(t.canonical) || 0 }));
        this.renderTerms();
      }
      async refreshCandidates() {
        if (!this.plugin.settings.overviewCandidatesCollapsed) {
          this.candidates = await this.plugin.collectCandidates({ wholeVault: this.plugin.settings.overviewWholeVault });
        }
        this.renderCandidates();
      }
      renderTerms() {
        const el = this.termsSection;
        el.empty();
        const collapsed = this.plugin.settings.overviewTermsCollapsed;
        this.foldHeader(el, "Terms", this.terms.length, collapsed, () => this.toggleTerms());
        if (collapsed)
          return;
        const controls = el.createDiv({ cls: "glossary-overview-controls" });
        this.sortControl(controls, [["Most used", "usage"], ["Name", "name"]], this.plugin.settings.overviewSort, async (v) => {
          this.plugin.settings.overviewSort = v;
          await this.plugin.saveSettings();
          this.renderTerms();
        });
        const check = controls.createEl("label", { cls: "glossary-overview-check" });
        const cb = check.createEl("input", { type: "checkbox" });
        cb.checked = this.plugin.settings.overviewCountLinks;
        check.createSpan({ text: "count links" });
        check.setAttribute("aria-label", "Also count existing [[Term]] links, not just plain-text mentions");
        cb.onchange = async () => {
          this.plugin.settings.overviewCountLinks = cb.checked;
          await this.plugin.saveSettings();
          await this.loadUsage();
          this.renderTerms();
        };
        const list = el.createDiv({ cls: "glossary-overview-list" });
        if (!this.terms.length) {
          list.createDiv({ cls: "glossary-overview-empty", text: "No terms indexed." });
          return;
        }
        const byName = this.plugin.settings.overviewSort === "name";
        const sorted = this.terms.slice().sort((a, b) => byName ? a.canonical.localeCompare(b.canonical) : b.count - a.count || a.canonical.localeCompare(b.canonical));
        for (const t of sorted) {
          const row = list.createDiv({ cls: "glossary-overview-row" });
          if (t.count === 0)
            row.addClass("is-orphan");
          const name = row.createSpan({ cls: "glossary-overview-name is-link", text: t.canonical });
          name.setAttribute("aria-label", "Open \u2014 middle-click for a new tab");
          name.addEventListener("click", () => this.plugin.openTerm(t.canonical, "", false));
          name.addEventListener("mousedown", (e) => {
            if (e.button === 1)
              e.preventDefault();
          });
          name.addEventListener("auxclick", (e) => {
            if (e.button === 1) {
              e.preventDefault();
              this.plugin.openTerm(t.canonical, "", true);
            }
          });
          row.createSpan({ cls: "glossary-overview-count", text: t.count === 0 ? "unused \u26A0" : plural(t.count, "use") });
          const actions2 = row.createSpan({ cls: "glossary-overview-actions" });
          const link = actions2.createEl("a", { cls: "glossary-overview-act", text: "link all" });
          link.onclick = () => this.plugin.materializeTermScope(t.canonical);
        }
      }
      renderCandidates() {
        const el = this.candidatesSection;
        el.empty();
        const collapsed = this.plugin.settings.overviewCandidatesCollapsed;
        this.foldHeader(el, "Candidates", this.candidates.length, collapsed, () => this.toggleCandidates());
        if (collapsed)
          return;
        const controls = el.createDiv({ cls: "glossary-overview-controls" });
        this.sortControl(controls, [["Notes", "notes"], ["Mentions", "count"]], this.plugin.settings.overviewCandidateSort, async (v) => {
          this.plugin.settings.overviewCandidateSort = v;
          await this.plugin.saveSettings();
          this.renderCandidates();
        });
        controls.createSpan({ text: "Min notes" });
        const input = controls.createEl("input", { type: "number" });
        input.min = "1";
        input.value = String(this.plugin.settings.candidateMinNotes);
        input.onchange = async () => {
          const n = Math.max(1, parseInt(input.value, 10) || 1);
          input.value = String(n);
          this.plugin.settings.candidateMinNotes = n;
          await this.plugin.saveSettings();
          await this.refreshCandidates();
        };
        const list = el.createDiv({ cls: "glossary-overview-list" });
        if (!this.candidates.length) {
          list.createDiv({ cls: "glossary-overview-empty", text: "No candidates." });
          return;
        }
        const byCount = this.plugin.settings.overviewCandidateSort === "count";
        const sorted = this.candidates.slice().sort((a, b) => byCount ? b.count - a.count || b.docFreq - a.docFreq : b.docFreq - a.docFreq || b.count - a.count);
        for (const c of sorted) {
          const row = list.createDiv({ cls: "glossary-overview-row" });
          row.createSpan({ cls: "glossary-overview-name", text: c.display });
          row.createSpan({ cls: "glossary-overview-count", text: `${plural(c.docFreq, "note")} \xB7 ${plural(c.count, "use")}` });
          const actions2 = row.createSpan({ cls: "glossary-overview-actions" });
          const add = actions2.createEl("a", { cls: "glossary-overview-act", text: "+ term" });
          add.onclick = async () => {
            await this.plugin.createTermNote(null, c.display, false);
            this.drop(c);
          };
          const dismiss = actions2.createEl("a", { cls: "glossary-overview-act", text: "\u2715" });
          dismiss.onclick = async () => {
            await this.plugin.addToExclusion("excludeWords", c.display.toLowerCase());
            this.drop(c);
          };
        }
      }
      drop(candidate) {
        this.candidates = this.candidates.filter((x) => x !== candidate);
        this.renderCandidates();
      }
      toggleTerms() {
        this.plugin.settings.overviewTermsCollapsed = !this.plugin.settings.overviewTermsCollapsed;
        this.plugin.saveSettings();
        this.renderTerms();
      }
      toggleCandidates() {
        const collapsed = !this.plugin.settings.overviewCandidatesCollapsed;
        this.plugin.settings.overviewCandidatesCollapsed = collapsed;
        this.plugin.saveSettings();
        if (collapsed)
          this.renderCandidates();
        else
          this.refreshCandidates();
      }
    };
    module2.exports = { GlossaryOverviewView: GlossaryOverviewView2, OVERVIEW_VIEW_TYPE: OVERVIEW_VIEW_TYPE2 };
  }
});

// src/main.js
var { Plugin, Notice, TFile, TFolder, debounce } = require("obsidian");
var { DEFAULT_SETTINGS, splitLines, sanitizeFolder } = require_constants();
var BUILTIN_LANGUAGES = require_builtin_languages();
var { validateLanguage } = require_language_api();
var { GlossaryLinkerSettingTab } = require_settings_tab();
var matcher = require_matcher();
var highlight = require_highlight();
var actions = require_actions();
var api = require_api();
var { GlossaryTermSuggest, suggestAvailable } = require_term_suggest();
var { GlossaryOverviewView, OVERVIEW_VIEW_TYPE } = require_overview_view();
var GlossaryLinkerPlugin = class extends Plugin {
  async onload() {
    const loaded = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);
    if (loaded) {
      if (typeof loaded.linkFolders === "string" && loaded.scopeFolders === void 0)
        this.settings.scopeFolders = loaded.linkFolders;
      if (typeof loaded.harvestOnSave === "boolean")
        this.settings.harvestOnSave = loaded.harvestOnSave ? "silent" : "off";
      if (typeof loaded.highlightInLivePreview === "boolean" && loaded.editingHighlight === void 0)
        this.settings.editingHighlight = loaded.highlightInLivePreview ? "live" : "off";
    }
    this.settings.glossaryFolder = sanitizeFolder(this.settings.glossaryFolder);
    this.languages = [];
    this.activeLanguages = [];
    this.languageErrors = [];
    this.index = { byKey: /* @__PURE__ */ new Map(), termCount: 0 };
    this.excludeWordKeys = /* @__PURE__ */ new Set();
    this.keysCache = /* @__PURE__ */ new Map();
    this.terms = [];
    this._indexListeners = /* @__PURE__ */ new Set();
    await this.loadLanguages();
    this.rebuildIndex();
    this.api = this.buildApi();
    this.scheduleRebuild = debounce(() => {
      this.rebuildIndex();
      this.rerenderViews();
      this.updateStatusBar();
    }, 600, true);
    this.refreshOverviewDebounced = debounce(() => this.refreshOverview(), 800, true);
    this.statusBarEl = this.addStatusBarItem();
    this.statusBarEl.addClass("mod-clickable");
    this.statusBarEl.addEventListener("click", () => this.materializeCurrent());
    this.updateStatusBarDebounced = debounce(() => this.updateStatusBar(), 400, true);
    this.registerEvent(this.app.workspace.on("file-open", () => this.updateStatusBarDebounced()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.updateStatusBarDebounced()));
    this.app.workspace.onLayoutReady(() => {
      this.rebuildIndex();
      this.updateStatusBar();
    });
    this.registerEvent(this.app.metadataCache.on("changed", (file) => {
      if (this.isGlossaryPath(file.path))
        this.scheduleRebuild();
    }));
    this.registerEvent(this.app.vault.on("create", (file) => {
      if (this.isGlossaryPath(file.path))
        this.scheduleRebuild();
    }));
    this.registerEvent(this.app.vault.on("delete", (file) => {
      if (this.isGlossaryPath(file.path))
        this.scheduleRebuild();
    }));
    this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
      if (this.isGlossaryPath(file.path) || this.isGlossaryPath(oldPath))
        this.scheduleRebuild();
    }));
    this.harvestOnSaveDebounced = debounce((file) => this.harvestFiles([file], this.settings.harvestOnSave !== "preview"), 1500, true);
    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (file.extension !== "md")
        return;
      if (this.settings.harvestOnSave !== "off" && this.inScope(file.path))
        this.harvestOnSaveDebounced(file);
      if (this.settings.editingHighlight === "onSave")
        this.refreshEditors();
      const active = this.app.workspace.getActiveFile();
      if (active && active.path === file.path)
        this.updateStatusBarDebounced();
    }));
    this.registerEvent(this.app.workspace.on("editor-menu", (menu, editor) => {
      const sel = editor.getSelection().trim();
      const hasSel = !!sel && !sel.includes("\n");
      const link = this.glossaryLinkAt(editor);
      if (this.settings.menuCreateTerm && hasSel && !link) {
        menu.addItem((i) => i.setTitle("Glossary: create term & link").setIcon("plus-circle").onClick(() => this.createTermFromSelection(editor, true)));
        menu.addItem((i) => i.setTitle("Glossary: create term").setIcon("file-plus").onClick(() => this.createTermFromSelection(editor, false)));
      }
      if (this.settings.menuExclude && hasSel && !link) {
        this.addExclusionMenuItem(menu, "excludeWords", sel, "Glossary: ");
      }
      if (this.settings.menuExclude && link) {
        this.addExclusionMenuItem(menu, "excludeWords", link.display, "Glossary: ");
        this.addExclusionMenuItem(menu, "excludeTerms", link.display, "Glossary: ");
      }
      if (this.settings.menuUnlink && link) {
        menu.addItem((i) => i.setTitle("Glossary: unlink this term").setIcon("unlink").onClick(() => this.unlinkLinkAt(editor, link)));
      }
      if (this.settings.menuCollect && link && link.targetFile) {
        menu.addItem((i) => i.setTitle("Glossary: collect this alias").setIcon("download").onClick(() => this.harvestOneLink(link.targetFile, link.display)));
      }
      if (this.settings.menuCollect) {
        const file = this.app.workspace.getActiveFile();
        if (file)
          menu.addItem((i) => i.setTitle("Glossary: collect aliases from links (this note)").setIcon("download").onClick(() => this.harvestFiles([file], false)));
      }
    }));
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file, source) => {
      if (source === "link-context-menu")
        return;
      const isFolder = file instanceof TFolder;
      if (!isFolder && !(file instanceof TFile && file.extension === "md"))
        return;
      const path = file.path;
      const noun = isFolder ? "folder" : "file";
      const item = (title, icon, listKey, add) => menu.addItem((i) => i.setTitle(title).setIcon(icon).onClick(() => this.setPathInList(listKey, path, add)));
      if (this.pathListed("excludeFolders", path)) {
        item("Glossary: remove from always-excluded", "rotate-ccw", "excludeFolders", false);
      } else {
        item(`Glossary: add ${noun} to always-excluded`, "ban", "excludeFolders", true);
      }
      if (this.settings.scopeMode === "folders") {
        const listed = this.pathListed("scopeFolders", path);
        if (listed)
          item(`Glossary: remove ${noun} from scope`, "folder-minus", "scopeFolders", false);
        else
          item(`Glossary: include ${noun} in scope`, "folder-plus", "scopeFolders", true);
      }
    }));
    this.app.workspace.registerHoverLinkSource("glossary-linker", { display: "Glossary Linker", defaultMod: true });
    this.registerMarkdownPostProcessor((el, ctx) => this.processReadingMode(el, ctx));
    this.registerEditingHighlight();
    if (suggestAvailable())
      this.registerEditorSuggest(new GlossaryTermSuggest(this.app, this));
    this.registerView(OVERVIEW_VIEW_TYPE, (leaf) => new GlossaryOverviewView(leaf, this));
    this.applyRibbonIcon();
    this.addCommand({
      id: "open-overview",
      name: "Open glossary overview",
      callback: () => this.activateOverview()
    });
    this.addCommand({
      id: "materialize-current",
      name: "Link glossary terms: this note",
      callback: () => this.materializeCurrent()
    });
    this.addCommand({
      id: "materialize-selection",
      name: "Link glossary terms: selection",
      editorCallback: (editor) => this.materializeSelection(editor)
    });
    this.addCommand({
      id: "materialize-scope",
      name: "Link glossary terms: all notes",
      callback: () => this.materializeScope()
    });
    this.addCommand({
      id: "unlink-current",
      name: "Unlink glossary terms: this note",
      callback: () => this.unlinkCurrent()
    });
    this.addCommand({
      id: "unlink-selection",
      name: "Unlink glossary terms: selection",
      editorCallback: (editor) => this.unlinkSelection(editor)
    });
    this.addCommand({
      id: "unlink-scope",
      name: "Unlink glossary terms: all notes",
      callback: () => this.unlinkScope()
    });
    this.addCommand({
      id: "harvest-current",
      name: "Collect aliases from links: this note",
      callback: () => {
        const f = this.app.workspace.getActiveFile();
        if (f)
          this.harvestFiles([f], false);
      }
    });
    this.addCommand({
      id: "harvest-scope",
      name: "Collect aliases from links: all notes",
      callback: () => this.harvestFiles(this.getScopeFiles(), false)
    });
    this.addCommand({
      id: "create-term-from-selection",
      name: "Create glossary term from selection",
      editorCallback: (editor) => this.createTermFromSelection(editor, true)
    });
    this.addCommand({
      id: "rebuild-index",
      name: "Rebuild glossary index",
      callback: () => {
        this.rebuildIndex();
        new Notice("Glossary Linker: index rebuilt");
      }
    });
    this.addSettingTab(new GlossaryLinkerSettingTab(this.app, this));
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async loadLanguages() {
    this.languages = [];
    this.languageErrors = [];
    const seen = /* @__PURE__ */ new Set();
    for (const lang of BUILTIN_LANGUAGES) {
      const id = lang && lang.id;
      const error = validateLanguage(lang);
      if (error) {
        this.languageErrors.push({ id: id || "?", error });
        continue;
      }
      if (seen.has(id)) {
        this.languageErrors.push({ id, error: `duplicate id "${id}"` });
        continue;
      }
      seen.add(id);
      this.languages.push(lang);
    }
    this.sortLanguages();
    this.languageErrors.sort((a, b) => a.id.localeCompare(b.id));
    if (!Array.isArray(this.settings.enabledLanguages)) {
      const sys = (window.localStorage.getItem("language") || "").split("-")[0].toLowerCase();
      const wanted = /* @__PURE__ */ new Set(["en"]);
      if (sys && this.languages.some((l) => l.id === sys))
        wanted.add(sys);
      this.settings.enabledLanguages = this.languages.filter((l) => wanted.has(l.id)).map((l) => l.id);
      await this.saveSettings();
    }
    this.refreshActiveLanguages();
  }
  sortLanguages() {
    const order = this.settings.languageOrder || [];
    const rank = (l) => {
      const i = order.indexOf(l.id);
      return i === -1 ? Infinity : i;
    };
    this.languages.sort((a, b) => rank(a) - rank(b) || (b.priority || 0) - (a.priority || 0) || a.name.localeCompare(b.name));
  }
  moveLanguage(id, dir) {
    const ids = this.languages.map((l) => l.id);
    const i = ids.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length)
      return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    this.settings.languageOrder = ids;
    this.sortLanguages();
  }
  refreshActiveLanguages() {
    const enabled = new Set(this.settings.enabledLanguages || []);
    this.activeLanguages = this.languages.filter((l) => enabled.has(l.id));
    this.keysCache = /* @__PURE__ */ new Map();
  }
  async updateStatusBar() {
    const el = this.statusBarEl;
    if (!el)
      return;
    const clear = () => {
      el.setText("");
      el.removeAttribute("aria-label");
    };
    if (!this.settings.statusBar)
      return clear();
    const file = this.app.workspace.getActiveFile();
    if (!file || file.extension !== "md" || !this.inScope(file.path))
      return clear();
    try {
      const text = await this.app.vault.cachedRead(file);
      const canon = new Set(this.findMatches(text, this.canonicalForPath(file.path), { protect: true }).map((m) => m.canonical));
      if (this.settings.statusBarIncludeLinks) {
        const cache = this.app.metadataCache.getFileCache(file);
        for (const link of cache && cache.links || []) {
          const dest = this.app.metadataCache.getFirstLinkpathDest(link.link, file.path);
          if (dest && this.isGlossaryFile(dest))
            canon.add(dest.basename);
        }
      }
      const n = canon.size;
      el.setText(`${n} term${n === 1 ? "" : "s"}`);
      el.setAttribute("aria-label", `${n} glossary term(s) on this page \u2014 click to link them`);
    } catch (e) {
      clear();
    }
  }
  isGlossaryPath(path) {
    const p = this.settings.glossaryFolder.replace(/\/+$/, "");
    return path === `${p}.md` || path.startsWith(`${p}/`);
  }
  isGlossaryFile(file) {
    return file && file.extension === "md" && this.isGlossaryPath(file.path);
  }
  async ensureGlossaryFolder() {
    const path = this.settings.glossaryFolder.replace(/\/+$/, "");
    if (!path || this.app.vault.getAbstractFileByPath(path))
      return;
    try {
      await this.app.vault.createFolder(path);
    } catch (e) {
    }
  }
  canonicalForPath(path) {
    if (!path || !this.isGlossaryPath(path))
      return null;
    const base = path.split("/").pop();
    return base.replace(/\.md$/, "");
  }
  // Parse the inside of a [[...]] into { target, display, hasSubpath }. Mirrors the
  // table-escape (\| separator) and #subpath handling so every link-reading path agrees.
  parseWikiInner(inner) {
    const pipe = inner.indexOf("|");
    const rawTarget = (pipe >= 0 ? inner.slice(0, pipe) : inner).replace(/\\$/, "").trim();
    const hasSubpath = rawTarget.includes("#");
    const target = rawTarget.replace(/#.*$/, "").trim();
    const display = (pipe >= 0 ? inner.slice(pipe + 1) : target).trim();
    return { target, display, hasSubpath };
  }
  // The wikilink the cursor or selection touches if it points to a glossary term, else null.
  // Spanning the selection (not just a point) is what catches a link in a table cell, where a
  // right-click selects the cell text instead of placing a bare cursor.
  glossaryLinkAt(editor) {
    const head = editor.getCursor("head");
    const from = editor.getCursor("from");
    const to = editor.getCursor("to");
    const lineNo = head.line;
    const line = editor.getLine(lineNo);
    const selStart = from.line === lineNo ? from.ch : 0;
    const selEnd = to.line === lineNo ? to.ch : line.length;
    const re = /\[\[([^\]\n]+)\]\]/g;
    let m;
    while ((m = re.exec(line)) !== null) {
      const s = m.index;
      const e = m.index + m[0].length;
      if (selEnd < s || selStart > e)
        continue;
      const { target, display } = this.parseWikiInner(m[1]);
      if (!target)
        continue;
      const sourcePath = this.app.workspace.getActiveFile() ? this.app.workspace.getActiveFile().path : "";
      const dest = this.app.metadataCache.getFirstLinkpathDest(target, sourcePath);
      if (dest && this.isGlossaryFile(dest))
        return { canonical: dest.basename, display, targetFile: dest, line: lineNo, from: s, to: e };
    }
    return null;
  }
  aliasesOf(file) {
    const fm = this.app.metadataCache.getFileCache(file);
    const a = fm && fm.frontmatter && fm.frontmatter.aliases;
    if (Array.isArray(a))
      return a.filter((x) => typeof x === "string" && x.trim());
    if (typeof a === "string" && a.trim())
      return [a];
    return [];
  }
  activeCanonical() {
    const f = this.app.workspace.getActiveFile();
    return f ? this.canonicalForPath(f.path) : null;
  }
  wikiLink(canonical, display, inTable) {
    if (display === canonical)
      return `[[${canonical}]]`;
    return inTable ? `[[${canonical}\\|${display}]]` : `[[${canonical}|${display}]]`;
  }
  inTableCell(text, pos) {
    const lines = text.split("\n");
    const lineIdx = (text.slice(0, pos).match(/\n/g) || []).length;
    if (!lines[lineIdx] || !lines[lineIdx].includes("|"))
      return false;
    const isDelimiter = (l) => l.includes("|") && l.includes("-") && /^[\s|:-]+$/.test(l);
    let top = lineIdx, bot = lineIdx;
    while (top > 0 && lines[top - 1].trim() !== "")
      top--;
    while (bot < lines.length - 1 && lines[bot + 1].trim() !== "")
      bot++;
    for (let i = top; i <= bot; i++)
      if (isDelimiter(lines[i]))
        return true;
    return false;
  }
  // Replace each match (sorted, non-overlapping) with a wikilink, right to left.
  applyLinks(text, matches) {
    const sorted = matches.slice().sort((a, b) => a.start - b.start);
    const links = sorted.map((m) => this.wikiLink(m.canonical, m.display, this.inTableCell(text, m.start)));
    let out = text;
    for (let j = sorted.length - 1; j >= 0; j--) {
      out = out.slice(0, sorted[j].start) + links[j] + out.slice(sorted[j].end);
    }
    const changes = sorted.map((m, j) => ({ start: m.start, before: m.display, after: links[j] }));
    return { newText: out, changes };
  }
  // Inverse of applyLinks: replace each glossary link span with its plain display text,
  // right to left. The display has no pipe, so a table cell survives without escaping.
  unlinkLinks(text, links) {
    const sorted = links.slice().sort((a, b) => a.start - b.start);
    let out = text;
    for (let j = sorted.length - 1; j >= 0; j--) {
      out = out.slice(0, sorted[j].start) + sorted[j].display + out.slice(sorted[j].end);
    }
    return { newText: out, count: sorted.length };
  }
  // Unlink the single glossary link under the cursor (from glossaryLinkAt).
  unlinkLinkAt(editor, link) {
    editor.replaceRange(link.display, { line: link.line, ch: link.from }, { line: link.line, ch: link.to });
    new Notice("Glossary Linker: unlinked");
    this.updateStatusBar();
  }
  openTerm(canonical, sourcePath, newTab) {
    this.app.workspace.openLinkText(canonical, sourcePath || "", newTab);
  }
  hoverTerm(event, targetEl, canonical, sourcePath) {
    this.app.workspace.trigger("hover-link", {
      event,
      source: "glossary-linker",
      hoverParent: this,
      targetEl,
      linktext: canonical,
      sourcePath: sourcePath || ""
    });
  }
  inScope(path) {
    const covers = (entry) => {
      const e = sanitizeFolder(entry);
      return !!e && (path === e || path.startsWith(e + "/"));
    };
    if (splitLines(this.settings.excludeFolders).some(covers))
      return false;
    if (this.settings.scopeMode === "folders")
      return splitLines(this.settings.scopeFolders).some(covers);
    return true;
  }
  getScopeFiles() {
    return this.app.vault.getMarkdownFiles().filter((f) => this.inScope(f.path));
  }
  pathListed(listKey, path) {
    const entry = sanitizeFolder(path);
    return !!entry && splitLines(this.settings[listKey]).some((l) => sanitizeFolder(l) === entry);
  }
  // Scope only affects which notes get linked, so a rerender — not a rebuild — is enough.
  async setPathInList(listKey, path, add) {
    const entry = sanitizeFolder(path);
    if (!entry || add === this.pathListed(listKey, path))
      return;
    const lines = splitLines(this.settings[listKey]);
    this.settings[listKey] = (add ? [...lines, entry] : lines.filter((l) => sanitizeFolder(l) !== entry)).join("\n");
    await this.saveSettings();
    this.rerenderViews();
    this.updateStatusBar();
    this.refreshOverviewDebounced();
    const where = listKey === "excludeFolders" ? "always-excluded paths" : "paths in scope";
    new Notice(`Glossary Linker: ${add ? "added" : "removed"} "${entry}" ${add ? "to" : "from"} ${where}`);
  }
  rerenderViews() {
    this.app.workspace.getLeavesOfType("markdown").forEach((leaf) => {
      const v = leaf.view;
      if (v && v.previewMode && typeof v.previewMode.rerender === "function")
        v.previewMode.rerender(true);
    });
    this.refreshEditors();
  }
  refreshEditors() {
    if (!this.cmRefreshEffect)
      return;
    this.app.workspace.getLeavesOfType("markdown").forEach((leaf) => {
      const cm = leaf.view && leaf.view.editor && leaf.view.editor.cm;
      if (cm)
        cm.dispatch({ effects: this.cmRefreshEffect.of(null) });
    });
  }
  async activateOverview() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(OVERVIEW_VIEW_TYPE)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: OVERVIEW_VIEW_TYPE, active: true });
    }
    workspace.revealLeaf(leaf);
  }
  refreshOverview() {
    this.app.workspace.getLeavesOfType(OVERVIEW_VIEW_TYPE).forEach((leaf) => {
      if (leaf.view && typeof leaf.view.refresh === "function")
        leaf.view.refresh();
    });
  }
  applyRibbonIcon() {
    const want = this.settings.showRibbonIcon;
    if (want && !this.ribbonEl) {
      this.ribbonEl = this.addRibbonIcon("book-a", "Glossary overview", () => this.activateOverview());
    } else if (!want && this.ribbonEl) {
      this.ribbonEl.remove();
      this.ribbonEl = null;
    }
  }
};
Object.assign(GlossaryLinkerPlugin.prototype, matcher, highlight, actions, api);
module.exports = GlossaryLinkerPlugin;
