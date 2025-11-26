/**
 * Japan Data Generator
 */

export class JapanGen {
    /**
     * Generate Japanese Phone Number
     * Format: +81 70/80/90 xxxx xxxx
     */
    generateJapanesePhone() {
        const prefixes = ['70', '80', '90'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        let number = `+81 ${prefix}`;
        for (let i = 0; i < 8; i++) {
            number += Math.floor(Math.random() * 10);
        }
        
        return number;
    }

    /**
     * Generate Japanese Postal Code
     * Format: XXX-XXXX
     */
    /**
     * Generate Japanese Postal Code
     * Format: XXX-XXXX
     */
    generatePostalCode() {
        const part1 = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        return `${part1}-${part2}`;
    }

    /**
     * Generate My Number (Individual Number)
     * 12 digits (11 digits + 1 check digit)
     */
    generateMyNumber() {
        let base = '';
        for (let i = 0; i < 11; i++) {
            base += Math.floor(Math.random() * 10);
        }
        
        // Calculate Check Digit
        // Formula: Sum of (digit * weight)
        // Weights Pn: for n=1 to 11
        // if n <= 6, Qn = n + 1
        // if n >= 7, Qn = n - 5
        // Check digit = 11 - (Sum % 11)
        // If Check digit >= 10, then 0
        
        let sum = 0;
        const digits = base.split('').reverse().map(Number); // n=1 is rightmost
        
        for (let n = 1; n <= 11; n++) {
            const digit = digits[n-1];
            let q = n <= 6 ? n + 1 : n - 5;
            sum += digit * q;
        }
        
        let checkDigit = 11 - (sum % 11);
        if (checkDigit >= 10) checkDigit = 0;
        
        return base + checkDigit;
    }

    /**
     * Generate Japanese Bank Account
     * Format: Bank Code (4) + Branch Code (3) + Account Type (1) + Account Number (7)
     * Simplified: Bank Code (4) - Branch (3) - Account (7)
     */
    generateBankAccount() {
        const bank = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        const branch = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        const account = Math.floor(Math.random() * 9999999).toString().padStart(7, '0');
        
        return `${bank}-${branch}-${account}`;
    }
}
