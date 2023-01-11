import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import ItemList from './ItemList'

function ItemListContainer() {
    const [cargado, setCargado] = useState(false)
    const [productos, setProductos] = useState([])

    const detallesVisualizacion = useParams()
    console.log(detallesVisualizacion)

    useEffect(() => {
        fetch("../datos/productos.json")
        .then((respuesta) => {
            console.log(respuesta)
            return respuesta.json()
        })
        .then((productos) => {
            setProductos(productos)
            setCargado(true)
        })
        .catch((error) => console.error(error))
    }, [])

    return (
        <section>
            <h2 className="font-semibold text-2xl">Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                {!cargado ? 
                    <p>Cargando...</p>
                    : !detallesVisualizacion.hasOwnProperty('categoria') ?
                        <ItemList productos={productos}/>
                        : <ItemList productos={productos.filter(producto => producto.categoria === detallesVisualizacion.categoria)}/>
                }
            </div>
        </section>
    )
}

export default ItemListContainer