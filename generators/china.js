/**
 * China Data Generators
 */

import { generateValidChineseID } from '../validators/mod11.js';

/**
 * Generate Chinese National ID
 * 18 digits with ISO 7064 Mod 11-2 check digit
 * @returns {string} National ID
 */
export function generateChineseID() {
    return generateValidChineseID();
}

/**
 * Generate UnionPay card number
 * Starts with 62, uses Luhn algorithm
 * @returns {string} Card number
 */
export function generateUnionPayCard() {
    let baseNumber = '62';
    
    // Add 14 more digits (total 16 before check digit)
    for (let i = 0; i < 13; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    // Calculate Luhn check digit
    const digits = baseNumber.split('').map(Number);
    let sum = 0;
    
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        if ((digits.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return baseNumber + checkDigit;
}

/**
 * Generate Chinese mobile phone number
 * Format: +86 1XX XXXX XXXX
 * @returns {string} Phone number
 */
export function generateChinesePhone() {
    // Mobile prefixes: 13X, 14X, 15X, 16X, 17X, 18X, 19X
    const secondDigits = ['3', '4', '5', '6', '7', '8', '9'];
    const secondDigit = secondDigits[Math.floor(Math.random() * secondDigits.length)];
    
    let number = '+86 1' + secondDigit;
    
    // Third digit
    number += Math.floor(Math.random() * 10);
    
    number += ' ';
    
    // Next 4 digits
    for (let i = 0; i < 4; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    number += ' ';
    
    // Last 4 digits
    for (let i = 0; i < 4; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    return number;
}

/**
 * Generate Chinese postal code
 * Format: 6 digits
 * @returns {string} Postal code
 */
export function generatePostalCode() {
    // First digit: 1-8 (represents region)
    const firstDigit = Math.floor(Math.random() * 8) + 1;
    
    let code = String(firstDigit);
    
    // Remaining 5 digits
    for (let i = 0; i < 5; i++) {
        code += Math.floor(Math.random() * 10);
    }
    
    return code;
}
