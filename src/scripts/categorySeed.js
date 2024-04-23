const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
    { id: 2, name: 'new-arrivals' },
    { id: 4, name: 'tees' },
    { id: 3, name: 'crewnecks' },
    { id: 5, name: 'electronics' },
    { id: 1, name: 'sports' }
];

async function categorySeed() {

    await Promise.all(categories.map(async (category) => {
        await prisma.category.create({
            data: {
                id: category.id,
                name: category.name
            }
        });
    }));

    console.log('Seed data inserted successfully');
}

async function main() {

    await categorySeed()
}

main().catch((err) => {

    console.error("An error occurred during seeding categories", err)

})