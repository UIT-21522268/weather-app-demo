import React from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GrMapLocation } from "react-icons/gr";
import { GrLocation } from "react-icons/gr";
import SearchAppBar from './Searchbar/Searchbar';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

export default function Navbar({ }: Props) {
    return (
        <>
            <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
                <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-10 mx-auto">
                    <p className="flex items-center justify-center gap-2  ">
                        <h2 className="text-teal-400 text-3xl">Weather  </h2>
                        <TiWeatherPartlySunny className='text-3xl text-yellow-300 mt-1' />
                    </p>
                    <section className="flex items-center  gap-5  ">
                        <GrMapLocation className='text-2xl mt-1 hover:opacity-60 cursor-pointer' />
                        <GrLocation className='text-2xl mt-1 hover:opacity-60 cursor-pointer' />
                        <p className='text-teal-900/80 text-sm font-medium '>BMT</p>
                        <div><SearchAppBar /></div>
                    </section>

                </div>
            </nav>
        </>
    )
}