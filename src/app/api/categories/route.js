import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req){
    try {
      const resp = await prisma.category.findMany();
        return NextResponse.json({ data: resp, status: 200 });
      }
       catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.error('Failed to fetch categories', { status: 500 });
      }
    
}