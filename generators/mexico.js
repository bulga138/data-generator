/**
 * Mexico Data Generator
 */

export class MexicoGen {
    /**
     * Generate Mexican Phone Number
     * Format: +52 xx xxxx xxxx
     */
    generateMexicanPhone() {
        // Area codes: 55 (CDMX), 81 (Monterrey), 33 (Guadalajara), or random 2-3 digits
        // For simplicity, using 2 digit area codes + 8 digit number
        const areaCode = Math.floor(Math.random() * 90) + 10;
        
        let number = `+52 ${areaCode}`;
        for (let i = 0; i < 8; i++) {
            number += Math.floor(Math.random() * 10);
        }
        
        return number;
    }

    /**
     * Generate Mexican Postal Code
     * Format: 5 digits
     */
    /**
     * Generate Mexican Postal Code
     * Format: 5 digits
     */
    generatePostalCode() {
        return Math.floor(Math.random() * 90000 + 10000).toString();
    }

    /**
     * Generate CURP (Clave Única de Registro de Población)
     * Format: 4 letters + 6 digits + 1 letter + 2 letters + 3 alphanumeric + 2 digits
     * Simplified for generation: AAAA YYMMDD H/M SS AA A 9
     */
    generateCURP(record = {}) {
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // 1. Initial (First letter of surname)
        let curp = consonants[Math.floor(Math.random() * consonants.length)];
        // 2. First internal vowel of surname
        curp += vowels[Math.floor(Math.random() * vowels.length)];
        // 3. First letter of second surname
        curp += letters[Math.floor(Math.random() * letters.length)];
        // 4. First letter of name
        curp += letters[Math.floor(Math.random() * letters.length)];
        
        // 5. Date (YYMMDD)
        const year = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
        const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
        curp += year + month + day;
        
        // 6. Gender (H/M)
        curp += Math.random() > 0.5 ? 'H' : 'M';
        
        // 7. State code (2 letters) - simplified
        const states = ['AS', 'BC', 'BS', 'CC', 'CL', 'CM', 'CS', 'CH', 'DF', 'DG', 'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QT', 'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ', 'YN', 'ZS', 'NE'];
        curp += states[Math.floor(Math.random() * states.length)];
        
        // 8. First internal consonant of surname
        curp += consonants[Math.floor(Math.random() * consonants.length)];
        // 9. First internal consonant of second surname
        curp += consonants[Math.floor(Math.random() * consonants.length)];
        // 10. First internal consonant of name
        curp += consonants[Math.floor(Math.random() * consonants.length)];
        
        // 11. Homoclave (2 chars)
        curp += Math.floor(Math.random() * 10);
        curp += Math.floor(Math.random() * 10);
        
        return curp;
    }

    /**
     * Generate CLABE (Clave Bancaria Estandarizada)
     * Format: 18 digits
     * 3 digits (Bank Code) + 3 digits (Branch) + 11 digits (Account) + 1 digit (Control)
     */
    generateCLABE() {
        // Bank Code (3 digits)
        const bankCode = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        
        // Branch Code (3 digits)
        const branchCode = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        
        // Account Number (11 digits)
        const account = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
        
        const base = bankCode + branchCode + account;
        
        // Calculate Check Digit
        // Weights: 3, 7, 1, 3, 7, 1...
        const weights = [3, 7, 1];
        let sum = 0;
        
        for (let i = 0; i < base.length; i++) {
            const digit = parseInt(base[i]);
            const weight = weights[i % 3];
            sum += (digit * weight) % 10;
        }
        
        const checkDigit = (10 - (sum % 10)) % 10;
        
        return base + checkDigit;
    }
}
