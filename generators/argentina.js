/**
 * Argentina Data Generator
 */

export class ArgentinaGen {
    /**
     * Generate CUIT (Clave Única de Identificación Tributaria)
     * Format: XY-DNI-Z
     */
    generateCUIT() {
        // Recursive wrapper to handle Z=10 case
        const generate = () => {
            const dni = Math.floor(Math.random() * (99999999 - 10000000) + 10000000).toString();
            const genders = ['male', 'female', 'society'];
            const gender = genders[Math.floor(Math.random() * genders.length)];
            
            let ab;
            switch (gender) {
                case 'male': ab = '20'; break;
                case 'female': ab = '27'; break;
                default: ab = '30'; break; // '33' is also valid but using '30' as default society
            }

            let calc = parseInt(ab[0]) * 5 + parseInt(ab[1]) * 4;
            const multipliers = [3, 2, 7, 6, 5, 4, 3, 2];
            
            for (let i = 0; i < 8; i++) {
                calc += parseInt(dni[i]) * multipliers[i];
            }
            
            let z = 11 - (calc % 11);
            
            if (z === 10) {
                return null; // Signal to retry
            }
            
            if (z === 11) {
                z = 0;
            }
            
            return `${ab}-${dni}-${z}`;
        };

        let result = null;
        while (!result) {
            result = generate();
        }
        return result;
    }

    /**
     * Generate CBU (Clave Bancaria Uniforme)
     * Format: 22 digits
     */
    generateCBU() {
        const bank = Math.floor(Math.random() * (999 - 100) + 100).toString(); // 3 digits
        const branch = Math.floor(Math.random() * (9999 - 1000) + 1000).toString(); // 4 digits
        
        const block1 = bank + branch;
        const verifier1 = this.getChecksum(block1);
        
        const account = Math.floor(Math.random() * (9999999999999 - 1000000000000) + 1000000000000).toString(); // 13 digits
        const verifier2 = this.getChecksum(account);
        
        return `${block1}${verifier1}${account}${verifier2}`;
    }

    getChecksum(numberStr) {
        const weights = [3, 1, 7, 9];
        let sum = 0;
        let j = 0;
        
        for (let i = numberStr.length - 1; i >= 0; i--) {
            sum += parseInt(numberStr[i]) * weights[j % 4];
            j++;
        }
        
        return (10 - (sum % 10)) % 10;
    }

    /**
     * Generate Argentine Phone Number
     * Format: +54 9 11 xxxx xxxx (Mobile format for Buenos Aires)
     */
    generatePhone() {
        // +54 (Country) 9 (Mobile) 11 (BA Area)
        let number = '+54 9 11 ';
        for (let i = 0; i < 8; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    /**
     * Generate Argentine Postal Code (CPA)
     * Format: A1234ABC
     */
    generatePostalCode() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const province = letters[Math.floor(Math.random() * letters.length)];
        const district = Math.floor(Math.random() * 9000 + 1000).toString();
        
        let street = '';
        for (let i = 0; i < 3; i++) {
            street += letters[Math.floor(Math.random() * letters.length)];
        }
        
        return `${province}${district}${street}`;
    }
}
