import { GET } from './route'; // Import the GET function from your module
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import { NextResponse } from 'next/server';

// Mock PrismaClient instance
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    product: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe('GET Function Tests', () => {
  let prisma;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should return products with correct filters', async () => {
    // Mock req object
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams({
          query: 'keyword',
          categories: '1,2,3',
          priceRanges: '25,50',
          sort: 'price',
          currentPage: '1',
        }),
      },
    };

    // Mock the database responses
    prisma.product.count.mockResolvedValueOnce(10); // Assuming there are 10 products in total
    prisma.product.findMany.mockResolvedValueOnce([
      { id: 1, name: 'Product 1', price: 20, categoryId: 1 },
      { id: 2, name: 'Product 2', price: 30, categoryId: 2 },
      { id: 3, name: 'Product 3', price: 40, categoryId: 3 },
      // Add more mock products as needed
      
    ]);

    // Call the GET function
    const response = await GET(req);

    // Assert the response
    expect(response).toEqual(
      NextResponse.json({
        data: [
            {
                "id": 2,
                "name": "oglasnik",
                "price": "20",
                "image": "oglasnik-logo.png",
                "categoryId": 1,
                "category": {
                    "name": "sports"
                }
            },
            {
                "id": 3,
                "name": "cricket bat",
                "price": "24",
                "image": "criecktBat.jpg",
                "categoryId": 1,
                "category": {
                    "name": "sports"
                }
            },
            {
                "id": 4,
                "name": "tennis ball",
                "price": "30",
                "image": "tennisBalljpg.jpg",
                "categoryId": 1,
                "category": {
                    "name": "sports"
                }
            },
          // Add more expected products as needed
        ],
        count: 13, // Assuming there are 13 products in total
        status: 200,
      })
    );

    // Verify database calls
    expect(prisma.product.count).toHaveBeenCalledTimes(1);
    expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            name: {
              contains: 'keyword',
            },
          },
          {
            categoryId: {
              in: [1, 2, 3],
            },
          },
          {
            OR: [
              { price: { gte: '25', lte: '50' } },
              // Add more price range conditions as needed
            ],
          },
        ],
      },
      skip: 0,
      take: 4, // Assuming 4 items per page
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { price: 'asc' },
    });
  });

  // Add more test cases as needed for different scenarios
});
