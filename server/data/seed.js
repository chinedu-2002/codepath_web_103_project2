const pool = require('../config/database');

const createTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS foods;

        CREATE TABLE IF NOT EXISTS foods (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(100) UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            ingredients TEXT NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

const seedFoods = async () => {
    const foods = [
        {
            slug: 'jollof-rice',
            name: 'Jollof Rice',
            country: 'Nigeria',
            image: 'https://www.themealdb.com/images/media/meals/fk80jp1763280767.jpg',
            description: 'A one-pot rice dish cooked in a rich, spicy tomato sauce. It is one of the most popular dishes in West Africa, and every country claims theirs is the best!',
            ingredients: 'Rice, tomatoes, onions, peppers, spices, oil'
        },
        {
            slug: 'sushi',
            name: 'Sushi',
            country: 'Japan',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/1200px-Sushi_platter.jpg',
            description: 'A Japanese dish made with seasoned rice, fresh fish, and seaweed. It can be rolled, pressed, or served as a slice of fish on top of rice.',
            ingredients: 'Rice, fish, seaweed, rice vinegar, soy sauce'
        },
        {
            slug: 'tacos',
            name: 'Tacos',
            country: 'Mexico',
            image: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
            description: 'A traditional Mexican dish made with a small tortilla filled with meat, salsa, and toppings. Street tacos are famous worldwide for their bold flavors.',
            ingredients: 'Tortilla, meat, salsa, onions, cilantro, lime'
        },
        {
            slug: 'pizza-margherita',
            name: 'Pizza Margherita',
            country: 'Italy',
            image: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',

            description: 'A classic Italian pizza topped with tomato sauce, fresh mozzarella cheese, and basil. It was named after Queen Margherita of Italy in 1889.',
            ingredients: 'Dough, tomato sauce, mozzarella, basil, olive oil'
        },
        {
            slug: 'pad-thai',
            name: 'Pad Thai',
            country: 'Thailand',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg/1200px-Phat_Thai_kung_Chang_Khien_street_stall.jpg',
            description: 'A stir-fried noodle dish that is one of Thailand\'s national dishes. It is sweet, sour, and savory all at the same time.',
            ingredients: 'Rice noodles, shrimp, peanuts, egg, bean sprouts, lime'
        },
        {
            slug: 'croissant',
            name: 'Croissant',
            country: 'France',
            image: 'https://www.themealdb.com/images/media/meals/7mxnzz1593350801.jpg',
            description: 'A flaky, buttery pastry that is a staple of French breakfasts. The dough is layered with butter and folded many times to create its signature puffy layers.',
            ingredients: 'Flour, butter, yeast, sugar, salt, milk'
        }
    ];

    const insertQuery = `
        INSERT INTO foods (slug, name, country, image, description, ingredients)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const food of foods) {
        try {
            await pool.query(insertQuery, [
                food.slug, food.name, food.country,
                food.image, food.description, food.ingredients
            ]);
            console.log(`Inserted: ${food.name}`);
        } catch (err) {
            console.error(`Error inserting ${food.name}:`, err);
        }
    }
};

const seed = async () => {
    await createTable();
    await seedFoods();
    pool.end();
    console.log('Seeding complete!');
};

seed();
