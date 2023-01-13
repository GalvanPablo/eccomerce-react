import React from 'react'

import { useState } from 'react'

import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid'

function ImageCarrousel({imagenes}) {

    const [indiceActual, setIndiceActual] = useState(0)
    const prevSlide = () => {
        const primerSlide = indiceActual === 0
        const nuevoIndice = primerSlide ? imagenes.length - 1 : indiceActual - 1
        setIndiceActual(nuevoIndice)
    }
    const nextSlide = () => {
        const ultimoSlide = indiceActual === imagenes.length - 1
        const nuevoIndice = ultimoSlide ? 0 : indiceActual + 1
        setIndiceActual(nuevoIndice)
    }
    const cambiarSlide = (e) => {
        setIndiceActual(parseInt(e.target.dataset.index))
    }

    return (
        <div className="flex flex-row justify-center w-full max-w-[650px] select-none gap-1">
            <div className="hidden md:flex flex-col gap-1">
                {imagenes.map((imagen, i) => <img src={imagen} alt={i} onClick={cambiarSlide} key={i} data-index={i} className="w-24 h-auto object-cover object-center border-[1px] border-gray-600/30 rounded-md cursor-pointer"/>)}
            </div>
            <div className="max-w-[500px] h-auto w-[90%] md:w-full relative group">
                <img src={imagenes[indiceActual]} alt={indiceActual} className="w-full h-auto bg-center bg-cover duration-500"/>
                <div className=" md:hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <ChevronLeftIcon className="w-7 h-auto" onClick={prevSlide}/>
                </div>
                <div className="md:hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <ChevronRightIcon className="w-7 h-auto" onClick={nextSlide}/>
                </div>
                <div className="md:hidden absolute top-2 left-2 bg-black/10 px-2 rounded-full text-black/80 text-sm">{(indiceActual+1) + "/" + imagenes.length}</div>
            </div>
        </div>
    )
}

export default ImageCarrousel