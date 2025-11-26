/**
 * UK Data Generator
 */

export class UKGen {
    /**
     * Generate UK National Insurance Number (NINO)
     * Format: AA 99 99 99 A
     */
    generateNINO() {
        const letters = 'ABCEGHJKLMNPRSTWXYZ';
        const prefix1 = letters[Math.floor(Math.random() * letters.length)];
        const prefix2 = letters[Math.floor(Math.random() * letters.length)];
        
        let digits = '';
        for (let i = 0; i < 6; i++) {
            digits += Math.floor(Math.random() * 10);
        }
        
        const suffix = 'ABCD'[Math.floor(Math.random() * 4)];
        
        return `${prefix1}${prefix2} ${digits.substring(0, 2)} ${digits.substring(2, 4)} ${digits.substring(4, 6)} ${suffix}`;
    }

    /**
     * Generate UK Bank Account
     * Format: Sort Code (XX-XX-XX) + Account Number (8 digits)
     */
    generateUKBankAccount() {
        const sortCode = `${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}`;
        const account = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
        
        return `${sortCode} ${account}`;
    }

    /**
     * Generate UK Phone Number
     * Format: +44 7xxx xxxxxx
     */
    generateUKPhone() {
        let number = '+44 7';
        for (let i = 0; i < 9; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    /**
     * Generate UK Postcode
     * Simplified format: AA9A 9AA
     */
    generatePostcode() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const area = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
        const district = Math.floor(Math.random() * 9) + 1;
        const sector = Math.floor(Math.random() * 9) + 1;
        const unit = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
        
        return `${area}${district} ${sector}${unit}`;
    }
}
