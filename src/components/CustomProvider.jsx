import React, { useState } from 'react'

import { createContext, useContext } from 'react'

export const contexto = createContext()
const Provider = contexto.Provider

export const useCarrito = () => useContext(contexto).carrito

const CustomProvider = ({children}) => {

    const [listadoCarrito, setListadoCarrito] = useState([])

    const estaEnCarrito = (producto) => listadoCarrito.some(item => item.producto.id === producto.id)
    const agregarProducto = (producto, cantidad) => {
        const auxCarrito = [...listadoCarrito]
        if(!estaEnCarrito(producto)) {
            auxCarrito.push({producto, cantidad})
            setListadoCarrito(auxCarrito)
            return 1
        }
        return (modificarCantidad(producto, cantidad)? 2 : 0)
    }
    const eliminarProducto = (producto) => {
        if(!estaEnCarrito(producto)) return false
        const auxCarrito = [...listadoCarrito]
        const index = auxCarrito.findIndex(item => item.producto.id === producto.id)
        auxCarrito.splice(index, 1)
        setListadoCarrito(auxCarrito)
        return true
    }
    const modificarCantidad = (producto, nuevaCantidad) => {
        if(!estaEnCarrito(producto)) return false
        const auxCarrito = [...listadoCarrito]
        const index = auxCarrito.findIndex(item => item.producto.id === producto.id)
        auxCarrito[index].cantidad = nuevaCantidad
        setListadoCarrito(auxCarrito)
        return true

    }
    const vaciarCarrito = () => {
        if(listadoCarrito.length > 0){
            setListadoCarrito([])
            return true
        }
        return false
    }

    const calcularTotal = () =>{
        let total = 0
        listadoCarrito.forEach((item)=>{
            total += item.producto.precio * item.cantidad
        })
        return total
    }
    

    const valorContexto = {
        carrito: {
            listado: listadoCarrito,
            estaEnCarrito: estaEnCarrito,
            agregarProducto: agregarProducto,
            eliminarProducto: eliminarProducto,
            modificarCantidad: modificarCantidad,
            vaciarCarrito: vaciarCarrito,
            calcularTotal: calcularTotal
        }
    }

    return (
        <Provider value={valorContexto}>
            {children}
        </Provider>
    )
}

export default CustomProvider