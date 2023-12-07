"use client"
import useQuiosco from "../../hooks/useQuiosco";
import {ResumenPedido} from "../../components/ResumenPedido";
import Modal from "react-modal";
import {ModalProducto} from "../../components/ModalProducto";

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
Modal.setAppElement('#kioscoapp_nextjs');
export default  function Resumen(){
    const quioscoData = useQuiosco();
    if (!quioscoData) {
        return <div>Cargando...</div>; // O manejar el caso de datos nulos de alguna manera
    }
    const {pedido, categoriaActual, modal}=quioscoData
    return (
        <>
            <h1 className={"text-4xl font-black"}>Resumen</h1>
            <p className={"text-2xl my-10"}>Revisa tu pedido</p>

            {pedido.length === 0 ? (
                <p className={"text-center text-2xl"}>No has agregado nada</p>
            ) : (
                pedido.map(producto  =>(
                    <ResumenPedido
                        key={producto.id}
                        producto={producto}
                    />
                ))
            )}
            {modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <ModalProducto />
                </Modal>
            )}
        </>
    )
}