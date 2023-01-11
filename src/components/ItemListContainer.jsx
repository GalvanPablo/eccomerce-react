import React from 'react'

import { useEffect, useState } from 'react'

import ItemList from './ItemList'

// Este componente debe de contener la lógica de conseguir los productos, guardarlos y poder filtrarlos
// Debe de tener un <ItemList/> que reciba un array de productos y los muestre mediante map


// const productos = JSON.stringify([
//     {nombre:"FREI CHAIN TWS", descripcion:"descripción", precio:"180", imagen:"https://i.imgur.com/BQdIOp7.png"},
//     {nombre:"vertrag bt home cinema", descripcion:"descripción", precio:"180", imagen:"https://i.imgur.com/WLeyFck.png"},
//     {nombre:"dunn", descripcion:"descripción", precio:"180", imagen:"https://i.imgur.com/oMRxNEa.png"},
// ])

function ItemListContainer() {
    const [cargado, setCargado] = useState(false)
    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch("./datos/productos.json")
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            setProductos(productos)
            setCargado(true)
        })
        .catch((error) => console.log(error))
    }, [])

    return (
        <section>
            <h2 className="font-semibold text-2xl">Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                {cargado ? <ItemList productos={productos}/> : <p>Cargando...</p>}
            </div>
        </section>
    )
}

export default ItemListContainer