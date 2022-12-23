import React from 'react'

import {ShoppingBagIcon} from '@heroicons/react/24/solid'

function CartWidget() {
    return (
        <button className="text-center text-gray-700 transition relative hover:text-blue-800/80 py-3 px-4 mx-2">
            <div className="text-2xl">
                <ShoppingBagIcon className="h-6 w-6"/>
            </div>
            <span className="absolute right-1 top-1 w-5 h-5 rounded-full flex items-center justify-center bg-blue-800/80 text-white text-xs">0</span>
        </button>
    )
}

export default CartWidget