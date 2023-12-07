"use client"
import useSWR from 'swr'
import axios from "axios";
import {Pedido} from "../../components/Pedido";
import { usePathname } from 'next/navigation'
import {useEffect, useState} from "react";
export default function Admin(){
    const pathname= usePathname()

    /*
     data: datos de la consulta al endpoint (lo que devuelve el endpoint)
     error: en caso de que haya un error
     isLoading: true mientras hace la consulta, false cuando finaliza
    * */
    const fetcher =()=>axios('/api/ordenes').then(datos => datos.data)//esta es la consulta, ya estoy extrayendo data
    //const {data}=await axios("/api/ordenes");
    //console.log(data)
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100}) //fetcher es una función

    return(
        <>
            <h1 className={"text-4xl font-black"}>Panel de administración</h1>
            <p className={"text-2xl my-10"}>Administra los pedidos</p>
            {data && data.length ? data.map((pedido) =>(
                <Pedido
                    key={pedido.id}
                    orden={pedido}
                />
            )) : <p>No hay pedidos aún</p>}
        </>
    )
}