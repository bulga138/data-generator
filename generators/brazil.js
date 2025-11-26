/**
 * Brazil Data Generators
 */

import { generateValidCPF, formatCPF } from '../validators/mod11.js';

/**
 * Generate CPF (Cadastro de Pessoas Físicas)
 * 11 digits with double Mod 11 check digits
 * @param {boolean} formatted - Return formatted (XXX.XXX.XXX-XX)
 * @returns {string} CPF
 */
export function generateCPF(formatted = true) {
    const cpf = generateValidCPF();
    return formatted ? formatCPF(cpf) : cpf;
}

/**
 * Generate Brazilian mobile phone number
 * Format: +55 XX 9XXXX-XXXX
 * @returns {string} Phone number
 */
export function generateBrazilianPhone() {
    // Area code: 11-99 (major cities)
    const areaCodes = [11, 12, 13, 14, 15, 16, 17, 18, 19, // São Paulo state
                       21, 22, 24, // Rio de Janeiro state
                       27, 28, // Espírito Santo
                       31, 32, 33, 34, 35, 37, 38, // Minas Gerais
                       41, 42, 43, 44, 45, 46, // Paraná
                       47, 48, 49, // Santa Catarina
                       51, 53, 54, 55, // Rio Grande do Sul
                       61, // Brasília
                       62, 64, // Goiás
                       71, 73, 74, 75, 77, // Bahia
                       81, 87, // Pernambuco
                       82, // Alagoas
                       83, // Paraíba
                       84, // Rio Grande do Norte
                       85, 88, // Ceará
                       86, 89, // Piauí
                       91, 93, 94, // Pará
                       92, 97, // Amazonas
                       95, // Roraima
                       96, // Amapá
                       98, 99]; // Maranhão
    
    const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    
    // Mobile numbers start with 9
    let number = '+55 ' + areaCode + ' 9';
    
    // Next 4 digits
    for (let i = 0; i < 4; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    number += '-';
    
    // Last 4 digits
    for (let i = 0; i < 4; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    return number;
}

/**
 * Generate CEP (Código de Endereçamento Postal)
 * Format: XXXXX-XXX
 * @returns {string} CEP
 */
export function generateCEP() {
    let cep = '';
    
    // First 5 digits
    for (let i = 0; i < 5; i++) {
        cep += Math.floor(Math.random() * 10);
    }
    
    cep += '-';
    
    // Last 3 digits
    for (let i = 0; i < 3; i++) {
        cep += Math.floor(Math.random() * 10);
    }
    
    return cep;
}

/**
 * Generate CNPJ (Cadastro Nacional da Pessoa Jurídica)
 * 14 digits with double Mod 11 check digits (for companies)
 * Format: XX.XXX.XXX/XXXX-XX
 * @param {boolean} formatted - Return formatted
 * @returns {string} CNPJ
 */
export function generateCNPJ(formatted = true) {
    // Generate 12 base digits
    let baseNumber = '';
    for (let i = 0; i < 12; i++) {
        baseNumber += Math.floor(Math.random() * 10);
    }
    
    // First check digit
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum1 = 0;
    for (let i = 0; i < 12; i++) {
        sum1 += parseInt(baseNumber[i]) * weights1[i];
    }
    const remainder1 = sum1 % 11;
    const checkDigit1 = remainder1 < 2 ? 0 : 11 - remainder1;
    
    // Second check digit
    const withFirst = baseNumber + checkDigit1;
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum2 = 0;
    for (let i = 0; i < 13; i++) {
        sum2 += parseInt(withFirst[i]) * weights2[i];
    }
    const remainder2 = sum2 % 11;
    const checkDigit2 = remainder2 < 2 ? 0 : 11 - remainder2;
    
    const cnpj = baseNumber + checkDigit1 + checkDigit2;
    
    if (formatted) {
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    
    
    return cnpj;
}

/**
 * Generate Brazilian Bank Account
 * Format: Agência (4) + Conta (7) + Digit (1)
 */
export function generateBankAccount() {
    const agencia = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const conta = Math.floor(Math.random() * 9999999).toString().padStart(7, '0');
    const digit = Math.floor(Math.random() * 10);
    
    return `${agencia} / ${conta}-${digit}`;
}
