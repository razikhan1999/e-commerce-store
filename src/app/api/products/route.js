import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {

  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/uploads/${file.name}`;
  await writeFile(path, buffer);

  const resp = await prisma.Product.create({
    data: {
      name: data.get("product_name"),
      price: data.get("price"),
      categoryId: Number(data.get("category")),
      image: file.name,
    },
  });

  if (resp.ok) {
    const data = await resp.json();
    return NextResponse.json({ data }, { status: resp.status });
  }

  return NextResponse.json({ status: resp.status });
}

export async function GET(req) {
  const query = req.nextUrl.searchParams.get('query');
  const categories = req.nextUrl.searchParams.get('categories');
  const priceRanges = req.nextUrl.searchParams.get('priceRanges');
  const sortBy = req.nextUrl.searchParams.get('sort');
  const page = req.nextUrl.searchParams.get('currentPage');

  const priceRangeMapping = {
    '0': { gte: '0', lte: '25' },
    '25': { gte: '25', lte: '50' },
    '50': { gte: '50', lte: '75' },
    '75': { gte: '75', lte: null }, // Assuming '75+' means 75 and above
  };

  try {
    let whereClause = {};

    // Initialize an array to store all filter conditions
    const filterConditions = [];

    // Filter by query
    if (query) {
      filterConditions.push({
        name: {
          contains: query,
        },
      });
    }

    // Filter by categories
    if (categories) {
      const categoryArray = categories.split(',').map(Number);
      filterConditions.push({
        categoryId: {
          in: categoryArray,
        },
      });
    }

    // Filter by price ranges
    if (priceRanges) {
      const priceRangeArray = priceRanges.split(',');
      const priceRangeConditions = priceRangeArray.map(range => priceRangeMapping[range]);
      if (priceRangeConditions.length > 0) {
        // Combine price range conditions using logical OR
        const priceConditions = priceRangeConditions.map(condition => ({
          price: {
            gte: condition.gte,
            lte: condition.lte !== null ? condition.lte : undefined,
          },
        }));
        filterConditions.push({ OR: priceConditions });
      }
    }

    // Apply all filter conditions to the whereClause using logical AND for query and categories
    // and logical OR for price ranges
    whereClause = {
      AND: filterConditions,
    };
    // Sorting
    const orderBy = sortBy ? { [sortBy]: 'asc' } : undefined;

    const productsCount = await prisma.product.count({
      where: whereClause,
     });

     // Pagination
    const itemsPerPage = 4; // Number of items per page
    const skip = page ? (itemsPerPage * (parseInt(page) - 1)) : 0;
    const take = page ? itemsPerPage : undefined; // 

    const resp = await prisma.product.findMany({
      where: whereClause,
      skip: skip,
      take: take, // Use take only if a page number is provided
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: orderBy,
    });

    return NextResponse.json({ data: resp, count:productsCount, status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error('Failed to fetch products', { status: 500 });
  }

}
