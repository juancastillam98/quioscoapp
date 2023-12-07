"use client"
import Image from "next/image";
import Logo from "../public/assets/img/logo.svg"
import useQuiosco from "../hooks/useQuiosco";
import {Categoria} from "../components/Categoria";
import {usePathname} from "next/navigation";
export const Sidebar = () => {
    const pathname= usePathname()
    const {categorias} = useQuiosco();

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