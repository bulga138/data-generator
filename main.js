/**
 * Main Application Controller
 * Handles UI interactions and orchestrates data generation
 */

import { downloadFile, copyToClipboard, showToast } from './utils/formatter.js';
import { getCountryInfo, isFieldAvailable, COUNTRIES } from './utils/country-config.js';
import { i18n } from './i18n/i18n.js';
import { generateFullName } from './utils/names.js';

// Import generators
import * as GlobalGen from './generators/global.js';
import * as USAGen from './generators/usa.js';
import * as IndiaGen from './generators/india.js';
import * as BrazilGen from './generators/brazil.js';
import * as GermanyGen from './generators/germany.js';
import * as CanadaGen from './generators/canada.js';
import * as ChinaGen from './generators/china.js';
import * as AustraliaGen from './generators/australia.js';

// Generator mapping
const GENERATORS = {
    global: GlobalGen,
    usa: USAGen,
    india: IndiaGen,
    brazil: BrazilGen,
    germany: GermanyGen,
    canada: CanadaGen,
    china: ChinaGen,
    australia: AustraliaGen
};

// Application state
let generatedData = [];
let currentCountry = 'global';
let selectedFields = {};

// DOM Elements
const countrySelect = document.getElementById('countrySelect');
const quantityInput = document.getElementById('quantityInput');
const generateBtn = document.getElementById('generateBtn');

// Output elements
const tableHeader = document.getElementById('tableHeader');
const tableBody = document.getElementById('tableBody');
const jsonOutput = document.getElementById('jsonOutput');
const csvOutput = document.getElementById('csvOutput');

// Download buttons
const downloadJSON = document.getElementById('downloadJSON');
const downloadCSV = document.getElementById('downloadCSV');

/**
 * Initialize the application
 */
function init() {
    // Populate country dropdown first (before i18n updates)
    populateCountryDropdown();
    
    // Initialize i18n (after dropdown is populated)
    i18n.updatePage();
    
    // Setup theme and language switchers
    setupThemeSwitcher();
    setupLanguageSwitcher();
    
    // Setup UI Logic
    syncCheckboxes();
    setupCardTypeToggle();
    
    // Load saved configuration
    loadConfig();
    
    // Event listeners
    countrySelect.addEventListener('change', () => {
        handleCountryChange();
        saveConfig();
    });
    
    quantityInput.addEventListener('change', saveConfig);
    quantityInput.addEventListener('input', saveConfig);
    
    generateBtn.addEventListener('click', handleGenerate);
    
    downloadJSON.addEventListener('click', () => handleDownload('json'));
    downloadCSV.addEventListener('click', () => handleDownload('csv'));
    
    // Tab change listeners
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', saveConfig);
    });
    
    // Initial field availability update
    if (!localStorage.getItem('dg_config')) {
        updateFieldAvailability();
    }

    setupEventListeners();
}

/**
 * Setup event listeners for static and dynamic elements
 */
function setupEventListeners() {
    // Clear Data Button
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllOutput);
    }

    // Copy Buttons
    const copyJSONBtn = document.getElementById('copyJSONBtn');
    if (copyJSONBtn) {
        copyJSONBtn.addEventListener('click', copyJSON);
    }

    const copyCSVBtn = document.getElementById('copyCSVBtn');
    if (copyCSVBtn) {
        copyCSVBtn.addEventListener('click', copyCSV);
    }

    // Table Event Delegation (Copy Table, Row, Cell)
    if (tableHeader) {
        tableHeader.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-table-btn')) {
                copyEntireTable();
            }
        });
    }

    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            const target = e.target;
            
            // Copy Row
            if (target.classList.contains('copy-row-btn')) {
                const row = target.closest('tr');
                if (row) {
                    const index = parseInt(row.dataset.index);
                    copyRow(index);
                }
            }
            
            // Copy Cell
            if (target.classList.contains('copy-cell-btn')) {
                const cell = target.closest('td');
                if (cell) {
                    copyCell(cell.id);
                }
            }
        });
    }
}

/**
 * Setup theme switcher
 */
