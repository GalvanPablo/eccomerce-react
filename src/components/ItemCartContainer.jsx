import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCarrito } from './CustomProvider'
import ItemList from './ItemList';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';



const ItemCartContainer = () => {
    const Navigate = useNavigate();
    const carrito = useCarrito();

    const handleComprar = () => {
        if(carrito.listado.length > 0){
            Navigate("/checkout")
        }else{
            Notify.failure("No hay productos en el carrito", {timeout: 2000, position: 'center-center'})
        }
    }

    return (
        <div className="container w-full">
            <h1 className="text-2xl font-bold text-center">Carrito</h1>
            {
                carrito.listado.length > 0 ?
                    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-28">
                        <ItemList productos={carrito.listado} tipo="carrito"/>
                    </div>
                    : <div className="flex flex-col justify-center items-center h-[60vh]">
                        <ShoppingCartIcon className="w-20 h-20 mx-auto"/>
                        <h2 className="text-center text-2xl font-semibold">El carrito esta vacio</h2>
                    </div>
            }
            
            <div className="fixed bottom-0 left-0 w-full z-10">
                <div className="w-[95%] xl:w-11/12 mx-auto bg-gray-600 rounded-t-lg p-5">
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center w-3/4 mx-auto">
                        <h4 className="text-white text-lg font-medium">Total <span>${new Intl.NumberFormat('de-DE').format(carrito.calcularTotal())}</span></h4>
                        <div className="flex flex-col items-center md:flex-row gap-5">
                            {
                                carrito.listado.length > 0 ?
                                <button className="text-white hover:text-red-800" onClick={carrito.vaciarCarrito}>
                                    <TrashIcon className="w-6 h-6"/>
                                </button>
                                : null
                            }
                            <button onClick={handleComprar}
                            className="flex flex-row justify-center gap-1 bg-gray-800 py-2 w-48 rounded-lg font-semibold outline-none select-none text-white hover:bg-blue-800/80">
                                Confirmar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCartContainer