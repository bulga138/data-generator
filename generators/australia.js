/**
 * Australia Data Generators
 */

import { generateValidTFN } from '../validators/mod11.js';

/**
 * Generate Tax File Number (TFN)
 * 9 digits with Mod 11 check digit
 * @returns {string} TFN
 */
export function generateTFN() {
    return generateValidTFN();
}

/**
 * Generate BSB (Bank State Branch) number
 * Format: XXX-XXX
 * @returns {string} BSB number
 */
export function generateBSB() {
    // First 2 digits: Bank code (01-99)
    const bank = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    
    // Next digit: State code (0-9)
    const state = Math.floor(Math.random() * 10);
    
    // Last 3 digits: Branch code (000-999)
    const branch = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    return bank + state + '-' + branch;
}

/**
 * Generate Australian mobile phone number
 * Format: +61 4XX XXX XXX
 * @returns {string} Phone number
 */
export function generateAustralianPhone() {
    // Mobile numbers start with 04
    let number = '+61 4';
    
    // Next 2 digits
    for (let i = 0; i < 2; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    number += ' ';
    
    // Next 3 digits
    for (let i = 0; i < 3; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    number += ' ';
    
    // Last 3 digits
    for (let i = 0; i < 3; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    return number;
}

/**
 * Generate Australian postcode
 * Format: 4 digits
 * @returns {string} Postcode
 */
export function generatePostcode() {
    // Postcodes range from 0200 to 9999
    const code = Math.floor(Math.random() * 9800) + 200;
    return String(code).padStart(4, '0');
}