function setupThemeSwitcher() {
    const toggle = document.getElementById('themeToggle');
    const menu = document.getElementById('themeMenu');
    const btn = toggle.querySelector('.btn');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('show');
    });
    
    menu.querySelectorAll('[data-theme]').forEach(item => {
        item.addEventListener('click', () => {
            const theme = item.dataset.theme;
            setTheme(theme);
            menu.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target)) {
            menu.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Keyboard navigation
    menu.addEventListener('keydown', (e) => {
        const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
        const current = document.activeElement;
        const index = items.indexOf(current);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[(index + 1) % items.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[(index - 1 + items.length) % items.length].focus();
        } else if (e.key === 'Escape') {
            menu.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

/**
 * Set theme
 */
function setTheme(theme) {
    document.body.className = `${theme}-mode`;
    localStorage.setItem('theme', theme);
}

/**
 * Setup language switcher
 */
function setupLanguageSwitcher() {
    const toggle = document.getElementById('languageToggle');
    const menu = document.getElementById('languageMenu');
    const btn = toggle.querySelector('.btn');
    const currentLangSpan = document.getElementById('currentLang');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('show');
    });
    
    menu.querySelectorAll('[data-lang]').forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.dataset.lang;
            i18n.setLanguage(lang);
            currentLangSpan.textContent = lang.toUpperCase();
            menu.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target)) {
            menu.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Keyboard navigation
    menu.addEventListener('keydown', (e) => {
        const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
        const current = document.activeElement;
        const index = items.indexOf(current);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[(index + 1) % items.length].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[(index - 1 + items.length) % items.length].focus();
        } else if (e.key === 'Escape') {
            menu.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
        }
    });
    
    // Set initial language
    currentLangSpan.textContent = i18n.getLanguage().toUpperCase();
}

/**
 * Populate country dropdown in alphabetical order
 */
function populateCountryDropdown() {
    // Convert COUNTRIES object to array and sort alphabetically
    const countriesArray = Object.entries(COUNTRIES).map(([code, info]) => ({
        code,
        name: info.name,
        flag: info.flag
    }));
    
    // Sort by name (Global first, then alphabetically)
    countriesArray.sort((a, b) => {
        if (a.code === 'global') return -1;
        if (b.code === 'global') return 1;
        return a.name.localeCompare(b.name);
    });
    
    // Populate dropdown
    countriesArray.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name}`;
        countrySelect.appendChild(option);
    });
}

/**
 * Handle country selection change
 */
function handleCountryChange() {
    currentCountry = countrySelect.value;
    updateFieldAvailability();
}

/**
 * Update field availability based on selected country
 */
function updateFieldAvailability() {
    const allCheckboxes = document.querySelectorAll('.field-checkbox');
    
    allCheckboxes.forEach(checkbox => {
        const field = checkbox.dataset.field;
        const available = isFieldAvailable(currentCountry, field);
        
        checkbox.disabled = !available;
        const label = checkbox.parentElement;
        if (!available) {
            checkbox.checked = false;
            label.style.opacity = '0.5';
        } else {
            label.style.opacity = '1';
        }
    });
}

/**
 * Get selected fields from checkboxes
 */
function getSelectedFields() {
    const fields = {};
    const checkboxes = document.querySelectorAll('.field-checkbox');
    
    checkboxes.forEach(checkbox => {
        const field = checkbox.dataset.field;
        if (!fields[field]) {
            fields[field] = checkbox.checked;
        }
    });
    
    return fields;
}

/**
 * Get selected card type
 */
function getSelectedCardType() {
    const cardTypeSelect = document.getElementById('cardTypeSelect') || document.getElementById('cardTypeSelect_all');
    return cardTypeSelect ? cardTypeSelect.value : 'random';
}

/**
 * Handle data generation
 */
async function handleGenerate() {
    const quantity = parseInt(quantityInput.value);
    
    if (quantity < 1 || quantity > 10000) {
        showToast(i18n.t('messages.errorQuantity'), 'error');
        return;
    }
    
    // Get selected fields
    selectedFields = getSelectedFields();
    
    // Check if at least one field is selected
    if (!Object.values(selectedFields).some(v => v)) {
        showToast(i18n.t('messages.errorNoFields'), 'error');
        return;
    }
    
    // Show loading state
    generateBtn.disabled = true;
    const originalHTML = generateBtn.innerHTML;
    generateBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${i18n.t('actions.generating')}`;
    
    try {
        // Generate data
        generatedData = await generateData(currentCountry, quantity, selectedFields);
        
        // Update all views
        updateViews();
        
        showToast(i18n.t('messages.success', { count: quantity }), 'success');
    } catch (error) {
        console.error('Generation error:', error);
        showToast(i18n.t('messages.errorGeneral'), 'error');
    } finally {
        // Reset button
        generateBtn.disabled = false;
        generateBtn.innerHTML = originalHTML;
    }
}

/**
 * Generate data records
 */
async function generateData(country, quantity, fields) {
    const data = [];
    const isGlobal = country === 'global';
    const availableCountries = Object.keys(COUNTRIES).filter(c => c !== 'global');
    const cardType = getSelectedCardType();
    
    for (let i = 0; i < quantity; i++) {
        // Determine country for this record
        const recordCountry = isGlobal ? 
            availableCountries[Math.floor(Math.random() * availableCountries.length)] : 
            country;
            
        const countryInfo = getCountryInfo(recordCountry);
        const generator = GENERATORS[recordCountry] || GENERATORS.global;
        const record = {};
        
        // Add Country field
        if (isGlobal) {
            record.country = recordCountry;
        }
        
        // Generate Name
        if (fields.name) {
            record.name = generateFullName(recordCountry);
        }

        // Generate National ID
        if (fields.nationalId && isFieldAvailable(recordCountry, 'nationalId')) {
            try {
                if (recordCountry === 'usa' && generator.generateSSN) {
                    record.national_id = generator.generateSSN();
                } else if (recordCountry === 'india' && generator.generateAadhaar) {
                    record.national_id = generator.formatAadhaar ? generator.formatAadhaar(generator.generateAadhaar()) : generator.generateAadhaar();
                } else if (recordCountry === 'brazil' && generator.generateCPF) {
                    record.national_id = generator.generateCPF(true);
                } else if (recordCountry === 'germany' && generator.generatePersonalausweis) {
                    record.national_id = generator.generatePersonalausweis();
                } else if (recordCountry === 'canada' && generator.generateSIN) {
                    record.national_id = generator.generateSIN(true);
                } else if (recordCountry === 'china' && generator.generateChineseID) {
                    record.national_id = generator.generateChineseID();
                } else if (recordCountry === 'australia' && generator.generateTFN) {
                    record.national_id = generator.generateTFN();
                } else if (GlobalGen.generateUUID) {
                    record.national_id = GlobalGen.generateUUID();
                }
            } catch (e) {
                console.warn(`Failed to generate national ID for ${recordCountry}:`, e);
            }
        }
        
        // Generate Passport
        if (fields.passport) {
            record.passport = generatePassportNumber(recordCountry);
        }
        
        // Generate Credit Card
        if (fields.creditCard) {
            try {
                let cardData;
                const selectedType = cardType === 'random' ? getRandomCardType() : cardType;
                
                if (recordCountry === 'usa' && generator.generateUSCreditCard) {
                    cardData = generator.generateUSCreditCard(selectedType);
                } else if (recordCountry === 'china' && generator.generateUnionPayCard) {
                    cardData = {
                        number: generator.generateUnionPayCard(),
                        cvv: GlobalGen.generateCVV(),
                        expiry: GlobalGen.generateExpiryDate(),
                        type: 'UnionPay'
                    };
                } else {
                    cardData = {
                        number: GlobalGen.generateCreditCard(selectedType),
                        cvv: GlobalGen.generateCVV(selectedType === 'amex' ? 4 : 3),
                        expiry: GlobalGen.generateExpiryDate(),
                        type: formatCardType(selectedType)
                    };
                }
                
                // Flatten credit card data for easier CSV export
                record.credit_card_number = cardData.number;
                record.credit_card_cvv = cardData.cvv;
                record.credit_card_expiry = cardData.expiry;
                record.credit_card_type = cardData.type;
            } catch (e) {
                console.warn(`Failed to generate credit card for ${recordCountry}:`, e);
            }
        }
        
        // Generate Bank Account
        if (fields.bankAccount && isFieldAvailable(recordCountry, 'bankAccount')) {
            try {
                if (recordCountry === 'usa' && generator.generateRoutingNumber) {
                    record.bank_account = generator.generateRoutingNumber();
                } else if (recordCountry === 'germany' && generator.generateGermanIBAN) {
                    record.bank_account = generator.generateGermanIBAN(true);
                } else if (recordCountry === 'india' && generator.generateIFSC) {
                    record.bank_account = generator.generateIFSC();
                } else if (recordCountry === 'canada' && generator.generateRoutingNumber) {
                    record.bank_account = generator.generateRoutingNumber();
                } else if (recordCountry === 'australia' && generator.generateBSB) {
                    record.bank_account = generator.generateBSB();
                }
            } catch (e) {
                console.warn(`Failed to generate bank account for ${recordCountry}:`, e);
            }
        }
        
        // Generate Mobile Phone
        if (fields.mobile) {
            try {
                if (recordCountry === 'usa' && generator.generateUSPhone) {
                    record.mobile_phone = generator.generateUSPhone();
                } else if (recordCountry === 'india' && generator.generateIndianPhone) {
                    record.mobile_phone = generator.generateIndianPhone();
                } else if (recordCountry === 'brazil' && generator.generateBrazilianPhone) {
                    record.mobile_phone = generator.generateBrazilianPhone();
                } else if (recordCountry === 'germany' && generator.generateGermanPhone) {
                    record.mobile_phone = generator.generateGermanPhone();
                } else if (recordCountry === 'uk' && generator.generateUKPhone) {
                    record.mobile_phone = generator.generateUKPhone();
                } else if (recordCountry === 'france' && generator.generateFrenchPhone) {
                    record.mobile_phone = generator.generateFrenchPhone();
                } else if (recordCountry === 'china' && generator.generateChinesePhone) {
                    record.mobile_phone = generator.generateChinesePhone();
                } else if (recordCountry === 'australia' && generator.generateAustralianPhone) {
                    record.mobile_phone = generator.generateAustralianPhone();
                } else {
                    record.mobile_phone = GlobalGen.generateE164Phone('1', 10);
                }
            } catch (e) {
                console.warn(`Failed to generate mobile phone for ${recordCountry}:`, e);
                record.mobile_phone = "N/A";
            }
        }

        // Generate Postal Code
        if (fields.postalCode && isFieldAvailable(recordCountry, 'postalCode')) {
            try {
                if (recordCountry === 'usa' && generator.generateZipCode) {
                    record.postal_code = generator.generateZipCode();
                } else if (recordCountry === 'india' && generator.generatePinCode) {
                    record.postal_code = generator.generatePinCode();
                } else if (recordCountry === 'brazil' && generator.generateCEP) {
                    record.postal_code = generator.generateCEP();
                } else if (recordCountry === 'germany' && generator.generatePLZ) {
                    record.postal_code = generator.generatePLZ();
                } else if (recordCountry === 'canada' && generator.generatePostalCode) {
                    record.postal_code = generator.generatePostalCode();
                } else if (recordCountry === 'china' && generator.generatePostalCode) {
                    record.postal_code = generator.generatePostalCode();
                } else if (recordCountry === 'australia' && generator.generatePostcode) {
                    record.postal_code = generator.generatePostcode();
                }
            } catch (e) {
                console.warn(`Failed to generate postal code for ${recordCountry}:`, e);
            }
        }

        // Generate Email
        if (fields.email) {
            record.email = GlobalGen.generateEmail(countryInfo.tld);
        }
        
        data.push(record);
    }
    
    return data;
}

/**
 * Get random card type
 */
function getRandomCardType() {
    const types = ['visa', 'mastercard', 'amex', 'discover'];
    return types[Math.floor(Math.random() * types.length)];
}

/**
 * Format card type for display
 */
function formatCardType(type) {
    const typeMap = {
        'visa': 'Visa',
        'mastercard': 'Mastercard',
        'amex': 'American Express',
        'discover': 'Discover'
    };
    return typeMap[type] || 'Visa';
}

/**
 * Generate passport number
 */
function generatePassportNumber(country) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const countryCode = country.toUpperCase().substring(0, 2);
    
    let passport = countryCode;
    for (let i = 0; i < 7; i++) {
        passport += Math.floor(Math.random() * 10);
    }
    
    return passport;
}

