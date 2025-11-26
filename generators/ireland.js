/**
 * Ireland Data Generator
 */

export class IrelandGen {
    /**
     * Generate PPSN (Personal Public Service Number)
     * Format: 7 digits + 1 or 2 letters
     */
    generatePPSN() {
        const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letter1 = letters[Math.floor(Math.random() * letters.length)];
        const hasSecondLetter = Math.random() > 0.8; // 20% chance
        const letter2 = hasSecondLetter ? letters[Math.floor(Math.random() * letters.length)] : '';
        
        return `${number}${letter1}${letter2}`;
    }

    /**
     * Generate Irish IBAN
     * Format: IEkk AAAA BBBB BBCC CCCC CC
     * A: SBIC (4), B: Sort Code (6), C: Account (8)
     */
    generateIBAN() {
        const sbic = "BOFI"; // Bank of Ireland (Example)
        const sortCode = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
        const account = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
        
        const bban = `${sbic}${sortCode}${account}`;
        
        // Calculate IBAN Check Digits
        // I=18, E=14 -> 181400
        // Convert letters in SBIC to numbers: A=10...Z=35
        let numericBBAN = '';
        for (let char of bban) {
            if (/[A-Z]/.test(char)) {
                numericBBAN += (char.charCodeAt(0) - 55).toString();
            } else {
                numericBBAN += char;
            }
        }
        
        const numericIBAN = BigInt(numericBBAN + '181400');
        const checkDigits = (98n - (numericIBAN % 97n)).toString().padStart(2, '0');
        
        return `IE${checkDigits}${sbic}${sortCode}${account}`;
    }

    /**
     * Generate Irish Phone Number
     * Format: +353 8x xxx xxxx
     */
    generatePhone() {
        const prefixes = ['83', '85', '86', '87', '89'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        let number = `+353 ${prefix}`;
        for (let i = 0; i < 7; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    /**
     * Generate Eircode (Postal Code)
     * Format: A65 F4E2 (Routing Key + Unique Identifier)
     */
    generateEircode() {
        const chars = "ACDEFHKNPRTVWXY0123456789"; // Allowed chars
        
        // Routing Key: 3 chars
        let routingKey = '';
        for (let i = 0; i < 3; i++) {
            routingKey += chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Unique Identifier: 4 chars
        let uniqueId = '';
        for (let i = 0; i < 4; i++) {
            uniqueId += chars[Math.floor(Math.random() * chars.length)];
        }
        
        return `${routingKey} ${uniqueId}`;
    }
}
