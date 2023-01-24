import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useCarrito } from './CustomProvider'
import ItemCounter from './ItemCounter'

const ItemCart = ({producto, cantidad}) => {
    const [cant, setCant] = useState(cantidad)
    
    const carrito = useCarrito()

    const handleEliminar = () =>{
        carrito.eliminarProducto(producto)
    }

    const handleCantidad = (canti) =>{
        setCant(canti)
    }

    const modificarCantidad = () =>{
        carrito.modificarCantidad(producto, cant)
    }

    if(cant !== cantidad) modificarCantidad(cant)

    return (
        <div className="bg-gray-100 rounded-md mx-auto md:w-full py-2 px-3">
            <div className="w-full flex flex-row">
                <Link to={"/producto/" + producto.id} className="w-full font-bold xl:text-lg">{producto.nombre.toUpperCase()}</Link>
                <button onClick={handleEliminar}><XMarkIcon className="w-6 h-auto text-gray-800 hover:text-red-800"/></button>
            </div>
            <div className="flex flex-row justify-start">
                <img src={producto.imagenes[0]} alt={producto.nombre} className="h-24 w-auto my-auto xl:h-28"/>
                <div className="w-full flex flex-col justify-center items-center gap-1 px-4">
                    <ItemCounter stock={producto.stock} actualizarCantidad={handleCantidad} cant={cantidad}/>
                    <h4 className="text-lg xl:text-xl font-semibold">$ {new Intl.NumberFormat('de-DE').format(producto.precio * cant)}</h4>
                </div>
            </div>
        </div>
    )
}

export default ItemCart