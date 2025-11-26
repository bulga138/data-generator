/**
 * Spain Data Generator
 */

export class SpainGen {
    /**
     * Generate DNI (Documento Nacional de Identidad)
     * Format: 8 digits + Control Letter
     */
    generateDNI() {
        const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
        const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
        const letter = letters[number % 23];
        return `${number}${letter}`;
    }

    /**
     * Generate Spanish IBAN
     * Format: ESkk BBBB GGGG DC CCCCCCCCCC
     * B: Bank, G: Branch, D: DC, C: Account
     */
    generateIBAN() {
        const bank = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        const branch = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        const account = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
        
        // Calculate DC (Dígito de Control)
        // DC1: Check Bank + Branch
        // DC2: Check Account
        const dc1 = this.calculateDC(`00${bank}${branch}`);
        const dc2 = this.calculateDC(account);
        const dc = `${dc1}${dc2}`;
        
        const bban = `${bank}${branch}${dc}${account}`;
        
        // Calculate IBAN Check Digits
        // E=14, S=28 -> 142800
        const numericIBAN = BigInt(bban + '142800');
        const checkDigits = (98n - (numericIBAN % 97n)).toString().padStart(2, '0');
        
        return `ES${checkDigits}${bban}`;
    }

    calculateDC(numberStr) {
        const weights = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6];
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(numberStr[i]) * weights[i];
        }
        const remainder = 11 - (sum % 11);
        if (remainder === 11) return 0;
        if (remainder === 10) return 1;
        return remainder;
    }

    /**
     * Generate Spanish Phone Number
     * Format: +34 6/7xx xxx xxx
     */
    generatePhone() {
        const prefix = Math.random() > 0.5 ? '6' : '7';
        let number = `+34 ${prefix}`;
        for (let i = 0; i < 8; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    /**
     * Generate Spanish Postal Code
     * Format: 5 digits (01-52 prefix)
     */
    generatePostalCode() {
        const province = Math.floor(Math.random() * 52) + 1;
        const suffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${String(province).padStart(2, '0')}${suffix}`;
    }
}
