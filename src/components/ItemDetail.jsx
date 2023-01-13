import React from 'react'

import { useState } from 'react'
import ImageCarrousel from './ImageCarrousel'

import {PlusIcon, MinusIcon, ShoppingBagIcon, ShoppingCartIcon} from '@heroicons/react/24/solid'

function ItemDetail({producto}) {

    const [cantidad, setCantidad] = useState(1)
    const sumarCantidad = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1)
        }
    }
    const restarCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    console.log()

    return (
        <div className="flex flex-col md:flex-row md:mt-16 md:gap-5">
            <ImageCarrousel imagenes={producto.imagenes}/>
            <div className="flex flex-col gap-3 w-full md:border-l-[1px] border-gray-800/30 px-4 md:px-8">

                <h2 className="text-2xl font-bold">{producto.nombre.toUpperCase()}</h2>
                <p className="md:py-7">{producto.descripcion}</p>
                <h3 className="text-2xl font-bold">${new Intl.NumberFormat('de-DE').format(producto.precio)}</h3>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-row align-baseline">
                        <button><MinusIcon className="w-5 h-auto" onClick={restarCantidad}/></button>
                        <input type="text" name="cantidad" id="cantidad" className="w-5 text-center" value={cantidad} readOnly/>
                        <button><PlusIcon className="w-5 h-auto" onClick={sumarCantidad}/></button>
                    </div>
                    <p className="text-gray-400">({producto.stock} disponibles)</p>
                </div>
                
                <div className="flex flex-row gap-2 md:flex-col md:w-min">
                    <button className="flex flex-row justify-center gap-1 bg-gray-800 py-2 w-48 m-auto rounded-lg font-semibold outline-none text-white hover:bg-blue-800/80">
                        <ShoppingBagIcon className="w-6"/> Comprar ahora
                    </button>
                    <button className="flex flex-row justify-center gap-1 bg-gray-400 py-2 w-48 m-auto rounded-lg font-semibold outline-none text-gray-800 hover:bg-blue-800/60">
                        <ShoppingCartIcon className="w-6"/> Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail