/**
 * France Data Generator
 */

export class FranceGen {
    constructor() {
        this.departments = ['75', '92', '93', '94', '69', '13', '33', '31', '59', '44'];
    }

    /**
     * Generate French National ID (INSEE / NIR)
     * Format: s yy mm dd ccc ooo kk
     * s: sex (1 male, 2 female)
     * yy: year of birth
     * mm: month of birth
     * dd: department of birth
     * ccc: commune code
     * ooo: order number
     * kk: key (97 - (number % 97))
     */
    generateINSEE(record = {}) {
        const gender = record.gender === 'Female' ? 2 : (record.gender === 'Male' ? 1 : (Math.random() > 0.5 ? 1 : 2));
        const year = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
        const dept = this.departments[Math.floor(Math.random() * this.departments.length)];
        const commune = Math.floor(Math.random() * 999).toString().padStart(3, '0');
        const order = Math.floor(Math.random() * 999).toString().padStart(3, '0');

        const numberStr = `${gender}${year}${month}${dept}${commune}${order}`;
        const number = BigInt(numberStr);
        const key = (97n - (number % 97n)).toString().padStart(2, '0');

        return `${numberStr}${key}`;
    }

    /**
     * Generate French IBAN
     * Format: FRkk BBBB BGGG GGCC CCCC CKK
     * B: Bank code (5)
     * G: Branch code (Guichet) (5)
     * C: Account number (11)
     * K: RIB Key (2)
     */
    generateFrenchIBAN() {
        const bankCode = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const branchCode = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const account = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
        
        // Calculate RIB Key
        // Key = 97 - ((89 * Bank + 15 * Branch + 3 * Account) % 97)
        const ribKeyVal = 97n - ((89n * BigInt(bankCode) + 15n * BigInt(branchCode) + 3n * BigInt(account)) % 97n);
        const ribKey = ribKeyVal.toString().padStart(2, '0');

        const bban = `${bankCode}${branchCode}${account}${ribKey}`;
        
        // Calculate IBAN Check Digits
        // FR00 + BBAN -> BBAN + FR00 -> BBAN + 152700
        // Check = 98 - (Number % 97)
        const numericIBAN = BigInt(bban + '152700');
        const checkDigits = (98n - (numericIBAN % 97n)).toString().padStart(2, '0');

        return `FR${checkDigits}${bban}`;
    }

    /**
     * Generate French Phone Number
     * Format: +33 6/7 xx xx xx xx
     */
    generateFrenchPhone() {
        const prefix = Math.random() > 0.5 ? '6' : '7';
        let number = `+33 ${prefix}`;
        
        for (let i = 0; i < 4; i++) {
            number += Math.floor(Math.random() * 100).toString().padStart(2, '0');
        }
        
        return number;
    }

    /**
     * Generate French Postal Code
     * Format: 5 digits (first 2 are department)
     */
    generatePostalCode() {
        const dept = this.departments[Math.floor(Math.random() * this.departments.length)];
        const suffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${dept}${suffix}`;
    }
}
