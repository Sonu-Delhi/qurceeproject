import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)


    const fetchData = async() =>{
        
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
       

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }


    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])


    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }


    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
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
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    // Payment
    const handlePayment = async()=>{
        const stripePromise = await loadStripe("pk_test_51PeIJ2KpxteXK8uk7uLpH6Ce6D0s0PM7cfc5YRPBnbubmvQqQUH2lJVFfwpbVjMCiiS5zfi1tUhhwld8kFGRNCIo00dYlTbGSf");
        const response = await fetch(SummaryApi.payment.url,{
          method: SummaryApi.payment.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems:data
          })
        })
        const responseData = await response.json()
        if(responseData.sessionData?.id){
          stripePromise.redirectToCheckout({sessionId:responseData.sessionData.id})
        }
        // console.log("responseData",responseData.sessionData.id);
        
        
      }


    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
  return (
    <div className="container mx-auto mt-3">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View Product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el,index) => {
                return (
                  <div
                    className="w-full bg-slate-200 h-32 my-4 border border-slate-300 animate-pulse rounded"
                    key={el + "Add To Cart Loading"+index}
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    className="w-full bg-white h-36 my-4 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                    key={product?._id + "Add To Cart Loading"}
                  >
                    <div className="h-36 w-36 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt=""
                      />
                    </div>
                    <div className="px-6 py-2 relative">
                    {/* Delete Product */}
                    <div className="absolute right-0 md:right-3 text-red-600 rounded-full p-2 hover:bg-red-600 cursor-pointer hover:text-white" onClick={()=>deleteCartProduct(product?._id)}>
                      <MdDelete/>
                    </div>
                      <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                      <p className="capitalize text-blue-600 font-medium text-lg">
                        {displayCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="capitalize text-slate-600 font-semibold text-lg hidden md:block">
                        {displayCurrency(product?.productId?.sellingPrice * product?.quantity)}
                      </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white" onClick={()=>decraseQty(product?._id,product?.quantity)}>
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* Total Product */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 bordrt border-slate-300 animate-pulse rounded">
              Toatal
            </div>
          ) : (
            <div className="h-36 my-4 bg-white rounded">
              <h2 className="text-white bg-red-600 rounded px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayCurrency(totalPrice)}</p>
              </div>

              <button className="bg-blue-600 p-2 text-lg mt-2 text-white w-full" onClick={handlePayment}>PROCEE TO payment</button>
              {/* <button className="bg-blue-600 p-2 text-lg mt-2 text-white w-full" onClick={()=>navigate("/order")}>PROCEE TO CHECKOUT</button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart