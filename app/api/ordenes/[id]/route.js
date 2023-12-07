import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
export async function POST(request, {params}){
    const prisma = new PrismaClient();
    const {id}=params;
    //const body = await request.query.id;
    console.log(id);
    const ordenActualizada = await prisma.orden.update({
        where: {
            id: parseInt(id)
        },
        data:{
            estado: true
        }
    })
    return NextResponse.json({ordenActualizada})
}