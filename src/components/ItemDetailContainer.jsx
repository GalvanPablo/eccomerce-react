import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { Block } from 'notiflix/build/notiflix-block-aio';

import ItemDetail from './ItemDetail'

import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function ItemDetailContainer() {
    const [cargado, setCargado] = useState(false)
    const [producto, setProducto] = useState({})

    const detallesVisualizacion = useParams()

    useEffect(() => {
        Block.circle('.producto', 'Cargando detalles del producto...')

        const productosCollection = collection(db, 'productos')
        const referencia = doc(productosCollection, detallesVisualizacion.id)
        const consulta = getDoc(referencia)
        consulta.then((respuesta) => {
            setProducto({...respuesta.data(), id: respuesta.id})
            setCargado(true)
            Block.remove('.producto')
        })
        .catch((error) => console.error(error))

        // fetch("../datos/productos.json")
        // .then((respuesta) => respuesta.json())
        // .then((productos) => {
        //     setProducto(productos.find(producto => producto.id.toString() === detallesVisualizacion.id))
        //     setCargado(true)
        //     Block.remove('.producto')
        // })
        // .catch((error) => console.error(error))
    }, [])


    return (
        <div className="container producto">
            {cargado ? <ItemDetail producto={producto}/> : <></>}
        </div>
    )
}

export default ItemDetailContainer