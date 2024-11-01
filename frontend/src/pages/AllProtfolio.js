import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import UploadPortfolio from '../components/UploadPortfolio'
import AdminPortfolioCard from '../components/AdminPortfolioCard'

const AllProtfolio = () => {
    const [openUploadPortfolio,setOpenUploadPortfolio] = useState(false)
  const [allPortfolio,setAllPortfolio] = useState([])

  const fetchAllPortfolio = async() =>{
    const response = await fetch(SummaryApi.getClients.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllPortfolio(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllPortfolio()
  },[])
  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>All Portfolio</h2>
            <button  className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadPortfolio(true)}>Upload Portfolio</button>
        </div>

        {/**all product */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allPortfolio.map((portfolio,index)=>{
              return(
                <AdminPortfolioCard data={portfolio} key={index+"allProduct"} fetchdata={fetchAllPortfolio}/>
                
              )
            })
          }
        </div>





        {/**upload prouct component */}
        {
          openUploadPortfolio && (
            <UploadPortfolio onClose={()=>setOpenUploadPortfolio(false)} fetchData={fetchAllPortfolio}/>
          )
        }
      

    </div>
  )
}

export default AllProtfolio