/**
 * Update all output views
 */
function updateViews() {
    // Update table
    updateTableView();
    
    // Update JSON
    jsonOutput.textContent = formatAsJSON(generatedData);
    
    // Update CSV
    csvOutput.textContent = formatAsCSV(generatedData);
}

/**
 * Format data as JSON
 */
function formatAsJSON(data) {
    return JSON.stringify(data, null, 2);
}

/**
 * Format data as CSV
 */
function formatAsCSV(data) {
    if (!data || data.length === 0) return '';
    
    // Get all unique keys from all records
    const allKeys = new Set();
    data.forEach(record => {
        Object.keys(record).forEach(key => allKeys.add(key));
    });
    
    const keys = Array.from(allKeys);
    
    // Create header row
    const header = keys.map(key => `"${formatLabel(key)}"`).join(',');
    
    // Create data rows
    const rows = data.map(record => {
        return keys.map(key => {
            const value = record[key];
            if (value === null || value === undefined) return '';
            return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',');
    });
    
    return [header, ...rows].join('\n');
}

/**
 * Update table view with dynamic columns
 */
function updateTableView() {
    if (!generatedData || generatedData.length === 0) {
        // Reset header to default
        tableHeader.innerHTML = `
            <th style="width: 40px;">
                <i class="fas fa-copy copy-table-btn" style="cursor: pointer;" 
                   title="${i18n.t('aria.copyTable')}"
                   role="button"
                   tabindex="0"
                   aria-label="${i18n.t('aria.copyTable')}"></i>
            </th>
            <th>#</th>
        `;
        
        // Show no data message
        tableBody.innerHTML = `<tr><td colspan="2" class="text-center text-muted py-5">
            <span data-i18n="output.noData">${i18n.t('output.noData')}</span>
        </td></tr>`;
        return;
    }
    
    // Get all unique keys from generated data
    const allKeys = new Set();
    generatedData.forEach(record => {
        Object.keys(record).forEach(key => allKeys.add(key));
    });
    
    const keys = Array.from(allKeys);
    
    // Update table header
    let headerHTML = `
        <th style="width: 40px;">
            <i class="fas fa-copy copy-table-btn" style="cursor: pointer;" 
               title="${i18n.t('aria.copyTable')}"
               role="button"
               tabindex="0"
               aria-label="${i18n.t('aria.copyTable')}"></i>
        </th>
        <th>#</th>
    `;
    
    keys.forEach(key => {
        headerHTML += `<th>${formatLabel(key)}</th>`;
    });
    
    tableHeader.innerHTML = headerHTML;
    
    // Update table body
    let bodyHTML = '';
    generatedData.forEach((record, index) => {
        bodyHTML += `<tr data-index="${index}">
            <td>
                <i class="fas fa-copy copy-row-btn" 
                   title="${i18n.t('aria.copyRow')}"
                   role="button"
                   tabindex="0"
                   aria-label="${i18n.t('aria.copyRow')}"></i>
            </td>
            <td>${index + 1}</td>`;
        
        keys.forEach((key, cellIndex) => {
            const value = record[key];
            const cellId = `cell-${index}-${cellIndex}`;
            let displayValue = value !== null && value !== undefined ? value : '';
            
            // Add flag for country column
            if (key === 'country' && COUNTRIES[value]) {
                displayValue = `${COUNTRIES[value].flag} ${COUNTRIES[value].name}`;
            }
            
            bodyHTML += `<td id="${cellId}" style="position: relative;">
                <code>${displayValue}</code>
                <i class="fas fa-copy copy-cell-btn" 
                   title="${i18n.t('aria.copyCell')}"
                   role="button"
                   tabindex="0"
                   aria-label="${i18n.t('aria.copyCell')}"></i>
            </td>`;
        });
        
        bodyHTML += '</tr>';
    });
    
    tableBody.innerHTML = bodyHTML;
}

/**
 * Format field name as readable label
 */
function formatLabel(fieldName) {
    // Map record keys to translation keys
    const fieldMap = {
        'name': 'name',
        'national_id': 'nationalId',
        'passport': 'passport',
        'credit_card_number': 'creditCard',
        'bank_account': 'bankAccount',
        'mobile_phone': 'mobile',
        'postal_code': 'postalCode',
        'email': 'email',
        'country': 'country'
    };

    const translationKey = fieldMap[fieldName];
    if (translationKey && i18n.t(`fields.${translationKey}`)) {
        return i18n.t(`fields.${translationKey}`);
    }
    
    // Fallback for unmapped fields or missing translations
    return fieldName
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

/**
 * Copy a single cell
 */
window.copyCell = async function(cellId) {
    const cell = document.getElementById(cellId);
    if (!cell) return;
    
    const codeElement = cell.querySelector('code');
    const text = codeElement ? codeElement.textContent : cell.textContent;
    
    const success = await copyToClipboard(text);
    if (success) {
        showToast(i18n.t('messages.cellCopied'), 'success');
    }
};

/**
 * Copy entire row
 */
window.copyRow = async function(rowIndex) {
    const record = generatedData[rowIndex];
    if (!record) return;
    
    const text = formatAsJSON([record]);
    const success = await copyToClipboard(text);
    if (success) {
        showToast(i18n.t('messages.rowCopied'), 'success');
    }
};

/**
 * Copy entire table
 */
window.copyEntireTable = async function() {
    if (generatedData.length === 0) {
        showToast(i18n.t('messages.noDataToCopy'), 'error');
        return;
    }
    
    const text = formatAsJSON(generatedData);
    const success = await copyToClipboard(text);
    if (success) {
        showToast(i18n.t('messages.tableCopied'), 'success');
    }
};

/**
 * Handle download
 */
function handleDownload(format) {
    if (generatedData.length === 0) {
        showToast(i18n.t('messages.noDataToDownload'), 'error');
        return;
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const countryInfo = getCountryInfo(currentCountry);
    
    if (format === 'json') {
        const content = formatAsJSON(generatedData);
        downloadFile(content, `data-${countryInfo.name.toLowerCase().replace(/\s/g, '-')}-${timestamp}.json`, 'application/json');
        showToast(i18n.t('messages.jsonDownloaded'), 'success');
    } else if (format === 'csv') {
        const content = formatAsCSV(generatedData);
        downloadFile(content, `data-${countryInfo.name.toLowerCase().replace(/\s/g, '-')}-${timestamp}.csv`, 'text/csv');
        showToast(i18n.t('messages.csvDownloaded'), 'success');
    }
}

/**
 * Save configuration to localStorage
 */
function saveConfig() {
    const config = {
        country: countrySelect.value,
        quantity: quantityInput.value,
        activeTab: document.querySelector('.nav-link.active')?.id,
        checkboxes: {},
        cardType: getSelectedCardType()
    };

    document.querySelectorAll('.field-checkbox').forEach(cb => {
        config.checkboxes[cb.id] = cb.checked;
    });

    localStorage.setItem('dg_config', JSON.stringify(config));
}

/**
 * Load configuration from localStorage
 */
function loadConfig() {
    const saved = localStorage.getItem('dg_config');
    if (!saved) return;

    try {
        const config = JSON.parse(saved);
        
        if (config.country) {
            countrySelect.value = config.country;
            handleCountryChange();
        }
        
        if (config.quantity) quantityInput.value = config.quantity;
        
        if (config.activeTab) {
            const tab = document.getElementById(config.activeTab);
            if (tab && window.bootstrap) {
                const tabInstance = new window.bootstrap.Tab(tab);
                tabInstance.show();
            }
        }
        
        if (config.checkboxes) {
            Object.entries(config.checkboxes).forEach(([id, checked]) => {
                const cb = document.getElementById(id);
                if (cb && !cb.disabled) {
                    cb.checked = checked;
                    // Trigger sync
                    const field = cb.dataset.field;
                    document.querySelectorAll(`[data-field="${field}"]`).forEach(related => {
                        related.checked = checked;
                    });
                }
            });
        }

        if (config.cardType) {
             const cardTypeSelects = document.querySelectorAll('[id^="cardTypeSelect"]');
             cardTypeSelects.forEach(s => s.value = config.cardType);
             
             // Update visibility
             const creditCardChecked = config.checkboxes['checkCreditCard'] || config.checkboxes['checkCreditCard_all'];
             const cardTypeContainers = document.querySelectorAll('[id^="cardTypeContainer"]');
             cardTypeContainers.forEach(c => c.style.display = creditCardChecked ? 'block' : 'none');
        }

    } catch (e) {
        console.error("Failed to load config", e);
    }
}

/**
 * Sync checkboxes across tabs
 */
function syncCheckboxes() {
    const allCheckboxes = document.querySelectorAll('.field-checkbox');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const field = this.dataset.field;
            document.querySelectorAll(`[data-field="${field}"]`).forEach(cb => {
                cb.checked = this.checked;
            });
            saveConfig();
        });
    });
}

