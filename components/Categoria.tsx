import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

export const Categoria = ({categoria}) => {
    const quioscoData = useQuiosco();
    if (!quioscoData) {
        return <div>Cargando...</div>; // O manejar el caso de datos nulos de alguna manera
    }
    const{categoriaActual, handleClickCategoria} = quioscoData;
    const  {nombre, icono, id}=categoria
    return (
        <div className={`${categoriaActual?.id === id ? "bg-amber-400" : "" } flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
            <Image width={50} height={50} src={`/assets/img/icono_${icono}.svg`} alt={"Imagen icono"} />
            <button
                onClick={() => handleClickCategoria(id)}
                type={"button"} className={"text-2xl font-bold hover:cursor-pointer text-start w-full"}>
                {nombre}
            </button>
        </div>
    );
};