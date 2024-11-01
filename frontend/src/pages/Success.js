import React from 'react'
import SuccessImage from '../assets/success.png'
import { Link } from 'react-router-dom'

const success = () => {
  return (
    <div className='container bg-slate-200 mx-auto mt-16 rounded w-full max-w-md p-4 flex items-center flex-col justify-center'>
      <img src={SuccessImage} alt="SuccessImage"  width={150} height={150}/>
      <Link to={"/orders"} className='p-2 my-8 px-3 rounded font-semibold text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white '>See Order</Link>
    </div>
  )
}

export default success
