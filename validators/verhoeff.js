/**
 * Verhoeff Algorithm Implementation
 * Used for: Indian Aadhaar numbers
 * 
 * The Verhoeff algorithm is more sophisticated than Luhn and can detect:
 * - All single-digit errors
 * - All transposition errors (swapping adjacent digits)
 * - Most other errors
 * 
 * It uses three tables based on the Dihedral group D5:
 * - Multiplication table (d)
 * - Permutation table (p)
 * - Inverse table (inv)
 */

// Multiplication table (d) - Dihedral group D5
const multiplicationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

// Permutation table (p)
const permutationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

// Inverse table (inv)
const inverseTable = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

/**
 * Calculate Verhoeff check digit for a given base number
 * @param {string} baseNumber - The number without check digit
 * @returns {number} The check digit (0-9)
 */
export function calculateVerhoeffCheckDigit(baseNumber) {
    const digits = baseNumber.split('').map(Number);
    let checksum = 0;
    
    // Process from right to left
    for (let i = 0; i < digits.length; i++) {
        const digit = digits[digits.length - 1 - i];
        const permuted = permutationTable[(i + 1) % 8][digit];
        checksum = multiplicationTable[checksum][permuted];
    }
    
    return inverseTable[checksum];
}

/**
 * Generate a valid number using Verhoeff algorithm
 * @param {number} length - Total length including check digit
 * @returns {string} Valid number with check digit
 */
export function generateValidVerhoeff(length) {
    if (length < 2) {
        throw new Error('Length must be at least 2');
    }
    
    // Generate random base number (length - 1 digits)
    let baseNumber = '';
    for (let i = 0; i < length - 1; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    const checkDigit = calculateVerhoeffCheckDigit(baseNumber);
    return baseNumber + checkDigit;
}

/**
 * Validate a number using Verhoeff algorithm
 * @param {string} number - The number to validate
 * @returns {boolean} True if valid
 */
export function validateVerhoeff(number) {
    const digits = number.split('').map(Number);
    let checksum = 0;
    
    // Process from right to left
    for (let i = 0; i < digits.length; i++) {
        const digit = digits[digits.length - 1 - i];
        const permuted = permutationTable[i % 8][digit];
        checksum = multiplicationTable[checksum][permuted];
    }
    
    return checksum === 0;
}
