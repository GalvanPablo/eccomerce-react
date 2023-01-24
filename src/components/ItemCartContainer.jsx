import React from 'react'
import { useCarrito } from './CustomProvider'
import ItemList from './ItemList';



const ItemCartContainer = () => {
    const carrito = useCarrito();

    return (
        <div className="container w-full">
            <h1 className="text-2xl font-bold text-center">Carrito</h1>
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-28">
                <ItemList productos={carrito.listado} tipo="carrito"/>
            </div>
            <div className="fixed bottom-0 left-0 w-full z-10">
                <div className="w-[95%] xl:w-11/12 mx-auto bg-gray-600 rounded-t-lg p-5">
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center w-3/4 mx-auto">
                        <h4 className="text-white">Subtotal: <span>${new Intl.NumberFormat('de-DE').format(carrito.calcularTotal())}</span></h4>
                        <button className="flex flex-row justify-center gap-1 bg-gray-800 py-2 w-48 rounded-lg font-semibold outline-none select-none text-white hover:bg-blue-800/80">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCartContainer