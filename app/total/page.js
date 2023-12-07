"use client"
import {useEffect, useCallback} from "react";
import useQuiosco from "../../hooks/useQuiosco";
import {formatearDinero} from "../../helpers";
export default  function Total(){
    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco();
    //usamos useCallback porque tiene memoria. Ideal para comprobar no si se ha hecho cambioos, sino para comprobar si tenía o no algo el array
    //no es lo mismo comprobar si se ha modificado algo, a comprobar si antes tenía algo y ahora no.
    const comprobarPedido = useCallback( ()=>{
        return pedido.length ===0 || nombre === "" || nombre.length < 2 //decuelve true si la cantidad de elementos es 0
    }, [pedido, nombre]);

    useEffect(()=>{
        comprobarPedido();
    },[pedido, comprobarPedido()])



    return(
        <>
            <h1 className={"text-4xl font-black"}>Total</h1>
            <p className={"text-2xl my-10"}>Confirma tu pedido</p>
            <form onSubmit={colocarOrden}>
                <div>
                    <label
                        htmlFor={"nombre"}
                        className={"block uppercase w-full lg:w-1/3 text-slade-800 font-bold text-xl"}>Nombre</label>
                    <input
                        type={"text"}
                        id={"nombre"}
                        className={"bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"}
                        value={nombre}
                        onChange={event => setNombre(event.target.value)}
                    />
                </div>
                <div className={"mt-10"}>
                    <p className={"text-2xl"}>Total a pagar: {""} <span className={"font-bold"}> {formatearDinero(total)}</span></p>
                </div>
                <div className={"mt-5"}>
                    <input
                        type={"submit"}
                        value={"Confirmar Pedido"}
                        className={`${comprobarPedido() ? "bg-indigo-100" : "bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer" } 
                        w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </>
    )
}