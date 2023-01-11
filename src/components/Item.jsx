import React from 'react'

import { HeartIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function Item({producto}) {
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
                        ${producto.precio}
                    </span>
                    <button className="flex justify-center items-center bg-gray-800 hover:bg-gray-800/80 transition rounded-full p-1">
                        <HeartIcon className="h-5 text-white" />
                    </button>
                </div>
            </div>
        </article>
    )
}

export default Item