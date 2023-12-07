import { NextResponse } from 'next/server'
import {PrismaClient} from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    //queremos que nos devuelva aquellas que no han sido marcadas como false
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    });
    return NextResponse.json(ordenes);

}

export async function POST(request){
    //console.log(NextResponse.json(request.body))
    const body = await request.json();
    //console.log(body);

    const prisma = new PrismaClient();
     //orden es la tabla, La table se llama Orden, pero aquí hay que ponerlas en minúsculas
     const orden = await prisma.orden.create({
       data:{
        nombre : body.nombre,
        total : body.total,
        fecha : body.fecha,
        pedido: body.pedido
       },
     })
        return NextResponse.json({orden});
}
