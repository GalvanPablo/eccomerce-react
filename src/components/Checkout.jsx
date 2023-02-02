import React from 'react'
import { useState } from 'react'
import CreditCard from './CreditCard'

import { useCarrito } from './CustomProvider'

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase'
import { Navigate } from 'react-router-dom';

const Checkout = () => {
    const carrito = useCarrito();
    const [transaccionRealizada, setTransaccionRealizada] = useState(false)
    
    const [cardNombre, setCardNombre] = useState("")
    const [cardTarjeta, setCardTarjeta] = useState("")
    const [cardNumero, setCardNumero] = useState("")
    const [cardExpira, setCardExpira] = useState({mes: 0, anio: 0})
    const [cardCvv, setCardCvv] = useState("")

    const tarjeta = {
        nombre: cardNombre,
        tarjeta: cardTarjeta,
        numero: cardNumero,
        expira: cardExpira,
        cvv: cardCvv
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!carrito.listado.length > 0) {
            Notify.warning('No hay productos en el carrito')
            return
        }
        
        if(e.target.fisrtname.value === "" || e.target.lastname.value === "" || e.target.email.value === "" || e.target.phone.value === "" || e.target.address.value === "" || e.target.zip.value === "") {
            Notify.warning('Datos de usuario incorrectos')
            return
        }
        if(tarjeta.nombre === "" || tarjeta.tarjeta === "" || tarjeta.numero === ""  || tarjeta.expira.mes === 0 || tarjeta.expira.anio === 0 || tarjeta.cvv === "") {
            console.log(tarjeta)
            console.log(tarjeta.nombre === "")
            console.log(tarjeta.tarjeta === "")
            console.log(tarjeta.numero === "")
            console.log(tarjeta.expira.mes === 0)
            console.log(tarjeta.expira.anio === 0)
            console.log(tarjeta.cvv === "")
            Notify.warning('Datos de la tarjeta incorrectos')
            return
        }

        const orden = {
            datosUsuario: {
                nombre: e.target.fisrtname.value,
                apellido: e.target.lastname.value,
                email: e.target.email.value,
                telefono: e.target.phone.value,
                direccion: e.target.address.value,
                codigoPostal: e.target.zip.value
            },
            tarjeta: tarjeta,
            productos: carrito.listado,
            total: carrito.calcularTotal(),
            fecha: serverTimestamp()
        }
        console.log(orden)

        const ordenesCollection = collection(db, "ordenes")
        const pedido = addDoc(ordenesCollection, orden)

        pedido.then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            carrito.vaciarCarrito()
            Report.success(
                "Compra realizada",
                "Su codigo de segimiento es:  " + docRef.id,
                'Aceptar',
                setTransaccionRealizada(true)
            );
            
            
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
            Notify.failure('Error al realizar la compra')
        })
    }

    return (
        <>
            <h1>Checkout</h1>
            <form action="comprar" onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col w-80 mx-auto px-2 py-4">
                    <div className="flex flex-row">
                        <input type="text" className="w-2/5" id="lastname" placeholder="Apellido"/>
                        <input type="text" className="w-3/5" id="fisrtname" placeholder="Nombre"/>
                    </div>
                    <input type="email" className="" id="email" placeholder="Email"/>
                    <input type="text" className="" id="phone" placeholder="Teléfono"/>
                    <div className="flex flex-row">
                        <input type="text" className="w-4/5" id="address" placeholder="Dirección"/>
                        <input type="text" className="w-1/5 text-center" id="zip" placeholder="CP"/>
                    </div>
                </div>

                <CreditCard nombre={setCardNombre} tarjeta={setCardTarjeta} numero={setCardNumero} expira={setCardExpira} cvv={setCardCvv}/>

                <p>Total: ${new Intl.NumberFormat('de-DE').format(carrito.calcularTotal())}</p>

                <input type="submit" value="Finalizar Compra" className="m-5"/>
            </form>
            {transaccionRealizada? <Navigate to={"/"} /> : null}
        </>
    )
}

export default Checkout