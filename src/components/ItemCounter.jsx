import React from 'react'

import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'

const ItemCounter = ({stock, actualizarCantidad, cant}) => {
    if(cant === undefined) cant = 1
    const [cantidad, setCantidad] = useState(cant)
    
    const sumarCantidad = (e) => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }
    const restarCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-row align-baseline select-none">
                <button name='sumar' onClick={restarCantidad}><MinusIcon className="w-5 h-auto"/></button>
                <input type="text" name="cantidad" id="cantidad" className="w-5 text-center bg-transparent" value={cantidad} onInput={actualizarCantidad(cantidad)} readOnly/>
                <button name='restar' onClick={sumarCantidad} className="text-2xl font-semibold"><PlusIcon className="w-5 h-autoz"/></button>
            </div>
            <p className="text-gray-400 select-none">({stock} {stock > 1 ? "disponibles" : "disponible"})</p>
        </div>
    )
}

export default ItemCounter