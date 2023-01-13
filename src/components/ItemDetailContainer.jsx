import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { Block } from 'notiflix/build/notiflix-block-aio';

import ItemDetail from './ItemDetail'

function ItemDetailContainer() {
    const [cargado, setCargado] = useState(false)
    const [producto, setProducto] = useState({})

    const detallesVisualizacion = useParams()

    useEffect(() => {
        Block.circle('.producto', 'Cargando detalles del producto...')
        fetch("../datos/productos.json")
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            setProducto(productos.find(producto => producto.id.toString() === detallesVisualizacion.id))
            setCargado(true)
            Block.remove('.producto')
        })
        .catch((error) => console.error(error))
    }, [])


    return (
        <div className="container producto">
            {cargado ? <ItemDetail producto={producto}/> : <></>}
        </div>
    )
}

export default ItemDetailContainer