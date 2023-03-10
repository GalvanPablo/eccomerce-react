import React from 'react'

import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useCarrito } from './CustomProvider'

import { Notify } from 'notiflix/build/notiflix-notify-aio';

function Item({producto}) {

    const carrito = useCarrito()

    const handleAgregarAlCarrito = () => {
        if(carrito.estaEnCarrito(producto)){
            Notify.info('El producto ya se encuentra en el carrito', {timeout: 2000, position: 'right-bottom'})
            return
        }
        const resultado = carrito.agregarProducto(producto, 1)
        if(resultado === 1 || resultado === 2){
            Notify.success('Se ha agregado al carrito', {timeout: 2000, position: 'right-bottom'});
        }else{
            Notify.failure('No se ha podido agregar al carrito', {timeout: 2000, position: 'right-bottom'});
        }
    }

    return (
        <article className="bg-white text-gray-700 w-64 min-h-[8rem] shadow-lg rounded-md overflow-hidden mx-auto">
            <img src={producto.imagenes[0]} alt="" className="w-auto h-auto object-cover p-2"/>
            <div className="p-5 flex-col gap-3">
                <Link to={"/producto/" + producto.id}>
                    <h3 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {producto.nombre.toUpperCase()}
                    </h3>
                    <p className="text-sm opacity-50 overflow-hidden whitespace-nowrap">
                        {producto.descripcion}
                    </p>
                </Link>
                <div className="mt-5 flex gap-2 justify-between">
                    <span className="text-lg font-bold">
                        $ {new Intl.NumberFormat('de-DE').format(producto.precio)}
                    </span>
                    {
                        producto.stock > 0 ?
                            <button className="flex justify-center items-center text-gray-800 hover:text-gray-800/80 transition rounded-full p-1" onClick={handleAgregarAlCarrito}>
                                <ShoppingBagIcon className="h-5" />
                            </button>
                        : null
                    }
                </div>
            </div>
        </article>
    )
}

export default Item