import React from 'react'

import CartWidget from './CartWidget'
import {Bars3Icon} from '@heroicons/react/24/solid'

const enlaces = [
    {nombre:"Auriculares y headsets", link:"#headsets"},
    {nombre:"Parlantes", link:"#parlantes"},
    {nombre:"Minicomponentes", link:"#minicomponentes"},
    {nombre:"Home Theaters", link:"#home-theaters"}
]

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 bg-white w-full shadow">
            <div className="container m-auto flex justify-between items-center text-gray-700">
                

                <button className="block lg:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group">
                        <Bars3Icon className="h-6 w-6 text-gray-700"/>
                        <div className="absolute top-0 -left-full h-screen w-8/12 md:w-5/12 bg-white border opacity-0 
                            group-focus:left-0 group-focus:opacity-100 transition-all duration-300">
                            <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-10">
                                {
                                    enlaces.map((enlace, index) => (<li key={index} className="hover:text-blue-800/80 py-4 px-6"><a href={enlace.link}>{enlace.nombre}</a></li>))
                                }
                            </ul>
                        </div>
                    </button>
                    <a href="#inicio" className="py-3 px-4 mx-2">
                        <img src="./images/brand/logo.svg" alt="logo.svg" className="h-[32px]"/>
                    </a>
                
                <ul className="hidden lg:flex items-center pr-10 text-base font-semibold cursor-pointer">
                    {
                        enlaces.map((enlace, index) => (<li key={index} className="hover:text-blue-800/80 py-4 px-6 relative after:content-[''] after:bg-blue-800/80 after:h-[3px] after:w-[0%] after:left-0 after:bottom-[0px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%]"><a href={enlace.link}>{enlace.nombre}</a></li>))
                    }
                </ul>
                <CartWidget/>
            </div>
        </nav>
    )
}

export default Navbar