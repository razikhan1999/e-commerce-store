const { PrismaClient } = require('@prisma/client');

const mockData = [
    {
        "id": 2,
        "name": "oglasnik",
        "price": "20",
        "image": "oglasnik-logo.png",
        "categoryId": 1
    },
    {
        "id": 3,
        "name": "cricket bat",
        "price": "24",
        "image": "criecktBat.jpg",
        "categoryId": 1
    },
    {
        "id": 4,
        "name": "tennis ball",
        "price": "30",
        "image": "tennisBalljpg.jpg",
        "categoryId": 1
    },
    {
        "id": 5,
        "name": "football",
        "price": "50",
        "image": "footballjpg.jpg",
        "categoryId": 1
    },
    {
        "id": 6,
        "name": "laptop",
        "price": "40",
        "image": "laptopjpg.jpg",
        "categoryId": 5
    },
    {
        "id": 7,
        "name": "mobile",
        "price": "74",
        "image": "mobile.jpg",
        "categoryId": 5
    },
    {
        "id": 8,
        "name": "headphone",
        "price": "10",
        "image": "headphonejpg.jpg",
        "categoryId": 5
    },
    {
        "id": 9,
        "name": "red tee",
        "price": "35",
        "image": "redTee.jpg",
        "categoryId": 4
    },
    {
        "id": 10,
        "name": "white tee",
        "price": "80",
        "image": "whiteTeejpg.jpg",
        "categoryId": 4
    },
    {
        "id": 11,
        "name": "racket",
        "price": "45",
        "image": "racket.jpg",
        "categoryId": 1
    },
    {
        "id": 12,
        "name": "charger",
        "price": "80",
        "image": "charger.jpg",
        "categoryId": 5
    },
    {
        "id": 13,
        "name": "white tee",
        "price": "40",
        "image": "whiteTeejpg.jpg",
        "categoryId": 4
    },
]

const prisma = new PrismaClient();

async function seed() {
    try {
        // Iterate over the mock data and create records in the database
        for (const item of mockData) {
            await prisma.product.create({
                data: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    categoryId: item.categoryId
                }
            });
        }
        console.log('Seeder executed successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();