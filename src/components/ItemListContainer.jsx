import React from 'react'

import ItemList from './ItemList'

// Este componente debe de contener la lógica de conseguir los productos, guardarlos y poder filtrarlos
// Debe de tener un <ItemList/> que reciba un array de productos y los muestre mediante map


const productos = JSON.stringify([
    {nombre:"FREI CHAIN TWS", descripcion:"descripción", precio:"180", imagen:"https://i.imgur.com/BQdIOp7.png"},
    {nombre:"vertrag-bt-home-cinema", descripcion:"descripción", precio:"180", imagen:"https://i.imgur.com/WLeyFck.png"},
    {nombre:"dunn", descripcion:"descripción", precio:"180", imagen:"https://i.imgur.com/oMRxNEa.png"},
])

function ItemListContainer({greeting}) {
    return (
        <section>
            <h2 className="font-semibold text-2xl">{greeting}</h2>
            <div className="flex items-center justify-center gap-4 mt-8">
                <ItemList productos={productos}/>
            </div>
        </section>
    )
}

export default ItemListContainer