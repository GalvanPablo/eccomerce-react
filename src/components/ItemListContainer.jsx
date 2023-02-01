import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { Block } from 'notiflix/build/notiflix-block-aio'

import ItemList from './ItemList'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'


function ItemListContainer() {
    const [cargado, setCargado] = useState(false)
    const [productos, setProductos] = useState([])

    const detallesVisualizacion = useParams()
    // console.log(detallesVisualizacion)

    useEffect(() => {
        Block.circle('.productos', 'Cargando productos...')

        const productosCollection = collection(db, 'productos')
        const consulta = getDocs(!detallesVisualizacion.hasOwnProperty('categoria') ? productosCollection : query(productosCollection, where('categoria', '==', detallesVisualizacion.categoria)))

        consulta.then((respuesta) => {
            setProductos(respuesta.docs.map((doc) => ({...doc.data(), id: doc.id})))
            setCargado(true)
            
            Block.remove('.productos')
        })

        // fetch("../datos/productos.json")
        // .then((respuesta) => respuesta.json())
        // .then((productos) => {
        //     setProductos(productos)
        //     setCargado(true)
        //     Block.remove('.productos')
        // })
        // .catch((error) => console.error(error))
    }, [detallesVisualizacion])


    return (
        <section className="productos">
            {
                cargado ? 
                <>
                    <h2 className="font-semibold text-2xl">Productos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 js-element">
                        <ItemList productos={productos} tipo="catalogo"/>
                    </div>
                </>
                : null
            }
            
        </section>
    )
}

export default ItemListContainer