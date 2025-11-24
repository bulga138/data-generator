/**
 * Germany Data Generators
 */

import { generateCountryIBAN, formatIBAN } from '../validators/iban.js';

/**
 * Generate German Personalausweis (ID card number)
 * Format: LDDDDDDDDDC (1 letter + 9 digits + 1 check digit)
 * Simplified version - real algorithm is complex
 * @returns {string} ID number
 */
export function generatePersonalausweis() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let id = letters[Math.floor(Math.random() * letters.length)];
    
    // 9 random digits
    for (let i = 0; i < 9; i++) {
        id += Math.floor(Math.random() * 10);
    }
    
    // Simple check digit (sum mod 10)
    const sum = id.slice(1).split('').reduce((acc, d) => acc + parseInt(d), 0);
    const checkDigit = sum % 10;
    
    return id + checkDigit;
}

/**
 * Generate German IBAN
 * Format: DE + 2 check digits + 18 digits (8 bank code + 10 account)
 * @param {boolean} formatted - Return formatted with spaces
 * @returns {string} IBAN
 */
export function generateGermanIBAN(formatted = true) {
    const iban = generateCountryIBAN('DE');
    return formatted ? formatIBAN(iban) : iban;
}

/**
 * Generate German mobile phone number
 * Format: +49 1XX XXXXXXX
 * @returns {string} Phone number
 */
export function generateGermanPhone() {
    // Mobile prefixes: 151, 152, 157, 159, 160, 162, 163, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179
    const prefixes = ['151', '152', '157', '159', '160', '162', '163', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    let number = '+49 ' + prefix + ' ';
    
    // 7 more digits
    for (let i = 0; i < 7; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    return number;
}

/**
 * Generate German postal code (PLZ)
 * Format: 5 digits
 * @returns {string} Postal code
 */
export function generatePLZ() {
    // First digit: 0-9 (represents region)
    // Remaining 4 digits: 0000-9999
    let plz = '';
    for (let i = 0; i < 5; i++) {
        plz += Math.floor(Math.random() * 10);
    }
    return plz.padStart(5, '0');
}

/**
 * Generate German tax ID (Steueridentifikationsnummer)
 * Format: 11 digits
 * @returns {string} Tax ID
 */
export function generateSteuerID() {
    let id = '';
    for (let i = 0; i < 11; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}
