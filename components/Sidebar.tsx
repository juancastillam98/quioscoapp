"use client"
import Image from "next/image";
import Logo from "../public/assets/img/logo.svg"
import useQuiosco from "../hooks/useQuiosco";
import {Categoria} from "../components/Categoria";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
export const Sidebar = () => {
    const quioscoData = useQuiosco();
    const pathname= usePathname()

    if (!quioscoData) {
        return <div>Cargando...</div>; // O manejar el caso de datos nulos de alguna manera
    }
    const  {categorias} = quioscoData;

    return (
        <>
            <Image width={300} height={100} src={Logo} alt={"Imagen logotipo"}/>
            {pathname !== "/admin" && (
                <nav id={"categorias"} className="mt-10 max-w-[95%]">
                    {categorias?.map(categoria =>(
                        <Categoria
                            key={categoria.id}
                            categoria={categoria}
                        />
                    ))}
                </nav>
            )}

        </>
    );
};