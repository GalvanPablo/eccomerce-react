import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { Block } from 'notiflix/build/notiflix-block-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

import ItemDetail from './ItemDetail'

import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

import { useNavigate } from 'react-router-dom'

function ItemDetailContainer() {
    const navigate = useNavigate()

    const [cargado, setCargado] = useState(false)
    const [producto, setProducto] = useState({})

    const detallesVisualizacion = useParams()

    useEffect(() => {
        Block.circle('.producto', 'Cargando detalles del producto...')

        const productosCollection = collection(db, 'productos')
        const referencia = doc(productosCollection, detallesVisualizacion.id)
        const consulta = getDoc(referencia)
        consulta.then((respuesta) => {
            if(respuesta.data() === undefined) {
                Report.warning(
                    'Producto no encontrado',
                    'Es probable que el producto no exista o haya sido eliminado',
                    'Aceptar',
                    navigate('/')
                );
            }
            setProducto({...respuesta.data(), id: respuesta.id})
            setCargado(true)
            Block.remove('.producto')
        })
        .catch((error) => {
            Report.failure(
                'Error al cargar el producto',
                'Por favor intente de nuevo mas tarde',
                'Aceptar',
                navigate('/')
            );
        })
    }, [detallesVisualizacion.id, navigate])


    return (
        <div className="container producto">
            {cargado ? <ItemDetail producto={producto}/> : <></>}
        </div>
    )
}

export default ItemDetailContainer