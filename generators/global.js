/**
 * Global/Generic Data Generators
 * Fallback generators for countries without specific implementations
 */

/**
 * Generate UUID v4
 * @returns {string} UUID v4
 */
export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Generate SWIFT/BIC code
 * Format: AAAABBCCXXX
 * - AAAA: Bank code (4 letters)
 * - BB: Country code (2 letters)
 * - CC: Location code (2 alphanumeric)
 * - XXX: Branch code (3 alphanumeric, optional)
 * @param {string} countryCode - 2-letter country code
 * @returns {string} SWIFT/BIC code
 */
export function generateSwiftBIC(countryCode = 'XX') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    let swift = '';
    
    // Bank code (4 letters)
    for (let i = 0; i < 4; i++) {
        swift += letters[Math.floor(Math.random() * letters.length)];
    }
    
    // Country code
    swift += countryCode.toUpperCase();
    
    // Location code (2 alphanumeric)
    for (let i = 0; i < 2; i++) {
        swift += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
    }
    
    // Branch code (3 alphanumeric) - optional, 50% chance
    if (Math.random() > 0.5) {
        for (let i = 0; i < 3; i++) {
            swift += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
        }
    }
    
    return swift;
}

/**
 * Generate E.164 format phone number
 * @param {string} countryCode - Country calling code (e.g., '1', '44', '86')
 * @param {number} length - Total length of subscriber number
 * @returns {string} E.164 phone number
 */
export function generateE164Phone(countryCode = '1', length = 10) {
    let number = '+' + countryCode + ' ';
    
    for (let i = 0; i < length; i++) {
        // First digit of subscriber number should not be 0
        number += i === 0 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10);
    }
    
    return number;
}

/**
 * Generate email address
 * @param {string} tld - Top-level domain (e.g., 'com', 'org', 'co.uk')
 * @returns {string} Email address
 */
export function generateEmail(tld = 'com') {
    const firstNames = ['john', 'jane', 'alex', 'sarah', 'mike', 'emma', 'david', 'lisa', 'chris', 'anna'];
    const lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis', 'rodriguez', 'martinez'];
    const domains = ['email', 'mail', 'inbox', 'post', 'web'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    // Random format: firstname.lastname, firstnamelastname, or firstname_lastname
    const formats = [
        `${firstName}.${lastName}`,
        `${firstName}${lastName}`,
        `${firstName}_${lastName}`,
        `${firstName}${Math.floor(Math.random() * 999)}`
    ];
    
    const username = formats[Math.floor(Math.random() * formats.length)];
    
    return `${username}@${domain}.${tld}`;
}

/**
 * Generate generic credit card number (Luhn-valid)
 * @param {string} issuer - Card issuer ('visa', 'mastercard', 'amex', 'discover')
 * @returns {string} Credit card number
 */
export function generateCreditCard(issuer = 'visa') {
    const prefixes = {
        visa: ['4'],
        mastercard: ['51', '52', '53', '54', '55', '2221', '2720'],
        amex: ['34', '37'],
        discover: ['6011', '65']
    };
    
    const lengths = {
        visa: 16,
        mastercard: 16,
        amex: 15,
        discover: 16
    };
    
    const prefix = prefixes[issuer][Math.floor(Math.random() * prefixes[issuer].length)];
    const length = lengths[issuer];
    
    // Import Luhn dynamically (will be available when used in browser)
    // For now, we'll implement inline
    let baseNumber = prefix;
    
    // Fill remaining digits (except last check digit)
    while (baseNumber.length < length - 1) {
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
 * Generate CVV code
 * @param {number} length - CVV length (3 or 4)
 * @returns {string} CVV code
 */
export function generateCVV(length = 3) {
    let cvv = '';
    for (let i = 0; i < length; i++) {
        cvv += Math.floor(Math.random() * 10);
    }
    return cvv;
}

/**
 * Generate expiry date (MM/YY format)
 * @returns {string} Expiry date
 */
export function generateExpiryDate() {
    const currentYear = new Date().getFullYear() % 100; // Last 2 digits
    const year = currentYear + Math.floor(Math.random() * 5) + 1; // 1-5 years from now
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    
    return `${month}/${year}`;
}
