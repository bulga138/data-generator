const firstNames = {
    canada: {
        female: ['Olivia', 'Emma', 'Amelia', 'Sophia', 'Charlotte', 'Ava', 'Chloe', 'Mia', 'Isla', 'Lily'],
        male: ['Liam', 'Noah', 'Jackson', 'Lucas', 'Oliver', 'Benjamin', 'Leo', 'Theodore', 'William', 'Jack']
    },
    usa: {
        female: ['Olivia', 'Emma', 'Amelia', 'Charlotte', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Evelyn', 'Harper'],
        male: ['Liam', 'Noah', 'Oliver', 'James', 'Elijah', 'Mateo', 'Theodore', 'Henry', 'Lucas', 'William']
    },
    germany: {
        female: ['Emilia', 'Hannah', 'Mia', 'Emma', 'Sophia', 'Lina', 'Mila', 'Lea', 'Marie', 'Ella'],
        male: ['Noah', 'Leon', 'Paul', 'Elias', 'Felix', 'Emil', 'Jonas', 'Henry', 'Luis', 'Max']
    },
    france: {
        female: ['Emma', 'Jade', 'Louise', 'Alice', 'Chloé', 'Lina', 'Rose', 'Léa', 'Anna', 'Mila'],
        male: ['Gabriel', 'Léo', 'Raphaël', 'Louis', 'Arthur', 'Jules', 'Maël', 'Noah', 'Adam', 'Lucas']
    },
    italy: {
        female: ['Sofia', 'Giulia', 'Aurora', 'Ginevra', 'Alice', 'Beatrice', 'Emma', 'Giorgia', 'Vittoria', 'Matilde'],
        male: ['Leonardo', 'Alessandro', 'Tommaso', 'Mattia', 'Lorenzo', 'Gabriele', 'Riccardo', 'Edoardo', 'Francesco', 'Andrea']
    },
    japan: {
        female: ['Yui', 'Himari', 'Rio', 'Mei', 'Ema', 'Sakura', 'Aoi', 'Hana', 'Riko', 'Ichika'],
        male: ['Haruto', 'Ren', 'Minato', 'Riku', 'Yuto', 'Sota', 'Yuma', 'Haruki', 'Itsuki', 'Aoi']
    },
    mexico: {
        female: ['Sofía', 'Regina', 'Valentina', 'Victoria', 'Isabella', 'Camila', 'Emma', 'Julieta', 'Romina', 'Emily'],
        male: ['Santiago', 'Mateo', 'Diego', 'Leonardo', 'Emiliano', 'Sebastián', 'Daniel', 'Gael', 'Alejandro', 'Isaac']
    },
    australia: {
        female: ['Isla', 'Charlotte', 'Olivia', 'Amelia', 'Mia', 'Ava', 'Matilda', 'Ella', 'Grace', 'Willow'],
        male: ['Oliver', 'Noah', 'Leo', 'William', 'Henry', 'Lucas', 'Jack', 'Theodore', 'Hudson', 'Thomas']
    },
    brazil: {
        female: ['Helena', 'Alice', 'Laura', 'Manuela', 'Sophia', 'Valentina', 'Heloísa', 'Giulia', 'Maria', 'Isabelly'],
        male: ['Miguel', 'Arthur', 'Heitor', 'Theo', 'Davi', 'Bernardo', 'Gabriel', 'Pedro', 'Gael', 'Samuel']
    },
    india: {
        female: ['Aadhya', 'Saanvi', 'Diya', 'Ananya', 'Aarohi', 'Myra', 'Siya', 'Khushi', 'Navya', 'Kavya'],
        male: ['Aarav', 'Vivaan', 'Vihaan', 'Arjun', 'Aditya', 'Reyansh', 'Krishna', 'Ishaan', 'Atharv', 'Mohammad']
    },
    china: {
        female: ['Li', 'Fang', 'Jing', 'Yan', 'Ling', 'Na', 'Ying', 'Hui', 'Juan', 'Xia'],
        male: ['Wei', 'Jie', 'Jun', 'Yong', 'Lei', 'Ming', 'Tao', 'Qiang', 'Hao', 'Bin']
    },
    uk: {
        female: ['Olivia', 'Amelia', 'Lily', 'Isla', 'Freya', 'Ava', 'Florence', 'Sophia', 'Mia', 'Ivy'],
        male: ['Muhammad', 'Noah', 'Oliver', 'George', 'Leo', 'Arthur', 'Luca', 'Theodore', 'Oscar', 'Henry']
    },
    global: {
        female: ['Maria', 'Nushi', 'Mohammed', 'Jose', 'Muhammad', 'Mohamed', 'Wei', 'Mohammad', 'Ahmed', 'Yan'],
        male: ['Maria', 'Nushi', 'Mohammed', 'Jose', 'Muhammad', 'Mohamed', 'Wei', 'Mohammad', 'Ahmed', 'Yan']
    }
};

const lastNames = {
    canada: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Gagnon', 'Lee', 'Wilson', 'Johnson', 'MacDonald'],
    usa: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'],
    germany: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'],
    france: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau'],
    italy: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco'],
    japan: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato'],
    mexico: ['García', 'Rodríguez', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Cruz'],
    australia: ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Wilson', 'Nguyen', 'Martin', 'Thomas', 'Anderson'],
    brazil: ['Silva', 'Santos', 'Souza', 'Oliveira', 'Pereira', 'Lima', 'Carvalho', 'Gomes', 'Costa', 'Rodrigues'],
    india: ['Singh', 'Kumar', 'Sharma', 'Patel', 'Gupta', 'Khan', 'Das', 'Reddy', 'Yadav', 'Mehta'],
    china: ['Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou'],
    uk: ['Smith', 'Jones', 'Williams', 'Brown', 'Taylor', 'Wilson', 'Davies', 'Evans', 'Thomas', 'Roberts'],
    global: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
};

/**
 * Get a random item from an array
 * @param {Array} arr - The array to pick from
 * @returns {*} The random item
 */
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a first name
 * @param {string} country - The country code
 * @param {string} gender - 'male' or 'female' (optional, random if not provided)
 * @returns {string} A first name
 */
export function generateFirstName(country, gender) {
    const countryData = firstNames[country] || firstNames.global;
    
    if (!gender) {
        gender = Math.random() > 0.5 ? 'male' : 'female';
    }
    
    const names = countryData[gender] || countryData.male; // Fallback to male if gender invalid
    return getRandomItem(names);
}

/**
 * Generate a last name
 * @param {string} country - The country code
 * @returns {string} A last name
 */
export function generateLastName(country) {
    const names = lastNames[country] || lastNames.global;
    return getRandomItem(names);
}

/**
 * Generate a full name
 * @param {string} country - The country code
 * @param {string} gender - 'male' or 'female' (optional)
 * @returns {string} A full name
 */
export function generateFullName(country, gender) {
    return `${generateFirstName(country, gender)} ${generateLastName(country)}`;
}
