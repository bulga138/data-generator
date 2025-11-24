/**
 * Luhn Algorithm Implementation
 * Used for: Credit Cards, Canadian SIN
 * 
 * The Luhn algorithm validates identification numbers by:
 * 1. Starting from the rightmost digit (check digit)
 * 2. Moving left, double every second digit
 * 3. If doubling results in a two-digit number, subtract 9
 * 4. Sum all digits
 * 5. Check digit makes the total a multiple of 10
 */

/**
 * Calculate Luhn check digit for a given base number
 * @param {string} baseNumber - The number without check digit
 * @returns {number} The check digit (0-9)
 */
export function calculateLuhnCheckDigit(baseNumber) {
    const digits = baseNumber.split('').map(Number);
    let sum = 0;
    
    // Process from right to left, doubling every second digit
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        
        // Double every second digit (odd positions from the right)
        if ((digits.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
    }
    
    // Calculate check digit to make sum divisible by 10
    return (10 - (sum % 10)) % 10;
}

/**
 * Generate a valid number using Luhn algorithm
 * @param {number} length - Total length including check digit
 * @returns {string} Valid number with check digit
 */
export function generateValidLuhn(length) {
    if (length < 2) {
        throw new Error('Length must be at least 2');
    }
    
    // Generate random base number (length - 1 digits)
    let baseNumber = '';
    for (let i = 0; i < length - 1; i++) {
        // First digit should not be 0 for most use cases
        baseNumber += i === 0 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10);
    }
    
    const checkDigit = calculateLuhnCheckDigit(baseNumber);
    return baseNumber + checkDigit;
}

/**
 * Validate a number using Luhn algorithm
 * @param {string} number - The number to validate
 * @returns {boolean} True if valid
 */
export function validateLuhn(number) {
    const digits = number.split('').map(Number);
    let sum = 0;
    
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        
        if ((digits.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
    }
    
    return sum % 10 === 0;
}
