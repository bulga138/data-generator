/**
 * Modulo 11 Algorithm Implementations
 * Used for: Brazil CPF, Japan My Number, Australia TFN, China National ID
 * 
 * Various countries use different variants of Modulo 11:
 * - Simple weighted Mod 11
 * - Double check digit (Brazil CPF)
 * - ISO 7064 Mod 11-2 (China)
 */

/**
 * Generate check digit using simple weighted Mod 11
 * @param {string} baseNumber - The number without check digit
 * @param {number[]} weights - Weight array (e.g., [10, 9, 8, 7, 6, 5, 4, 3, 2])
 * @returns {number|string} The check digit (0-9 or 'X' for 10)
 */
export function calculateMod11Simple(baseNumber, weights) {
    const digits = baseNumber.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < digits.length; i++) {
        sum += digits[i] * weights[i];
    }
    
    const remainder = sum % 11;
    const checkDigit = 11 - remainder;
    
    // Handle edge cases
    if (checkDigit === 11) return 0;
    if (checkDigit === 10) return 'X'; // Some systems use 'X' for 10
    return checkDigit;
}

/**
 * Generate valid number using simple Mod 11
 * @param {number} length - Total length including check digit
 * @param {number[]} weights - Weight array
 * @param {boolean} allowX - Whether to allow 'X' as check digit
 * @returns {string} Valid number with check digit
 */
export function generateValidMod11Simple(length, weights, allowX = false) {
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
        let baseNumber = '';
        for (let i = 0; i < length - 1; i++) {
            baseNumber += Math.floor(Math.random() * 10);
        }
        
        const checkDigit = calculateMod11Simple(baseNumber, weights);
        
        // Retry if we got 'X' but it's not allowed
        if (checkDigit === 'X' && !allowX) {
            attempts++;
            continue;
        }
        
        return baseNumber + checkDigit;
    }
    
    throw new Error('Failed to generate valid Mod 11 number');
}

/**
 * Calculate check digits for Brazilian CPF (Double Mod 11)
 * CPF format: XXX.XXX.XXX-YZ where Y and Z are check digits
 * @param {string} baseNumber - 9-digit base number
 * @returns {string} Two check digits
 */
export function calculateCPFCheckDigits(baseNumber) {
    if (baseNumber.length !== 9) {
        throw new Error('CPF base number must be 9 digits');
    }
    
    // First check digit
    const digits1 = baseNumber.split('').map(Number);
    let sum1 = 0;
    for (let i = 0; i < 9; i++) {
        sum1 += digits1[i] * (10 - i);
    }
    const remainder1 = sum1 % 11;
    const checkDigit1 = remainder1 < 2 ? 0 : 11 - remainder1;
    
    // Second check digit (includes first check digit)
    const withFirst = baseNumber + checkDigit1;
    const digits2 = withFirst.split('').map(Number);
    let sum2 = 0;
    for (let i = 0; i < 10; i++) {
        sum2 += digits2[i] * (11 - i);
    }
    const remainder2 = sum2 % 11;
    const checkDigit2 = remainder2 < 2 ? 0 : 11 - remainder2;
    
    return '' + checkDigit1 + checkDigit2;
}

/**
 * Generate valid Brazilian CPF
 * @returns {string} 11-digit CPF
 */
export function generateValidCPF() {
    // Generate 9 random digits
    let baseNumber = '';
    for (let i = 0; i < 9; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    const checkDigits = calculateCPFCheckDigits(baseNumber);
    return baseNumber + checkDigits;
}

/**
 * Format CPF with standard separators
 * @param {string} cpf - 11-digit CPF
 * @returns {string} Formatted CPF (XXX.XXX.XXX-XX)
 */
export function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Calculate check digit using ISO 7064 Mod 11-2 (Chinese National ID)
 * @param {string} baseNumber - 17-digit base number
 * @returns {string} Check digit (0-9 or 'X')
 */
export function calculateISO7064Mod11_2(baseNumber) {
    if (baseNumber.length !== 17) {
        throw new Error('Chinese ID base number must be 17 digits');
    }
    
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkChars = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    
    const digits = baseNumber.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 17; i++) {
        sum += digits[i] * weights[i];
    }
    
    const remainder = sum % 11;
    return checkChars[remainder];
}

/**
 * Generate valid Chinese National ID
 * @returns {string} 18-character ID
 */
export function generateValidChineseID() {
    // Generate 17 random digits
    // First 6: Region code (simplified - random)
    // Next 8: Birth date (YYYYMMDD)
    // Next 3: Sequence code
    
    let baseNumber = '';
    
    // Region code (6 digits)
    for (let i = 0; i < 6; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    // Birth date (8 digits) - generate realistic date
    const year = 1950 + Math.floor(Math.random() * 70); // 1950-2019
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    baseNumber += year + month + day;
    
    // Sequence code (3 digits)
    for (let i = 0; i < 3; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    const checkDigit = calculateISO7064Mod11_2(baseNumber);
    return baseNumber + checkDigit;
}

/**
 * Calculate check digit for Australian TFN (Tax File Number)
 * @param {string} baseNumber - 8-digit base number
 * @returns {number} Check digit
 */
export function calculateTFNCheckDigit(baseNumber) {
    if (baseNumber.length !== 8) {
        throw new Error('TFN base number must be 8 digits');
    }
    
    const weights = [1, 4, 3, 7, 5, 8, 6, 9];
    const digits = baseNumber.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 8; i++) {
        sum += digits[i] * weights[i];
    }
    
    const remainder = sum % 11;
    return remainder === 0 ? 0 : 11 - remainder;
}

/**
 * Generate valid Australian TFN
 * @returns {string} 9-digit TFN
 */
export function generateValidTFN() {
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
        let baseNumber = '';
        for (let i = 0; i < 8; i++) {
            baseNumber += Math.floor(Math.random() * 10);
        }
        
        const checkDigit = calculateTFNCheckDigit(baseNumber);
        
        // TFN check digit must be 0-9 (not 10 or 11)
        if (checkDigit >= 0 && checkDigit <= 9) {
            return baseNumber + checkDigit;
        }
        
        attempts++;
    }
    
    throw new Error('Failed to generate valid TFN');
}
