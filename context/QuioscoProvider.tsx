'use client'

import {useState, useEffect, createContext} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
//para poder utilizar la alerta
export const QuioscoContext = createContext({});

export default function QuioscoProvider({children}){

    const [categorias, setCategorias] =useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})//este es el producto que se colocará en el modal
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState("")
    const [total, setTotal] = useState(0)
    const [paginaLista, setPaginaLista] = useState(false)
    const router = useRouter();

    useEffect( ()=>{
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])
    useEffect(()=>{
        obtenerCategorias()
    },[])
    useEffect(()=>{
        setCategoriaActual(categorias[0])//cada categoría es un objeto (ver db, es un json)
    }, [categorias])

    useEffect(()=>{
        setPaginaLista(true)
    }, [])

    const obtenerCategorias = async ()=>{
        const {data}=await axios("/api/categorias");//es un objeto. Concretamente un array de objetos
        console.log(data)
        setCategorias(data)
    }
    const handleClickCategoria = id=>{
        const categoria = categorias.filter(c =>c.id===id)//obtengo la categoria seleccionada
        setCategoriaActual(categoria[0])
        router.push("/")
    }
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleChangeModal = ()=>{
        setModal(!modal)
        console.log(modal)
    }
    //recuerda que producto es un objeto { producto  cantidad}. Esto es como estaba antes.
    //categoriaId, ...producto} esto lo que hace es sacar categoriaId, imagen, y sacar una copia del objeto en sí.
    //Esto se hace para pasarle solamente producto
    const handleAgregarPedido = ({categoriaId, ...producto})=>{
        //1º comprobamos si el producto ya está agregado.
        if (pedido.some(productoState => productoState.id === producto.id)){
            //2º en caso de que exista, actualizar la cantidad. Para ello tenemos que recorrenos los pedidos, comprobar de nuevo el producto.
            // Como ya existe, lo devolvemos entero de nuevo (porque al devolverlo de nuevo lo devolvemos con la canitdad nueva) y si no se queda igual
            const pedidoActualizado = pedido.map(productoState=>productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado)
            toast.success("Guardado correctamente")

        }else {
            setPedido([...pedido, producto])//acualiza el array de pedido. (pedio += pedido)
            toast.success("Agregado al pedido", {autoClose: 1500});
        }
        setModal(false)
    }

    const handleEditarCantidades = id =>{
        //extraemos el producto del pedido
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        handleChangeModal();//devuelve setModal(!modal)
    }
    const handleEliminarProduct = id =>{
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)//sacando todos los productos distintos al seleccionado, es suficiente
        setPedido(pedidoActualizado)
    }
    const colocarOrden = async (e)=>{ //es asíncrona porque va a interactura directamente con la bd
        e.preventDefault();
        try {
            //debe corresponder con el esquema de prisma
            await axios.post("/api/ordenes", {
                fecha: Date.now().toString(),
                total,
                nombre,
                pedido
            });
            //resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre("")
            setTotal(0)
            toast.success("Pedido realizado correctamente")
            setTimeout(()=>{
                router.push("/")
            }, 2000)
        }catch (error){
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider value={
            {
            categorias, categoriaActual,
            handleClickCategoria,
            producto, handleSetProducto,
            modal, handleChangeModal,
            handleAgregarPedido, pedido,
            handleEditarCantidades,
            handleEliminarProduct,
            nombre, setNombre,
            colocarOrden, total
        }}>
            {children}
        </QuioscoContext.Provider>
    );
};