/**
 * Setup card type selector visibility
 */
function setupCardTypeToggle() {
    const creditCardCheckboxes = document.querySelectorAll('[data-field="creditCard"]');
    const cardTypeContainers = document.querySelectorAll('[id^="cardTypeContainer"]');
    
    function updateVisibility(isChecked) {
        cardTypeContainers.forEach(container => {
            container.style.display = isChecked ? 'block' : 'none';
        });
    }

    creditCardCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateVisibility(this.checked);
        });
        
        // Initialize based on the first checked box found
        if (checkbox.checked) {
            updateVisibility(true);
        }
    });

    const cardTypeSelectors = document.querySelectorAll('[id^="cardTypeSelect"]');
    cardTypeSelectors.forEach(select => {
        select.addEventListener('change', function() {
            cardTypeSelectors.forEach(s => s.value = this.value);
            saveConfig();
        });
    });
}

/**
 * Clear all output
 */
function clearAllOutput() {
    generatedData = [];
    updateViews();
}

/**
 * Copy JSON
 */
function copyJSON() {
    const text = document.getElementById('jsonOutput').textContent;
    copyToClipboard(text).then(success => {
        if(success) showToast(i18n.t('messages.jsonCopied') || 'JSON copied!', 'success');
    });
}

/**
 * Copy CSV
 */
