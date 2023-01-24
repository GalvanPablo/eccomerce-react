import React, { useState } from 'react'

import ImageCarrousel from './ImageCarrousel'

import { ShoppingBagIcon, ShoppingCartIcon, ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useCarrito } from './CustomProvider'

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ItemCounter from './ItemCounter'

function ItemDetail({producto}) {

    const volver = () => {window.history.back()}

    const carrito = useCarrito();

    const [cantidad, setCantidad] = useState()

    const handleAgregarACarrito = () =>{

        const respuesta = carrito.agregarProducto(producto, cantidad)
        switch (respuesta){
            case 1:
                Notify.success('Se ha agregado al carrito', {timeout: 2000, position: 'right-bottom'});
                break;
            case 2:
                Notify.info('Se ha modificado la cantidad', {timeout: 2000, position: 'right-bottom'});
                break;
            default:
                Notify.failure('No se ha podido agregar al carrito', {timeout: 2000, position: 'right-bottom'});
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:mt-16 md:gap-5">
            
            <ImageCarrousel imagenes={producto.imagenes}/>
            <div className="flex flex-col gap-3 w-full md:border-l-[1px] border-gray-800/30 px-4 md:px-8">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold">{producto.nombre.toUpperCase()}</h2>
                    <button onClick={volver} className="hidden md:flex flex-row items-center font-semibold hover:text-blue-800/80 select-none"><ArrowLongLeftIcon className="w-5"/>Volver</button>
                </div>
                <p className="md:py-7">{producto.descripcion}</p>
                <h3 className="text-2xl font-bold">${new Intl.NumberFormat('de-DE').format(producto.precio)}</h3>


                {
                    producto.stock > 0 ?
                    <>
                        <ItemCounter stock={producto.stock} actualizarCantidad={setCantidad}/>
                        <div className="flex flex-row gap-2 md:flex-col md:w-min">
                            <button className="flex flex-row justify-center gap-1 bg-gray-800 py-2 w-48 m-auto rounded-lg font-semibold outline-none select-none text-white hover:bg-blue-800/80">
                                <ShoppingBagIcon className="w-6"/> Comprar ahora
                            </button>
                            <button onClick={handleAgregarACarrito} className="flex flex-row justify-center gap-1 bg-gray-400 py-2 w-48 m-auto rounded-lg font-semibold outline-none select-none text-gray-800 hover:bg-blue-800/60">
                                <ShoppingCartIcon className="w-6"/> Agregar al carrito
                            </button>
                        </div>
                    </>
                    : <p className="text-red-600 font-semibold">No hay stock disponible</p>
                }
                

                
            </div>
        </div>
    )
}

export default ItemDetail