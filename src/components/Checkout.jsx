import React from 'react'
import { useState } from 'react'
import CreditCard from './CreditCard'

import { useCarrito } from './CustomProvider'

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase'

import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const carrito = useCarrito();
    const navigate = useNavigate();
    
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
                navigate("/")
            );
            
            
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
            Notify.failure('Error al realizar la compra')
        })
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center mt-3">Checkout</h1>
            <form action="comprar" onSubmit={handleSubmit} className="flex flex-col gap-5 mt-3">
                <div className="flex flex-col w-80 mx-auto px-2 py-4 gap-2">
                    <div className="flex flex-row gap-3">
                        <input type="text" id="lastname" placeholder="Apellido" className="w-2/5 border-b-[1px]"/>
                        <input type="text" id="fisrtname" placeholder="Nombre" className="w-3/5 border-b-[1px]"/>
                    </div>
                    <input type="email" id="email" placeholder="Email" className="border-b-[1px]"/>
                    <input type="text" id="phone" placeholder="Teléfono" className="border-b-[1px]"/>
                    <div className="flex flex-row gap-3">
                        <input type="text" id="address" placeholder="Dirección" className="w-4/5 border-b-[1px]"/>
                        <input type="text" id="zip" placeholder="CP" className="w-1/5 border-b-[1px]"/>
                    </div>
                </div>

                <CreditCard nombre={setCardNombre} tarjeta={setCardTarjeta} numero={setCardNumero} expira={setCardExpira} cvv={setCardCvv}/>

                <div className="fixed bottom-0 left-0 w-full flex justify-center">
                    <input type="submit" value={"Pagar $" + new Intl.NumberFormat('de-DE').format(carrito.calcularTotal())} className="w-11/12 py-6 bg-gray-800 rounded-t-lg font-semibold outline-none select-none text-white hover:bg-blue-800/80"/>
                </div>
            </form>
        </>
    )
}

export default Checkout