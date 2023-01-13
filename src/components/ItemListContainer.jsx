import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { Block } from 'notiflix/build/notiflix-block-aio';

import ItemList from './ItemList'

function ItemListContainer() {
    const [cargado, setCargado] = useState(false)
    const [productos, setProductos] = useState([])

    const detallesVisualizacion = useParams()
    // console.log(detallesVisualizacion)

    useEffect(() => {
        Block.circle('.productos', 'Cargando productos...')
        fetch("../datos/productos.json")
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            setProductos(productos)
            setCargado(true)
            Block.remove('.productos')
        })
        .catch((error) => console.error(error))
    }, [])


    return (
        <section className="productos">
            {
                cargado ? 
                <>
                    <h2 className="font-semibold text-2xl">Productos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 js-element">
                        {
                            !detallesVisualizacion.hasOwnProperty('categoria') ?
                            <ItemList productos={productos}/>
                            : <ItemList productos={productos.filter(producto => producto.categoria === detallesVisualizacion.categoria)}/>
                        }
                    </div>
                </>
                : <></>
            }
            
        </section>
    )
}

export default ItemListContainer