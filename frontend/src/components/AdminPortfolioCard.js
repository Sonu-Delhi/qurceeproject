import React, { useContext, useState } from 'react';
import AdminEditPortfolio from './AdminEditPortfolio';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import Context from '../context';

const AdminPortfolioCard = ({ data, fetchdata, onDelete }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const context = useContext(Context)
  const handleDelete = async(id)=>{
    const response = await fetch(SummaryApi.deleteClients.url,{
        method : SummaryApi.deleteClients.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
            }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        fetchdata()
        // context.fetchUserAddToCart()
    }
}

  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          {data?.logoImage && data.logoImage[0] && (
            <img src={data.logoImage[0]} alt={`${data.companyName} logo`} className='mx-auto object-fill h-full' />
          )}
        </div>
        <h1 className='font-semibold text-ellipsis line-clamp-2'>{data.companyName}</h1>

        <div>
          <p>{data.description}</p>

          <div className='flex space-x-2 mt-2'>
            {/* Edit Button */}
            <div
              className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer transition-colors duration-300'
              onClick={() => setEditProduct(true)}
              aria-label="Edit Portfolio"
            >
              <MdModeEditOutline />
            </div>

            {/* Delete Button */}
            <div
              className={`w-fit p-2 ${isDeleting ? 'bg-gray-400' : 'bg-red-100 hover:bg-red-600'} rounded-full hover:text-white cursor-pointer transition-colors duration-300`}
              onClick={() => !isDeleting && handleDelete(data._id)}
              aria-label="Delete Portfolio"
              disabled={isDeleting}
            >
              {isDeleting ? <span>Deleting...</span> : <MdDelete />}
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditPortfolio productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      )}
    </div>
  );
};

export default AdminPortfolioCard;
