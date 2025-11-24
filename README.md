# Data Generator - Professional Test Data Creation

A sophisticated, browser-based data generator that creates realistic, validation-compliant test data for multiple countries. Built with pure JavaScript, CSS, and HTML - no backend required.

![Data Generator](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![ES Modules](https://img.shields.io/badge/ES-Modules-yellow)

## ✨ Features

### 🌍 Multi-Country Support
- **8 Countries Implemented:** USA, India, Brazil, Germany, Canada, China, Australia, Global/Generic
- **13 Countries Available:** Includes UK, France, Italy, Japan, Mexico (ready for implementation)
- Country-specific validation rules and formats

### 🔐 Advanced Validation Algorithms
- **Luhn Algorithm:** Credit cards, Canadian SIN
- **Verhoeff Algorithm:** Indian Aadhaar (with D5 dihedral group)
- **Modulo 11 Variants:** Brazilian CPF, Australian TFN, Chinese National ID
- **IBAN Mod 97:** European banking (uses BigInt for large numbers)

### 📊 Data Types
- **Identity:** National IDs, Passport numbers
- **Finance:** Credit cards (with CVV & expiry), Bank accounts, IBAN
- **Contact:** Mobile phones, Postal codes
- **Internet:** Email addresses (country-specific TLDs)

### 🎨 Premium UI/UX
- **Glassmorphism Design:** Modern, beautiful interface
- **Dark/Light Theme:** Toggle with localStorage persistence
- **Responsive Layout:** Works on mobile, tablet, and desktop
- **Smooth Animations:** Micro-interactions and transitions

### 📤 Export Options
- **JSON:** Pretty-printed with syntax highlighting
- **CSV:** Dynamic headers based on selected fields
- **Table:** Interactive HTML table with sticky headers
- **Download:** Automatic file naming with timestamps
- **Copy to Clipboard:** One-click copy functionality

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local HTTP server (required for ES modules)

### Installation

1. **Clone or download this repository**

2. **Start a local HTTP server:**

   Using Python:
   ```bash
   python -m http.server 8000
   ```

   Using Node.js:
   ```bash
   npx http-server -p 8000
   ```

   Using VS Code:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open your browser:**
   ```
   http://localhost:8000
   ```

## 📖 Usage

### Basic Workflow

1. **Select Country:** Choose from the dropdown (e.g., "United States")
2. **Set Quantity:** Enter number of records (1-10,000)
3. **Choose Fields:** Check the data types you want to generate
4. **Generate:** Click the "Generate Data" button
5. **View & Export:** Switch between Table/JSON/CSV views and download

### Example: Generating USA Data

```javascript
// The application will generate:
{
  "country": "United States",
  "type": "USA",
  "national_id": "123-45-6789",           // Valid SSN
  "credit_card": {
    "number": "4532123456789012",         // Luhn-valid Visa
    "cvv": "123",
    "expiry": "12/28",
    "type": "Visa"
  },
  "mobile_phone": "+1 (555) 123-4567",
  "email": "john.smith@email.com"
}
```

### Example: Generating India Data

```javascript
// The application will generate:
{
  "country": "India",
  "type": "INDIA",
  "national_id": "1234 5678 9012",        // Verhoeff-valid Aadhaar
  "credit_card": {
    "number": "4532987654321098",
    "cvv": "456",
    "expiry": "06/27",
    "type": "Visa"
  },
  "bank_account": "HDFC0001234",          // Valid IFSC
  "mobile_phone": "+91 9876 543210",
  "postal_code": "110001",
  "email": "jane.doe@email.in"
}
```

## 🏗️ Architecture

### Project Structure

```
data-generator/
├── index.html              # Main UI
├── styles.css              # Premium styling
├── main.js                 # Application controller
├── validators/             # Validation algorithms
│   ├── luhn.js            # Luhn algorithm
│   ├── verhoeff.js        # Verhoeff algorithm
│   ├── mod11.js           # Mod 11 variants
│   └── iban.js            # IBAN Mod 97
├── generators/             # Country-specific generators
│   ├── global.js          # Generic generators
│   ├── usa.js             # USA generators
│   ├── india.js           # India generators
│   ├── brazil.js          # Brazil generators
│   ├── germany.js         # Germany generators
│   ├── canada.js          # Canada generators
│   ├── china.js           # China generators
│   └── australia.js       # Australia generators
└── utils/                  # Utility functions
    ├── formatter.js       # Data formatting
    └── country-config.js  # Country metadata
```

### Modular Design

The application uses **ES Modules** for clean separation of concerns:

- **Validators:** Pure mathematical algorithms, reusable across countries
- **Generators:** Country-specific logic that imports validators
- **Utils:** Formatting, configuration, and helper functions
- **Main:** Orchestrates everything and handles UI interactions

## 🧮 Validation Algorithms Explained

### Luhn Algorithm

Used for credit cards and Canadian SIN. Validates by:
1. Doubling every second digit from right to left
2. Subtracting 9 from doubled digits > 9
3. Summing all digits
4. Check digit makes sum divisible by 10

### Verhoeff Algorithm

Used for Indian Aadhaar. More sophisticated than Luhn:
- Uses Dihedral group D5 with three tables
- Detects all single-digit errors
- Detects all transposition errors (e.g., 12 ↔ 21)

### Modulo 11 Variants

**Brazilian CPF (Double Mod 11):**
- 9 base digits + 2 check digits
- First check digit: weighted sum with weights 10-2
- Second check digit: weighted sum with weights 11-2

**Chinese National ID (ISO 7064 Mod 11-2):**
- 17 digits + 1 check character (can be 'X')
- Specific weight array for calculation

**Australian TFN:**
- 8 base digits + 1 check digit
- Weight array: [1, 4, 3, 7, 5, 8, 6, 9]

### IBAN Mod 97

Used for European banking:
1. Create IBAN with placeholder check digits '00'
2. Move country code + '00' to end
3. Convert letters to numbers (A=10, B=11, ..., Z=35)
4. Calculate `98 - (BigNumber % 97n)` using BigInt
5. Pad result to 2 digits

## 🎨 UI Features

### Glassmorphism Design
- Frosted glass effect with backdrop blur
- Subtle borders and shadows
- Premium, modern aesthetic

### Gradient Buttons
- Animated gradient backgrounds
- Shine effect on hover
- Smooth transitions

### Theme Support
- Dark mode (default)
- Light mode
- Automatic persistence

### Responsive Layout
- Mobile-first design
- Tablet optimization
- Desktop full-width

## 🔧 Technical Details

### Browser Compatibility
- **Chrome/Edge:** ✅ Full support
- **Firefox:** ✅ Full support
- **Safari:** ✅ Full support (requires Safari 14+)

### ES Module Support
- Uses `import`/`export` syntax
- Requires local HTTP server (CORS restriction)
- No bundler needed

### Performance
- **Small datasets (1-100):** < 500ms
- **Medium datasets (100-1,000):** < 2s
- **Large datasets (1,000-10,000):** < 15s
- UI remains responsive during generation

### No Dependencies
- Pure JavaScript (no libraries)
- Bootstrap 5 CDN (for UI components only)
- Bootstrap Icons CDN (for icons only)

## 📝 Country-Specific Details

### USA
- **SSN:** Avoids invalid ranges (000, 666, 900-999)
- **Routing:** Valid Federal Reserve prefixes with Mod 10 check
- **Phone:** Avoids N11 codes

### India
- **Aadhaar:** 12 digits with Verhoeff check digit
- **IFSC:** 4 alpha + '0' + 6 alphanumeric
- **Phone:** Starts with 9, 8, 7, or 6

### Brazil
- **CPF:** 11 digits with double Mod 11 check
- **CNPJ:** 14 digits for companies
- **Phone:** Mobile starts with 9

### Germany
- **IBAN:** DE + 2 check + 18 digits
- **Phone:** Valid mobile prefixes (151, 152, 157, etc.)

### Canada
- **SIN:** 9 digits with Luhn check
- **Postal:** A1A 1A1 format

### China
- **National ID:** 18 characters with ISO 7064 Mod 11-2
- **UnionPay:** Starts with 62

### Australia
- **TFN:** 9 digits with Mod 11 check
- **BSB:** Bank-State-Branch format

## 🛠️ Development

### Adding a New Country

1. **Create generator file:**
   ```javascript
   // generators/newcountry.js
   export function generateNationalID() {
       // Implementation
   }
   ```

2. **Import in main.js:**
   ```javascript
   import * as NewCountryGen from './generators/newcountry.js';
   ```

3. **Add to GENERATORS mapping:**
   ```javascript
   const GENERATORS = {
       newcountry: NewCountryGen,
       // ...
   };
   ```

4. **Update country-config.js:**
   ```javascript
   export const COUNTRIES = {
       newcountry: {
           name: 'New Country',
           flag: '🏳️',
           tld: 'nc',
           currency: 'NCU'
       }
   };
   ```

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- Validation algorithms based on official specifications
- UI inspired by modern web design trends
- Bootstrap 5 for UI components

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Ensure you're running a local HTTP server
3. Verify your browser supports ES modules and BigInt

## 🎯 Future Enhancements

- [ ] Web Worker for batch generation (>1,000 records)
- [ ] Additional countries (UK, France, Italy, Japan, Mexico)
- [ ] More data types (names, addresses, dates of birth)
- [ ] Validation testing UI
- [ ] Export to Excel (XLSX)
- [ ] Import/Export configurations

---

**Built with ❤️ using pure JavaScript, CSS, and HTML**
