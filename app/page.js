"use client";
import useQuiosco from "../hooks/useQuiosco";
import { Producto } from "../components/Producto";
import { ModalProducto } from "../components/ModalProducto";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
//Modal.setAppElement('#kioscoapp_nextjs');
export default function Home() {

    const quioscoData = useQuiosco();
    if (!quioscoData) {
        return <div>Cargando...</div>; // O manejar el caso de datos nulos de alguna manera
    }

    const { categoriaActual, modal } = quioscoData;

    return (
        <>
            <h1 className={"text-4xl font-black"}>{categoriaActual?.nombre}</h1>
            <p className={"text-2xl my-10"}>Personaliza tu pedido a continuación</p>
            <div className={"grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"}>
                {categoriaActual?.productos?.map((producto) => (
                    <Producto key={producto.id} producto={producto} />
                ))}
            </div>

            {/*Aquí implementamos el modal, es decir donde lo vamos a mostrar*/}
            {modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <ModalProducto />
                </Modal>
            )}
        </>
    );
}
