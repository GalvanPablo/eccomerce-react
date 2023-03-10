import React from 'react'
import { useState } from 'react'

function CreditCard({nombre, tarjeta, numero, expira, cvv}) {
    const actualAnio = new Date().getFullYear()

    const handleChangeNombre = (e) => {
        nombre(e.target.value)
    }

    tarjeta("visa")
    const handleChangeTarjeta = (e) => {
        tarjeta(e.target.value)
    }

    const handleChangeNumero = (e) => {
        numero(e.target.value)
    }

    const [caducidad, setCaducidad] = useState({mes: 0, anio: 0})

    const handleChangeMonth = (e) => {
        const aux = {...caducidad}
        aux.mes = parseInt(e.target.value)
        setCaducidad(aux)
        expira(aux)
    }
    const handleChangeYear = (e) => {
        const aux = {...caducidad}
        aux.anio = parseInt(e.target.value)
        setCaducidad(aux)
        expira(aux)
    }

    const handleChangeCvv = (e) => {
        cvv(e.target.value)
    }
    
    return (
        <div className="w-80 h-52 mx-auto bg-red-100 rounded-xl relative text-white">
            <img src="../images/etc/card_bg.svg" alt="" className="relative object-cover w-full h-full rounded-xl"/>

            <div className="w-full px-8 absolute top-5">
                <div>
                    <div className="flex justify-between">
                        <p className="font-light">Nombre</p>

                        <select name="tarjeta" id="cardType" className="bg-transparent w-min text-right font-light" onChange={handleChangeTarjeta}>
                            <option value="visa" className="bg-[#0A090C]">Visa</option>
                            <option value="mastercard" className="bg-[#0A090C]">Mastercard</option>
                            <option value="amex" className="bg-[#0A090C]">American Express</option>
                        </select>
                    </div>
                    <input type="text" id="name" placeholder="---------" className="font-medium bg-transparent outline-none" onChange={handleChangeNombre}/>
                </div>
                
                <div className="pt-1">
                    <p className="font-light">N??mero</p>
                    <input type="text" id="card" placeholder="XXXX XXXX XXXX XXXX" className="font-medium bg-transparent outline-none" onChange={handleChangeNumero}/>
                </div>
                
                <div className="pt-6 pr-6">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-light text-xs">Expir??</p>
                            <select name="mes" id="monthExpire" className="bg-transparent" onChange={handleChangeMonth}>
                                <option value="-" className="bg-[#303030]">--</option>
                                {
                                    [...Array(12).keys()].map((item, index) => <option key={index} value={item+1} className="bg-[#494949]">{item+1}</option>)
                                }
                            </select>
                            /
                            <select name="a??o" id="yearExpire" className="bg-transparent" onChange={handleChangeYear}>
                                <option value="-" className="bg-[#303030]">----</option>
                                {
                                    [...Array(10).keys()].map((item, index) => <option key={index} value={item+actualAnio} className="bg-[#494949]">{item+actualAnio}</option>)
                                }
                            </select>
                        </div>

                        <div>
                            <p className="font-light text-xs">CVV</p>
                            <input type="text" id="cvv" placeholder="---" className="bg-transparent text-sm w-6 text-center" onChange={handleChangeCvv}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditCard