/**
 * IBAN (International Bank Account Number) Generator
 * Uses Mod 97 algorithm as defined in ISO 13616
 * 
 * IBAN structure:
 * - 2 letters: Country code
 * - 2 digits: Check digits
 * - Up to 30 alphanumeric: Bank and account number (country-specific)
 * 
 * The check digit calculation uses BigInt to handle large numbers
 */

/**
 * Convert IBAN letters to numbers (A=10, B=11, ..., Z=35)
 * @param {string} iban - IBAN string
 * @returns {string} Numeric string
 */
function ibanToNumeric(iban) {
    let numeric = '';
    for (let char of iban.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
            // A=10, B=11, ..., Z=35
            numeric += (char.charCodeAt(0) - 55).toString();
        } else {
            numeric += char;
        }
    }
    return numeric;
}

/**
 * Calculate IBAN check digits using Mod 97
 * @param {string} countryCode - 2-letter country code (e.g., 'DE', 'FR')
 * @param {string} bban - Basic Bank Account Number (country-specific)
 * @returns {string} 2-digit check digits
 */
export function calculateIBANCheckDigits(countryCode, bban) {
    // Step 1: Create IBAN with placeholder check digits '00'
    const ibanWithPlaceholder = countryCode.toUpperCase() + '00' + bban;
    
    // Step 2: Move country code and check digits to the end
    const rearranged = bban + countryCode.toUpperCase() + '00';
    
    // Step 3: Convert to numeric string
    const numeric = ibanToNumeric(rearranged);
    
    // Step 4: Calculate mod 97 using BigInt
    const remainder = BigInt(numeric) % 97n;
    
    // Step 5: Check digits = 98 - remainder
    const checkDigits = 98 - Number(remainder);
    
    // Step 6: Pad to 2 digits
    return checkDigits.toString().padStart(2, '0');
}

/**
 * Generate valid IBAN for a specific country
 * @param {string} countryCode - 2-letter country code
 * @param {number} bbanLength - Length of BBAN (country-specific)
 * @param {string} [bankCode] - Optional specific bank code
 * @returns {string} Valid IBAN
 */
export function generateValidIBAN(countryCode, bbanLength, bankCode = null) {
    let bban = '';
    
    if (bankCode) {
        bban = bankCode;
        // Fill remaining with random digits
        for (let i = bankCode.length; i < bbanLength; i++) {
            bban += Math.floor(Math.random() * 10);
        }
    } else {
        // Generate random BBAN (all numeric for simplicity)
        for (let i = 0; i < bbanLength; i++) {
            bban += Math.floor(Math.random() * 10);
        }
    }
    
    const checkDigits = calculateIBANCheckDigits(countryCode, bban);
    return countryCode.toUpperCase() + checkDigits + bban;
}

/**
 * Format IBAN with spaces (groups of 4)
 * @param {string} iban - Unformatted IBAN
 * @returns {string} Formatted IBAN
 */
export function formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Validate IBAN using Mod 97
 * @param {string} iban - IBAN to validate
 * @returns {boolean} True if valid
 */
export function validateIBAN(iban) {
    // Remove spaces and convert to uppercase
    const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();
    
    // Check length (minimum 15, maximum 34)
    if (cleanIBAN.length < 15 || cleanIBAN.length > 34) {
        return false;
    }
    
    // Check format (2 letters, 2 digits, then alphanumeric)
    if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleanIBAN)) {
        return false;
    }
    
    // Rearrange: move first 4 characters to end
    const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4);
    
    // Convert to numeric
    const numeric = ibanToNumeric(rearranged);
    
    // Validate: mod 97 should equal 1
    const remainder = BigInt(numeric) % 97n;
    return remainder === 1n;
}

/**
 * Country-specific IBAN configurations
 */
export const IBAN_CONFIGS = {
    DE: { length: 22, bbanLength: 18, name: 'Germany' },      // DE + 2 check + 8 bank + 10 account
    FR: { length: 27, bbanLength: 23, name: 'France' },       // FR + 2 check + 5 bank + 5 branch + 11 account + 2 key
    IT: { length: 27, bbanLength: 23, name: 'Italy' },        // IT + 2 check + 1 check + 5 bank + 5 branch + 12 account
    ES: { length: 24, bbanLength: 20, name: 'Spain' },        // ES + 2 check + 4 bank + 4 branch + 2 check + 10 account
    NL: { length: 18, bbanLength: 14, name: 'Netherlands' },  // NL + 2 check + 4 bank + 10 account
    BE: { length: 16, bbanLength: 12, name: 'Belgium' },      // BE + 2 check + 3 bank + 7 account + 2 check
    GB: { length: 22, bbanLength: 18, name: 'United Kingdom' }, // GB + 2 check + 4 bank + 6 branch + 8 account
    CH: { length: 21, bbanLength: 17, name: 'Switzerland' },  // CH + 2 check + 5 bank + 12 account
    AT: { length: 20, bbanLength: 16, name: 'Austria' },      // AT + 2 check + 5 bank + 11 account
    PL: { length: 28, bbanLength: 24, name: 'Poland' }        // PL + 2 check + 8 bank + 16 account
};

/**
 * Generate IBAN for a specific country using predefined config
 * @param {string} countryCode - 2-letter country code
 * @returns {string} Valid IBAN
 */
export function generateCountryIBAN(countryCode) {
    const config = IBAN_CONFIGS[countryCode.toUpperCase()];
    if (!config) {
        throw new Error(`Unknown country code: ${countryCode}`);
    }
    
    return generateValidIBAN(countryCode, config.bbanLength);
}
