import React from 'react'

import { HeartIcon} from '@heroicons/react/24/solid'

function Item({imagen, nombre, descripcion, precio}) {
    return (
        <article className="bg-white text-gray-700 w-72 min-h-[8rem] shadow-lg rounded-md overflow-hidden">
            <img src={imagen} alt="" className="w-full h-full object-cover"/>
            <div className="p-5 flex-col gap-3">
                <a href="#detalleProducto">
                    <h3 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {nombre.toUpperCase()}
                    </h3>
                    <p className="text-sm opacity-50">
                        {descripcion}
                    </p>
                </a>
                <div className="mt-5 flex gap-2 justify-between">
                    <span className="text-lg font-bold">
                        ${precio}
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