import React from 'react'
import Image from '../assets/demo.jpg';


const CardItem = () => {
  return (
    <div className="flex w-[calc(50%-0.5rem)] bg-white h-60 rounded-2xl mt-6">
        <div className="flex">
            <img src={Image} alt="" className='w-60 h-60 p-2 rounded-2xl '  />
            <div className="flex flex-col text-black py-4 px-2 gap-4">
                <h1 className='text-3xl font-bold text-slate-800'>Simple Title</h1>
                <p className='text-lg text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore at exercitationem animi! Laboriosam ex amet nemo culpa eveniet. Vero, nam.</p>
            </div>

        </div>
    </div>
  )
}

export default CardItem