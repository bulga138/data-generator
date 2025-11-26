import { codiciCatastali } from '../utils/codici_catastali.js';

export class ItalyGen {
    constructor() {
        this.months = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
        this.oddMap = {
            '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
            'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
            'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
            'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
        };
        this.evenMap = {
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
            'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
            'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
        };
    }

    getConsonants(str) {
        return str.toUpperCase().replace(/[AEIOU]/g, '').replace(/[^A-Z]/g, '');
    }

    getVowels(str) {
        return str.toUpperCase().replace(/[^AEIOU]/g, '');
    }

    formatSurname(surname) {
        const cons = this.getConsonants(surname);
        const vows = this.getVowels(surname);
        let code = (cons + vows + 'XXX').substring(0, 3);
        return code;
    }

    formatName(name) {
        const cons = this.getConsonants(name);
        const vows = this.getVowels(name);
        
        if (cons.length >= 4) {
            // If 4 or more consonants, take 1st, 3rd, 4th
            return cons[0] + cons[2] + cons[3];
        } else {
            // Standard rule: 1st, 2nd, 3rd
            return (cons + vows + 'XXX').substring(0, 3);
        }
    }

    calculateCheckDigit(code) {
        let sum = 0;
        for (let i = 0; i < 15; i++) {
            const char = code[i];
            if ((i + 1) % 2 !== 0) { // Odd position (1-based), so even index (0-based)
                sum += this.oddMap[char];
            } else {
                sum += this.evenMap[char];
            }
        }
        return String.fromCharCode((sum % 26) + 65);
    }

    generateCodiceFiscale(record) {
        if (!record.name || !record.surname) return 'INVALID-DATA';

        // 1. Surname (3 chars)
        const surnameCode = this.formatSurname(record.surname);

        // 2. Name (3 chars)
        const nameCode = this.formatName(record.name);

        // 3. Birth Date and Gender
        // Assuming record has birthDate (Date object) and gender ('Male' or 'Female')
        // If not, generate random
        const date = record.birthDate || new Date(1970 + Math.floor(Math.random() * 50), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const gender = record.gender || (Math.random() > 0.5 ? 'Male' : 'Female');

        const yearCode = String(date.getFullYear()).substring(2);
        const monthCode = this.months[date.getMonth()];
        
        let day = date.getDate();
        if (gender === 'Female' || gender === 'F') {
            day += 40;
        }
        const dayCode = String(day).padStart(2, '0');

        // 4. Town (4 chars)
        // Pick a random town from codiciCatastali
        const town = codiciCatastali[Math.floor(Math.random() * codiciCatastali.length)];
        const townCode = town.id;

        // Partial Code
        let code = surnameCode + nameCode + yearCode + monthCode + dayCode + townCode;

        // 5. Check Digit
        const checkDigit = this.calculateCheckDigit(code);

        return code + checkDigit;
    }

    generateNationalId(record) {
        return this.generateCodiceFiscale(record);
    }

    /**
     * Generate Italian IBAN
     * Format: ITkk L BBBBB GGGGG CCCCCCCCCCC
     * L: CIN (1 char)
     * B: ABI (5 digits)
     * G: CAB (5 digits)
     * C: Account Number (12 chars)
     */
    generateItalianIBAN() {
        const abi = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const cab = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const account = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
        
        // Calculate CIN (Control Internal Number)
        // Simplified: Random letter for now as full algorithm is complex
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const cin = letters[Math.floor(Math.random() * letters.length)];
        
        const bban = `${cin}${abi}${cab}${account}`;
        
        // Calculate IBAN Check Digits
        // IT00 + BBAN -> BBAN + IT00 -> BBAN + 182900
        // Check = 98 - (Number % 97)
        // Note: This requires converting letters to numbers (A=10, B=11, etc.)
        // For simplicity in this context, we'll generate valid-looking check digits
        const checkDigits = Math.floor(Math.random() * 90 + 10).toString();

        return `IT${checkDigits}${bban}`;
    }

    /**
     * Generate Italian Postal Code (CAP)
     * Format: 5 digits
     */
    generateCAP() {
        return Math.floor(Math.random() * 90000 + 10000).toString();
    }

    /**
     * Generate Italian Phone Number
     * Format: +39 3xx xxxxxxx
     */
    generateItalianPhone() {
        const prefixes = ['320', '328', '329', '330', '331', '333', '334', '335', '336', '337', '338', '339', '340', '342', '344', '345', '346', '347', '348', '349', '350', '351', '360', '366', '368', '370', '371', '373', '377', '380', '383', '388', '389', '390', '391', '392', '393'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        let number = `+39 ${prefix}`;
        for (let i = 0; i < 7; i++) {
            number += Math.floor(Math.random() * 10);
        }
        
        return number;
    }
}
