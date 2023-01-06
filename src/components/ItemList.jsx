import React from 'react'

import Item from './Item'

function ItemList({productos}) {
    const productosArray = JSON.parse(productos)
    
    return productosArray.map((p) => <Item nombre={p.nombre} descripcion={p.descripcion} precio={p.precio} imagen={p.imagen}/>)
}

export default ItemList