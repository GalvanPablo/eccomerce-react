import React from 'react'

import Item from './Item'
import ItemCart from './ItemCart'

function ItemList({productos, tipo}) {
    if(tipo === "catalogo")
        return productos.map((producto) => <Item producto={producto} key={producto.id}/>)
    if(tipo === "carrito")
        return productos.map((item) => <ItemCart producto={item.producto} cantidad={item.cantidad} key={item.producto.id}/>)
    return null
}

export default ItemList