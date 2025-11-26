/**
 * Country Configuration and Metadata
 * Maps countries to their generators and metadata
 */

export const COUNTRIES = {
    global: {
        name: 'Global',
        flag: '🌍',
        tld: 'com',
        currency: 'USD'
    },
    usa: {
        name: 'United States',
        flag: '🇺🇸',
        tld: 'com',
        currency: 'USD'
    },
    uk: {
        name: 'United Kingdom',
        flag: '🇬🇧',
        tld: 'co.uk',
        currency: 'GBP'
    },
    china: {
        name: 'China',
        flag: '🇨🇳',
        tld: 'cn',
        currency: 'CNY'
    },
    india: {
        name: 'India',
        flag: '🇮🇳',
        tld: 'in',
        currency: 'INR'
    },
    brazil: {
        name: 'Brazil',
        flag: '🇧🇷',
        tld: 'com.br',
        currency: 'BRL'
    },
    germany: {
        name: 'Germany',
        flag: '🇩🇪',
        tld: 'de',
        currency: 'EUR'
    },
    france: {
        name: 'France',
        flag: '🇫🇷',
        tld: 'fr',
        currency: 'EUR'
    },
    italy: {
        name: 'Italy',
        flag: '🇮🇹',
        tld: 'it',
        currency: 'EUR'
    },
    japan: {
        name: 'Japan',
        flag: '🇯🇵',
        tld: 'jp',
        currency: 'JPY'
    },
    mexico: {
        name: 'Mexico',
        flag: '🇲🇽',
        tld: 'mx',
        currency: 'MXN'
    },
    canada: {
        name: 'Canada',
        flag: '🇨🇦',
        tld: 'ca',
        currency: 'CAD'
    },
    australia: {
        name: 'Australia',
        flag: '🇦🇺',
        tld: 'com.au',
        currency: 'AUD'
    },
    spain: {
        name: 'Spain',
        flag: '🇪🇸',
        tld: 'es',
        currency: 'EUR'
    },
    ireland: {
        name: 'Ireland',
        flag: '🇮🇪',
        tld: 'ie',
        currency: 'EUR'
    },
    argentina: {
        name: 'Argentina',
        flag: '🇦🇷',
        tld: 'com.ar',
        currency: 'ARS'
    }
};

/**
 * Get country metadata
 * @param {string} countryCode - Country code
 * @returns {Object} Country metadata
 */
export function getCountryInfo(countryCode) {
    return COUNTRIES[countryCode] || COUNTRIES.global;
}

/**
 * Field availability by country
 * Defines which fields are available for each country
 */
export const FIELD_AVAILABILITY = {
    global: {
        name: true,
        nationalId: true,
        passport: true,
        creditCard: true,
        bankAccount: true,
        mobile: true,
        postalCode: false,
        email: true
    },
    usa: {
        name: true,
        nationalId: true, // SSN
        passport: true,
        creditCard: true,
        bankAccount: true, // Routing number
        mobile: true,
        postalCode: true, // ZIP
        email: true
    },
    uk: {
        name: true,
        nationalId: true, // NINO
        passport: true,
        creditCard: true,
        bankAccount: true, // Sort code
        mobile: true,
        postalCode: true,
        email: true
    },
    china: {
        name: true,
        nationalId: true, // 18-digit ID
        passport: true,
        creditCard: true, // UnionPay
        bankAccount: true,
        mobile: true,
        postalCode: true,
        email: true
    },
    india: {
        name: true,
        nationalId: true, // Aadhaar
        passport: true,
        creditCard: true,
        bankAccount: true, // IFSC
        mobile: true,
        postalCode: true, // PIN
        email: true
    },
    brazil: {
        name: true,
        nationalId: true, // CPF
        passport: true,
        creditCard: true,
        bankAccount: true,
        mobile: true,
        postalCode: true, // CEP
        email: true
    },
    germany: {
        name: true,
        nationalId: true, // Personalausweis
        passport: true,
        creditCard: true,
        bankAccount: true, // IBAN
        mobile: true,
        postalCode: true, // PLZ
        email: true
    },
    france: {
        name: true,
        nationalId: true, // INSEE
        passport: true,
        creditCard: true,
        bankAccount: true, // IBAN
        mobile: true,
        postalCode: true,
        email: true
    },
    italy: {
        name: true,
        nationalId: true, // Codice Fiscale
        passport: true,
        creditCard: true,
        bankAccount: true, // IBAN
        mobile: true,
        postalCode: true,
        email: true
    },
    japan: {
        name: true,
        nationalId: true, // My Number
        passport: true,
        creditCard: true,
        bankAccount: true,
        mobile: true,
        postalCode: true,
        email: true
    },
    mexico: {
        name: true,
        nationalId: true, // CURP
        passport: true,
        creditCard: true,
        bankAccount: true,
        mobile: true,
        postalCode: true,
        email: true
    },
    canada: {
        name: true,
        nationalId: true, // SIN
        passport: true,
        creditCard: true,
        bankAccount: true, // Routing
        mobile: true,
        postalCode: true,
        email: true
    },
    australia: {
        name: true,
        nationalId: true, // TFN
        passport: true,
        creditCard: true,
        bankAccount: true, // BSB
        mobile: true,
        postalCode: true,
        email: true
    },
    spain: {
        name: true,
        nationalId: true, // DNI
        passport: true,
        creditCard: true,
        bankAccount: true, // IBAN
        mobile: true,
        postalCode: true,
        email: true
    },
    ireland: {
        name: true,
        nationalId: true, // PPSN
        passport: true,
        creditCard: true,
        bankAccount: true, // IBAN
        mobile: true,
        postalCode: true, // Eircode
        email: true
    },
    argentina: {
        name: true,
        nationalId: true, // CUIT
        passport: true,
        creditCard: true,
        bankAccount: true, // CBU
        mobile: true,
        postalCode: true,
        email: true
    }
};

/**
 * Check if a field is available for a country
 * @param {string} countryCode - Country code
 * @param {string} fieldName - Field name
 * @returns {boolean} Availability
 */
export function isFieldAvailable(countryCode, fieldName) {
    const availability = FIELD_AVAILABILITY[countryCode] || FIELD_AVAILABILITY.global;
    return availability[fieldName] !== false;
}
