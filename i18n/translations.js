/**
 * Translations for Data Generator
 * Supports: English, Spanish, French, German, Portuguese, Chinese (Simplified)
 */

export const translations = {
    en: {
        app: {
            title: "Data Generator",
            subtitle: "Professional Test Data with Real Validation"
        },
        config: {
            title: "Configuration",
            country: "Country",
            quantity: "Quantity",
            quantityHelp: "Generate 1 - 10,000 records",
            categories: "Data Categories"
        },
        categories: {
            all: "All",
            id: "ID",
            finance: "Finance",
            contact: "Contact",
            internet: "Internet"
        },
        categoryTitles: {
            identity: "Identity Documents",
            financial: "Financial Data",
            contactInfo: "Contact Information",
            internetData: "Internet Data"
        },
        fields: {
            name: "Full Name",
            nationalId: "National ID / SSN",
            passport: "Passport Number",
            creditCard: "Credit Card",
            cardType: "Card Type",
            bankAccount: "Bank Account / IBAN",
            mobile: "Mobile Phone",
            postalCode: "Postal Code",
            email: "Email Address",
            country: "Country"
        },
        cardTypes: {
            random: "Random",
            visa: "Visa",
            mastercard: "Mastercard",
            amex: "American Express",
            discover: "Discover"
        },
        actions: {
            generate: "Generate Data",
            generating: "Generating...",
            download: "Download",
            clear: "Clear",
            copy: "Copy"
        },
        output: {
            table: "Table",
            json: "JSON",
            csv: "CSV",
            noData: "No data generated yet. Configure options and click \"Generate Data\"."
        },
        messages: {
            success: "Successfully generated {count} record(s)",
            errorGeneral: "Error generating data",
            errorQuantity: "Please enter a quantity between 1 and 10,000",
            errorNoFields: "Please select at least one data field",
            noDataToCopy: "No data to copy",
            noDataToDownload: "No data to download",
            cellCopied: "Cell copied!",
            rowCopied: "Row copied!",
            tableCopied: "Table copied!",
            jsonCopied: "JSON copied!",
            csvCopied: "CSV copied!",
            jsonDownloaded: "JSON file downloaded",
            csvDownloaded: "CSV file downloaded",
            failedToCopy: "Failed to copy"
        },
        info: {
            title: "Information",
            validation: "All data passes validation algorithms",
            testing: "For testing purposes only",
            clientSide: "Client-side processing"
        },
        aria: {
            skipToMain: "Skip to main content",
            themeToggle: "Change theme",
            languageToggle: "Change language",
            copyCell: "Copy cell value",
            copyRow: "Copy row data",
            copyTable: "Copy entire table",
            copyJson: "Copy JSON",
            copyCsv: "Copy CSV",
            generateButton: "Generate test data",
            downloadJson: "Download as JSON",
            downloadCsv: "Download as CSV",
            clearData: "Clear all data",
            configNav: "Data configuration",
            outputSection: "Generated data output"
        },
        themes: {
            light: "Light",
            dark: "Dark",
            colorblind: "Colorblind-Friendly"
        },
        menu: {
            title: "Menu",
            theme: "Theme",
            selectTheme: "Select Theme",
            language: "Language"
        },
        countries: {
            global: "Global",
            usa: "United States",
            uk: "United Kingdom",
            china: "China",
            india: "India",
            brazil: "Brazil",
            germany: "Germany",
            france: "France",
            italy: "Italy",
            japan: "Japan",
            mexico: "Mexico",
            canada: "Canada",
            australia: "Australia",
            spain: "Spain",
            ireland: "Ireland",
            argentina: "Argentina"
        }
    },
    
    es: {
        app: {
            title: "Generador de Datos",
            subtitle: "Datos de Prueba Profesionales con Validación Real"
        },
        config: {
            title: "Configuración",
            country: "País",
            quantity: "Cantidad",
            quantityHelp: "Generar 1 - 10,000 registros",
            categories: "Categorías de Datos"
        },
        categories: {
            all: "Todos",
            id: "ID",
            finance: "Finanzas",
            contact: "Contacto",
            internet: "Internet"
        },
        categoryTitles: {
            identity: "Documentos de Identidad",
            financial: "Datos Financieros",
            contactInfo: "Información de Contacto",
            internetData: "Datos de Internet"
        },
        fields: {
            name: "Nombre Completo",
            nationalId: "ID Nacional / SSN",
            passport: "Número de Pasaporte",
            creditCard: "Tarjeta de Crédito",
            cardType: "Tipo de Tarjeta",
            bankAccount: "Cuenta Bancaria / IBAN",
            mobile: "Teléfono Móvil",
            postalCode: "Código Postal",
            email: "Correo Electrónico",
            country: "País"
        },
        cardTypes: {
            random: "Aleatorio",
            visa: "Visa",
            mastercard: "Mastercard",
            amex: "American Express",
            discover: "Discover"
        },
        actions: {
            generate: "Generar Datos",
            generating: "Generando...",
            download: "Descargar",
            clear: "Limpiar",
            copy: "Copiar"
        },
        output: {
            table: "Tabla",
            json: "JSON",
            csv: "CSV",
            noData: "No se han generado datos aún. Configure las opciones y haga clic en \"Generar Datos\"."
        },
        messages: {
            success: "Se generaron {count} registro(s) exitosamente",
            errorGeneral: "Error al generar datos",
            errorQuantity: "Por favor ingrese una cantidad entre 1 y 10,000",
            errorNoFields: "Por favor seleccione al menos un campo de datos",
            noDataToCopy: "No hay datos para copiar",
            noDataToDownload: "No hay datos para descargar",
            cellCopied: "¡Celda copiada!",
            rowCopied: "¡Fila copiada!",
            tableCopied: "¡Tabla copiada!",
            jsonCopied: "¡JSON copiado!",
            csvCopied: "¡CSV copiado!",
            jsonDownloaded: "Archivo JSON descargado",
            csvDownloaded: "Archivo CSV descargado",
            failedToCopy: "Error al copiar"
        },
        info: {
            title: "Información",
            validation: "Todos los datos pasan algoritmos de validación",
            testing: "Solo para propósitos de prueba",
            clientSide: "Procesamiento del lado del cliente"
        },
        aria: {
            skipToMain: "Saltar al contenido principal",
            themeToggle: "Cambiar tema",
            languageToggle: "Cambiar idioma",
            copyCell: "Copiar valor de celda",
            copyRow: "Copiar datos de fila",
            copyTable: "Copiar tabla completa",
            copyJson: "Copiar JSON",
            copyCsv: "Copiar CSV",
            generateButton: "Generar datos de prueba",
            downloadJson: "Descargar como JSON",
            downloadCsv: "Descargar como CSV",
            clearData: "Limpiar todos los datos",
            configNav: "Configuración de datos",
            outputSection: "Salida de datos generados"
        },
        themes: {
            light: "Claro",
            dark: "Oscuro",
            colorblind: "Amigable para Daltónicos"
        },
        menu: {
            title: "Menú",
            theme: "Tema",
            selectTheme: "Seleccionar Tema",
            language: "Idioma"
        },
        countries: {
            global: "Global",
            usa: "Estados Unidos",
            uk: "Reino Unido",
            china: "China",
            india: "India",
            brazil: "Brasil",
            germany: "Alemania",
            france: "Francia",
            italy: "Italia",
            japan: "Japón",
            mexico: "México",
            canada: "Canadá",
            australia: "Australia",
            spain: "España",
            ireland: "Irlanda",
            argentina: "Argentina"
        }
    },
    
    fr: {
        app: {
            title: "Générateur de Données",
            subtitle: "Données de Test Professionnelles avec Validation Réelle"
        },
        config: {
            title: "Configuration",
            country: "Pays",
            quantity: "Quantité",
            quantityHelp: "Générer 1 - 10 000 enregistrements",
            categories: "Catégories de Données"
        },
        categories: {
            all: "Tout",
            id: "ID",
            finance: "Finance",
            contact: "Contact",
            internet: "Internet"
        },
        categoryTitles: {
            identity: "Documents d'Identité",
            financial: "Données Financières",
            contactInfo: "Informations de Contact",
            internetData: "Données Internet"
        },
        fields: {
            name: "Nom Complet",
            nationalId: "ID National / SSN",
            passport: "Numéro de Passeport",
            creditCard: "Carte de Crédit",
            cardType: "Type de Carte",
            bankAccount: "Compte Bancaire / IBAN",
            mobile: "Téléphone Mobile",
            postalCode: "Code Postal",
            email: "Adresse E-mail",
            country: "Pays"
        },
        cardTypes: {
            random: "Aléatoire",
            visa: "Visa",
            mastercard: "Mastercard",
            amex: "American Express",
            discover: "Discover"
        },
        actions: {
            generate: "Générer des Données",
            generating: "Génération...",
            download: "Télécharger",
            clear: "Effacer",
            copy: "Copier"
        },
        output: {
            table: "Tableau",
            json: "JSON",
            csv: "CSV",
            noData: "Aucune donnée générée pour le moment. Configurez les options et cliquez sur \"Générer des Données\"."
        },
        messages: {
            success: "{count} enregistrement(s) généré(s) avec succès",
            errorGeneral: "Erreur lors de la génération des données",
            errorQuantity: "Veuillez entrer une quantité entre 1 et 10 000",
            errorNoFields: "Veuillez sélectionner au moins un champ de données",
            noDataToCopy: "Aucune donnée à copier",
            noDataToDownload: "Aucune donnée à télécharger",
            cellCopied: "Cellule copiée !",
            rowCopied: "Ligne copiée !",
            tableCopied: "Tableau copié !",
            jsonCopied: "JSON copié !",
            csvCopied: "CSV copié !",
            jsonDownloaded: "Fichier JSON téléchargé",
            csvDownloaded: "Fichier CSV téléchargé",
            failedToCopy: "Échec de la copie"
        },
        info: {
            title: "Information",
            validation: "Toutes les données passent les algorithmes de validation",
            testing: "À des fins de test uniquement",
            clientSide: "Traitement côté client"
        },
        aria: {
            skipToMain: "Aller au contenu principal",
            themeToggle: "Changer de thème",
            languageToggle: "Changer de langue",
            copyCell: "Copier la valeur de la cellule",
            copyRow: "Copier les données de la ligne",
            copyTable: "Copier le tableau entier",
            copyJson: "Copier JSON",
            copyCsv: "Copier CSV",
            generateButton: "Générer des données de test",
            downloadJson: "Télécharger en JSON",
            downloadCsv: "Télécharger en CSV",
            clearData: "Effacer toutes les données",
            configNav: "Configuration des données",
            outputSection: "Sortie des données générées"
        },
        themes: {
            light: "Clair",
            dark: "Sombre",
            colorblind: "Adapté aux Daltoniens"
        },
        menu: {
            title: "Menu",
            theme: "Thème",
            selectTheme: "Choisir le Thème",
            language: "Langue"
        },
        countries: {
            global: "Mondial",
            usa: "États-Unis",
            uk: "Royaume-Uni",
            china: "Chine",
            india: "Inde",
            brazil: "Brésil",
            germany: "Allemagne",
            france: "France",
            italy: "Italie",
            japan: "Japon",
            mexico: "Mexique",
            canada: "Canada",
            australia: "Australie",
            spain: "Espagne",
            ireland: "Irlande",
            argentina: "Argentine"
        }
    },
    
    de: {
        app: {
            title: "Datengenerator",
            subtitle: "Professionelle Testdaten mit Echter Validierung"
        },
        config: {
            title: "Konfiguration",
            country: "Land",
            quantity: "Menge",
            quantityHelp: "1 - 10.000 Datensätze generieren",
            categories: "Datenkategorien"
        },
        categories: {
            all: "Alle",
            id: "ID",
            finance: "Finanzen",
            contact: "Kontakt",
            internet: "Internet"
        },
        categoryTitles: {
            identity: "Ausweisdokumente",
            financial: "Finanzdaten",
            contactInfo: "Kontaktinformationen",
            internetData: "Internetdaten"
        },
        fields: {
            name: "Vollständiger Name",
            nationalId: "Personalausweis / SSN",
            passport: "Reisepassnummer",
            creditCard: "Kreditkarte",
            cardType: "Kartentyp",
            bankAccount: "Bankkonto / IBAN",
            mobile: "Mobiltelefon",
            postalCode: "Postleitzahl",
            email: "E-Mail-Adresse",
            country: "Land"
        },
        cardTypes: {
            random: "Zufällig",
            visa: "Visa",
            mastercard: "Mastercard",
            amex: "American Express",
            discover: "Discover"
        },
        actions: {
            generate: "Daten Generieren",
            generating: "Wird generiert...",
            download: "Herunterladen",
            clear: "Löschen",
            copy: "Kopieren"
        },
        output: {
            table: "Tabelle",
            json: "JSON",
            csv: "CSV",
            noData: "Noch keine Daten generiert. Konfigurieren Sie die Optionen und klicken Sie auf \"Daten Generieren\"."
        },
        messages: {
            success: "{count} Datensatz/Datensätze erfolgreich generiert",
            errorGeneral: "Fehler beim Generieren der Daten",
            errorQuantity: "Bitte geben Sie eine Menge zwischen 1 und 10.000 ein",
            errorNoFields: "Bitte wählen Sie mindestens ein Datenfeld aus",
            noDataToCopy: "Keine Daten zum Kopieren",
            noDataToDownload: "Keine Daten zum Herunterladen",
            cellCopied: "Zelle kopiert!",
            rowCopied: "Zeile kopiert!",
            tableCopied: "Tabelle kopiert!",
            jsonCopied: "JSON kopiert!",
            csvCopied: "CSV kopiert!",
            jsonDownloaded: "JSON-Datei heruntergeladen",
            csvDownloaded: "CSV-Datei heruntergeladen",
            failedToCopy: "Kopieren fehlgeschlagen"
        },
        info: {
            title: "Information",
            validation: "Alle Daten bestehen Validierungsalgorithmen",
            testing: "Nur zu Testzwecken",
            clientSide: "Clientseitige Verarbeitung"
        },
        aria: {
            skipToMain: "Zum Hauptinhalt springen",
            themeToggle: "Thema wechseln",
            languageToggle: "Sprache wechseln",
            copyCell: "Zellenwert kopieren",
            copyRow: "Zeilendaten kopieren",
            copyTable: "Gesamte Tabelle kopieren",
            copyJson: "JSON kopieren",
            copyCsv: "CSV kopieren",
            generateButton: "Testdaten generieren",
            downloadJson: "Als JSON herunterladen",
            downloadCsv: "Als CSV herunterladen",
            clearData: "Alle Daten löschen",
            configNav: "Datenkonfiguration",
            outputSection: "Generierte Datenausgabe"
        },
        themes: {
            light: "Hell",
            dark: "Dunkel",
            colorblind: "Farbenblindfreundlich"
        },
        menu: {
            title: "Menü",
            theme: "Thema",
            selectTheme: "Thema wählen",
            language: "Sprache"
        },
        countries: {
            global: "Global",
            usa: "Vereinigte Staaten",
            uk: "Vereinigtes Königreich",
            china: "China",
            india: "Indien",
            brazil: "Brasilien",
            germany: "Deutschland",
            france: "Frankreich",
            italy: "Italien",
            japan: "Japan",
            mexico: "Mexiko",
            canada: "Kanada",
            australia: "Australien",
            spain: "Spanien",
            ireland: "Irland",
            argentina: "Argentinien"
        }
    },
    
    pt: {
        app: {
            title: "Gerador de Dados",
            subtitle: "Dados de Teste Profissionais com Validação Real"
        },
        config: {
            title: "Configuração",
            country: "País",
            quantity: "Quantidade",
            quantityHelp: "Gerar 1 - 10.000 registros",
            categories: "Categorias de Dados"
        },
        categories: {
            all: "Todos",
            id: "ID",
            finance: "Finanças",
            contact: "Contato",
            internet: "Internet"
        },
        categoryTitles: {
            identity: "Documentos de Identidade",
            financial: "Dados Financeiros",
            contactInfo: "Informações de Contato",
            internetData: "Dados da Internet"
        },
        fields: {
            name: "Nome Completo",
            nationalId: "ID Nacional / CPF",
            passport: "Número do Passaporte",
            creditCard: "Cartão de Crédito",
            cardType: "Tipo de Cartão",
            bankAccount: "Conta Bancária / IBAN",
            mobile: "Telefone Celular",
            postalCode: "Código Postal",
            email: "Endereço de E-mail",
            country: "País"
        },
        cardTypes: {
            random: "Aleatório",
            visa: "Visa",
            mastercard: "Mastercard",
            amex: "American Express",
            discover: "Discover"
        },
        actions: {
            generate: "Gerar Dados",
            generating: "Gerando...",
            download: "Baixar",
            clear: "Limpar",
            copy: "Copiar"
        },
        output: {
            table: "Tabela",
            json: "JSON",
            csv: "CSV",
            noData: "Nenhum dado gerado ainda. Configure as opções e clique em \"Gerar Dados\"."
        },
        messages: {
            success: "{count} registro(s) gerado(s) com sucesso",
            errorGeneral: "Erro ao gerar dados",
            errorQuantity: "Por favor, insira uma quantidade entre 1 e 10.000",
            errorNoFields: "Por favor, selecione pelo menos um campo de dados",
            noDataToCopy: "Nenhum dado para copiar",
            noDataToDownload: "Nenhum dado para baixar",
            cellCopied: "Célula copiada!",
            rowCopied: "Linha copiada!",
            tableCopied: "Tabela copiada!",
            jsonCopied: "JSON copiado!",
            csvCopied: "CSV copiado!",
            jsonDownloaded: "Arquivo JSON baixado",
            csvDownloaded: "Arquivo CSV baixado",
            failedToCopy: "Falha ao copiar"
        },
        info: {
            title: "Informação",
            validation: "Todos os dados passam por algoritmos de validação",
            testing: "Apenas para fins de teste",
            clientSide: "Processamento do lado do cliente"
        },
        aria: {
            skipToMain: "Pular para o conteúdo principal",
            themeToggle: "Mudar tema",
            languageToggle: "Mudar idioma",
            copyCell: "Copiar valor da célula",
            copyRow: "Copiar dados da linha",
            copyTable: "Copiar tabela inteira",
            copyJson: "Copiar JSON",
            copyCsv: "Copiar CSV",
            generateButton: "Gerar dados de teste",
            downloadJson: "Baixar como JSON",
            downloadCsv: "Baixar como CSV",
            clearData: "Limpar todos os dados",
            configNav: "Configuração de datos",
            outputSection: "Saída de dados gerados"
        },
        themes: {
            light: "Claro",
            dark: "Escuro",
            colorblind: "Amigável para Daltônicos"
        },
        menu: {
            title: "Menu",
            theme: "Tema",
            selectTheme: "Selecionar Tema",
            language: "Idioma"
        },
        countries: {
            global: "Global",
            usa: "Estados Unidos",
            uk: "Reino Unido",
            china: "China",
            india: "Índia",
            brazil: "Brasil",
            germany: "Alemanha",
            france: "França",
            italy: "Itália",
            japan: "Japão",
            mexico: "México",
            canada: "Canadá",
            australia: "Austrália",
            spain: "Espanha",
            ireland: "Irlanda",
            argentina: "Argentina"
        }
    },
    
    zh: {
        app: {
            title: "数据生成器",
            subtitle: "具有真实验证的专业测试数据"
        },
        config: {
            title: "配置",
            country: "国家/地区",
            quantity: "数量",
            quantityHelp: "生成 1 - 10,000 条记录",
            categories: "数据类别"
        },
        categories: {
            all: "全部",
            id: "身份",
            finance: "金融",
            contact: "联系",
            internet: "互联网"
        },
        categoryTitles: {
            identity: "身份证件",
            financial: "金融数据",
            contactInfo: "联系信息",
            internetData: "互联网数据"
        },
        fields: {
            name: "全名",
            nationalId: "身份证号",
            passport: "护照号码",
            creditCard: "信用卡",
            cardType: "卡类型",
            bankAccount: "银行账户 / IBAN",
            mobile: "手机号码",
            postalCode: "邮政编码",
            email: "电子邮件地址",
            country: "国家"
        },
        cardTypes: {
            random: "随机",
            visa: "Visa",
            mastercard: "万事达卡",
            amex: "美国运通",
            discover: "Discover"
        },
        actions: {
            generate: "生成数据",
            generating: "生成中...",
            download: "下载",
            clear: "清除",
            copy: "复制"
        },
        output: {
            table: "表格",
            json: "JSON",
            csv: "CSV",
            noData: "尚未生成数据。配置选项并点击\"生成数据\"。"
        },
        messages: {
            success: "成功生成 {count} 条记录",
            errorGeneral: "生成数据时出错",
            errorQuantity: "请输入 1 到 10,000 之间的数量",
            errorNoFields: "请至少选择一个数据字段",
            noDataToCopy: "没有要复制的数据",
            noDataToDownload: "没有要下载的数据",
            cellCopied: "单元格已复制！",
            rowCopied: "行已复制！",
            tableCopied: "表格已复制！",
            jsonCopied: "JSON 已复制！",
            csvCopied: "CSV 已复制！",
            jsonDownloaded: "JSON 文件已下载",
            csvDownloaded: "CSV 文件已下载",
            failedToCopy: "复制失败"
        },
        info: {
            title: "信息",
            validation: "所有数据都通过验证算法",
            testing: "仅用于测试目的",
            clientSide: "客户端处理"
        },
        aria: {
            skipToMain: "跳转到主要内容",
            themeToggle: "更改主题",
            languageToggle: "更改语言",
            copyCell: "复制单元格值",
            copyRow: "复制行数据",
            copyTable: "复制整个表格",
            copyJson: "复制 JSON",
            copyCsv: "复制 CSV",
            generateButton: "生成测试数据",
            downloadJson: "下载为 JSON",
            downloadCsv: "下载为 CSV",
            clearData: "清除所有数据",
            configNav: "数据配置",
            outputSection: "生成的数据输出"
        },
        themes: {
            light: "浅色",
            dark: "深色",
            colorblind: "色盲友好"
        },
        menu: {
            title: "菜单",
            theme: "主题",
            selectTheme: "选择主题",
            language: "语言"
        },
        countries: {
            global: "全球",
            usa: "美国",
            uk: "英国",
            china: "中国",
            india: "印度",
            brazil: "巴西",
            germany: "德国",
            france: "法国",
            italy: "意大利",
            japan: "日本",
            mexico: "墨西哥",
            canada: "加拿大",
            australia: "澳大利亚",
            spain: "西班牙",
            ireland: "爱尔兰",
            argentina: "阿根廷"
        }
    }
};
