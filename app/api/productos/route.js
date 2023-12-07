import {PrismaClient} from "@prisma/client";
import { NextResponse } from 'next/server'
export async function GET(request) {
    const prisma = new PrismaClient();
    const productos = await prisma.producto.findMany({});
    return NextResponse.json(productos);
}