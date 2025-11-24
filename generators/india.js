/**
 * India Data Generators
 */

import { generateValidVerhoeff } from '../validators/verhoeff.js';

/**
 * Generate Aadhaar number (12 digits with Verhoeff check digit)
 * @returns {string} Aadhaar number
 */
export function generateAadhaar() {
    return generateValidVerhoeff(12);
}

/**
 * Format Aadhaar with spaces
 * @param {string} aadhaar - 12-digit Aadhaar
 * @returns {string} Formatted Aadhaar (XXXX XXXX XXXX)
 */
export function formatAadhaar(aadhaar) {
    return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
}

/**
 * Generate IFSC code (Indian Financial System Code)
 * Format: AAAA0BBBBBB (4 alpha + 1 zero + 6 alphanumeric)
 * @returns {string} IFSC code
 */
export function generateIFSC() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    let ifsc = '';
    
    // First 4 characters: Bank code (alphabetic)
    for (let i = 0; i < 4; i++) {
        ifsc += letters[Math.floor(Math.random() * letters.length)];
    }
    
    // 5th character: Always 0
    ifsc += '0';
    
    // Last 6 characters: Branch code (alphanumeric)
    for (let i = 0; i < 6; i++) {
        ifsc += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
    }
    
    return ifsc;
}

/**
 * Generate Indian mobile phone number
 * Format: +91 9XXX XXXXXX (10 digits starting with 9, 8, 7, or 6)
 * @returns {string} Phone number
 */
export function generateIndianPhone() {
    const firstDigits = ['9', '8', '7', '6'];
    const firstDigit = firstDigits[Math.floor(Math.random() * firstDigits.length)];
    
    let number = '+91 ' + firstDigit;
    
    // Next 2 digits
    for (let i = 0; i < 2; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    number += ' ';
    
    // Last 6 digits
    for (let i = 0; i < 6; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    return number;
}

/**
 * Generate Indian PIN code (Postal Index Number)
 * Format: 6 digits
 * @returns {string} PIN code
 */
export function generatePinCode() {
    // First digit: 1-8 (represents region)
    const firstDigit = Math.floor(Math.random() * 8) + 1;
    
    let pin = String(firstDigit);
    
    // Remaining 5 digits
    for (let i = 0; i < 5; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    
    return pin;
}

/**
 * Generate PAN (Permanent Account Number)
 * Format: AAAAA9999A (5 alpha + 4 numeric + 1 alpha)
 * @returns {string} PAN
 */
export function generatePAN() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let pan = '';
    
    // First 5 characters: Alphabetic
    for (let i = 0; i < 5; i++) {
        pan += letters[Math.floor(Math.random() * letters.length)];
    }
    
    // Next 4 characters: Numeric
    for (let i = 0; i < 4; i++) {
        pan += Math.floor(Math.random() * 10);
    }
    
    // Last character: Alphabetic
    pan += letters[Math.floor(Math.random() * letters.length)];
    
    return pan;
}
