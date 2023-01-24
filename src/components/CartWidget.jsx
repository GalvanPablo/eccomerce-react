import React from 'react'

import {Link} from 'react-router-dom'

import {ShoppingCartIcon} from '@heroicons/react/24/solid'

import {useCarrito} from './CustomProvider'

function CartWidget() {
    const carrito = useCarrito()

    return (
        <Link to="/carrito" className="text-center text-gray-700 transition relative hover:text-blue-800/80 py-3 px-4 mx-2">
            <ShoppingCartIcon className="h-6 w-6"/>
            <span className="absolute right-1 top-1 w-5 h-5 rounded-full flex items-center justify-center bg-blue-800/80 text-white text-xs">{carrito.listado.length}</span>
        </Link>
    )
}

export default CartWidget