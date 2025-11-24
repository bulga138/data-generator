/**
 * i18n Manager
 * Handles language detection, switching, and translation
 */

import { translations } from './translations.js';

class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = translations;
        this.listeners = [];
    }

    /**
     * Detect user's preferred language
     */
    detectLanguage() {
        // Check localStorage
        const saved = localStorage.getItem('language');
        if (saved && translations[saved]) return saved;
        
        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) return browserLang;
        
        // Default to English
        return 'en';
    }

    /**
     * Set current language
     */
    setLanguage(lang) {
        if (!translations[lang]) {
            console.warn(`Language '${lang}' not available`);
            return false;
        }
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        
        this.updatePage();
        this.notifyListeners();
        
        return true;
    }

    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLang;
    }

    /**
     * Translate a key
     * @param {string} key - Translation key (e.g., 'app.title')
     * @param {object} params - Parameters to replace in translation
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let value = translations[this.currentLang];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        if (!value) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }
        
        // Replace parameters like {count}, {action}, etc.
        return value.replace(/\{(\w+)\}/g, (match, param) => {
            return params[param] !== undefined ? params[param] : match;
        });
    }

    /**
     * Update all elements on the page with translations
     */
    updatePage() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
            el.textContent = this.t(key, params);
        });
        
        // Update HTML content (for elements that need HTML)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
            el.innerHTML = this.t(key, params);
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            el.placeholder = this.t(key);
        });
        
        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            el.setAttribute('aria-label', this.t(key));
        });
        
        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            el.title = this.t(key);
        });
    }

    /**
     * Add a listener for language changes
     */
    addListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all listeners of language change
     */
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentLang));
    }

    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return Object.keys(translations);
    }
}

// Export singleton instance
export const i18n = new I18n();
