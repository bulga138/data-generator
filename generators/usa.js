/**
 * USA Data Generators
 */

import { generateValidLuhn } from '../validators/luhn.js';

/**
 * Generate Social Security Number (SSN)
 * Format: XXX-XX-XXXX
 * Note: Avoiding invalid ranges (000, 666, 900-999 for first group)
 * @returns {string} SSN
 */
export function generateSSN() {
    // First 3 digits (area number): 001-665, 667-899
    let area;
    do {
        area = Math.floor(Math.random() * 900) + 1;
    } while (area === 666 || area >= 900);
    
    // Next 2 digits (group number): 01-99
    const group = Math.floor(Math.random() * 99) + 1;
    
    // Last 4 digits (serial number): 0001-9999
    const serial = Math.floor(Math.random() * 9999) + 1;
    
    return String(area).padStart(3, '0') + '-' + 
           String(group).padStart(2, '0') + '-' + 
           String(serial).padStart(4, '0');
}

/**
 * Generate US Bank Routing Number (ABA)
 * 9 digits with Mod 10 check
 * @returns {string} Routing number
 */
export function generateRoutingNumber() {
    // First 2 digits: Federal Reserve routing symbol (01-12, 21-32, 61-72, 80)
    const validPrefixes = [];
    for (let i = 1; i <= 12; i++) validPrefixes.push(i);
    for (let i = 21; i <= 32; i++) validPrefixes.push(i);
    for (let i = 61; i <= 72; i++) validPrefixes.push(i);
    validPrefixes.push(80);
    
    const prefix = validPrefixes[Math.floor(Math.random() * validPrefixes.length)];
    
    // Next 6 digits: ABA institution identifier
    let baseNumber = String(prefix).padStart(2, '0');
    for (let i = 0; i < 6; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    // Calculate check digit (Mod 10)
    const digits = baseNumber.split('').map(Number);
    const sum = 3 * (digits[0] + digits[3] + digits[6]) +
                7 * (digits[1] + digits[4] + digits[7]) +
                1 * (digits[2] + digits[5]);
    
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return baseNumber + checkDigit;
}

/**
 * Generate US phone number
 * Format: +1 (XXX) XXX-XXXX
 * @returns {string} Phone number
 */
export function generateUSPhone() {
    // Area code: 200-999, excluding certain ranges
    let areaCode;
    do {
        areaCode = Math.floor(Math.random() * 800) + 200;
    } while (areaCode % 100 === 11); // Avoid N11 codes
    
    // Exchange code: 200-999
    let exchange;
    do {
        exchange = Math.floor(Math.random() * 800) + 200;
    } while (exchange % 100 === 11);
    
    // Subscriber number: 0000-9999
    const subscriber = Math.floor(Math.random() * 10000);
    
    return `+1 (${areaCode}) ${String(exchange).padStart(3, '0')}-${String(subscriber).padStart(4, '0')}`;
}

/**
 * Generate US ZIP code
 * @param {boolean} plusFour - Include ZIP+4 format
 * @returns {string} ZIP code
 */
export function generateZipCode(plusFour = false) {
    const zip = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    
    if (plusFour) {
        const extension = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        return `${zip}-${extension}`;
    }
    
    return zip;
}

/**
 * Generate US credit card (Visa or Mastercard)
 * @returns {object} Card details
 */
export function generateUSCreditCard() {
    const isVisa = Math.random() > 0.5;
    const prefix = isVisa ? '4' : '5' + Math.floor(Math.random() * 5 + 1);
    
    let baseNumber = prefix;
    while (baseNumber.length < 15) {
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
    const cardNumber = baseNumber + checkDigit;
    
    // Generate CVV
    const cvv = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    // Generate expiry
    const currentYear = new Date().getFullYear() % 100;
    const year = currentYear + Math.floor(Math.random() * 5) + 1;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    
    return {
        number: cardNumber,
        cvv: cvv,
        expiry: `${month}/${year}`,
        type: isVisa ? 'Visa' : 'Mastercard'
    };
}
