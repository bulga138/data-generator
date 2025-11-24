/**
 * Canada Data Generators
 */

import { generateValidLuhn } from '../validators/luhn.js';

/**
 * Generate Social Insurance Number (SIN)
 * 9 digits with Luhn check digit
 * @param {boolean} formatted - Return formatted (XXX-XXX-XXX)
 * @returns {string} SIN
 */
export function generateSIN(formatted = true) {
    const sin = generateValidLuhn(9);
    
    if (formatted) {
        return sin.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
    }
    
    return sin;
}

/**
 * Generate Canadian bank routing number
 * Format: 0XXXX-YYY (institution number + transit number)
 * @returns {string} Routing number
 */
export function generateRoutingNumber() {
    // Institution number: 3 digits (001-999)
    const institution = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    
    // Transit number: 5 digits (00001-99999)
    const transit = String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
    
    return '0' + transit + '-' + institution;
}

/**
 * Generate Canadian phone number
 * Format: +1 XXX XXX-XXXX
 * @returns {string} Phone number
 */
export function generateCanadianPhone() {
    // Canadian area codes
    const areaCodes = [204, 226, 236, 249, 250, 289, 306, 343, 365, 403, 416, 418, 431, 437, 438, 450, 506, 514, 519, 548, 579, 581, 587, 604, 613, 639, 647, 672, 705, 709, 778, 780, 782, 807, 819, 825, 867, 873, 902, 905];
    
    const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    
    // Exchange code: 200-999
    const exchange = Math.floor(Math.random() * 800) + 200;
    
    // Subscriber number: 0000-9999
    const subscriber = Math.floor(Math.random() * 10000);
    
    return `+1 ${areaCode} ${String(exchange).padStart(3, '0')}-${String(subscriber).padStart(4, '0')}`;
}

/**
 * Generate Canadian postal code
 * Format: A1A 1A1 (letter-digit-letter space digit-letter-digit)
 * @returns {string} Postal code
 */
export function generatePostalCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Exclude D, F, I, O, Q, U from first position
    const firstLetters = 'ABCEGHJKLMNPRSTVWXYZ';
    
    const part1 = firstLetters[Math.floor(Math.random() * firstLetters.length)] +
                  Math.floor(Math.random() * 10) +
                  letters[Math.floor(Math.random() * letters.length)];
    
    const part2 = Math.floor(Math.random() * 10) +
                  letters[Math.floor(Math.random() * letters.length)] +
                  Math.floor(Math.random() * 10);
    
    return part1 + ' ' + part2;
}
