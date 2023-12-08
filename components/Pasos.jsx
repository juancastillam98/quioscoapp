"use client"
import { useRouter, usePathname} from "next/navigation";
const pasos =[//este array va a definir los pasos para finalizar la compra
    {paso: 1, nombre: "Menú", url:"/"},
    {paso: 2, nombre: "Resumen", url:"/resumen"},
    {paso: 3, nombre: "Datos y Total", url:"/total"},
]
export const Pasos = () => {
    const router = useRouter()
    const pathname = usePathname();
    const calcularProgreso =()=>{
        //return (paso/3) *100;
        let valor;
        /*if (paso===1){ esto está bien pero es mejor usar la ruta en la que nos ubiquemos porque si no,
            valor = 2;      cada vez que recarguemos se pierde
        }else if(paso===2){
            valor = 50;
        }else{
            valor=100;
        }*/
        if (pathname==="/"){
            valor = 2;
        }else if(pathname==="/resumen"){
            valor = 50;
        }else{
            valor=100;
        }

        return valor;

    }
    return (
        <>
            <div className={"flex justify-between mb-5"}>
                {pasos?.map((paso) =>(
                    <button
                        onClick={()=>{
                            router.push(paso.url);
                        }}
                        className={"text-2xl font-bold"}
                        key={paso.paso}>
                        {paso.nombre}
                    </button>
                ))}
            </div>
            <div className={"bg-gray-100 mb-10 "}>
                {/**Está dentro de un style para poder calcular el porcentaje*/}
                <div className={"rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10"}
                     style={{width: `${calcularProgreso()}%`}}></div>
            </div>
        </>
    );
};