function copyCSV() {
    const text = document.getElementById('csvOutput').textContent;
    copyToClipboard(text).then(success => {
        if(success) showToast(i18n.t('messages.csvCopied') || 'CSV copied!', 'success');
    });
}

/**
 * Copy a single cell
 */
async function copyCell(cellId) {
    const cell = document.getElementById(cellId);
    if (!cell) return;
    
    const codeElement = cell.querySelector('code');
    const text = codeElement ? codeElement.textContent : cell.textContent;
    
    const success = await copyToClipboard(text);
    if (success) {
        showToast(i18n.t('messages.cellCopied'), 'success');
    }
}

/**
 * Copy entire row
 */
async function copyRow(rowIndex) {
    const record = generatedData[rowIndex];
    if (!record) return;
    
    const text = formatAsJSON([record]);
    const success = await copyToClipboard(text);
    if (success) {
        showToast(i18n.t('messages.rowCopied'), 'success');
    }
}

/**
 * Copy entire table
 */
async function copyEntireTable() {
    if (generatedData.length === 0) {
        showToast(i18n.t('messages.noDataToCopy'), 'error');
        return;
    }
    
    const text = formatAsJSON(generatedData);
    const success = await copyToClipboard(text);
    if (success) {
        showToast(i18n.t('messages.tableCopied'), 'success');
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
