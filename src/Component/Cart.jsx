import React, { useContext, useState } from "react";
import { UserContext } from "./ContextAPI/Context";
import { useNavigate } from "react-router-dom";



export const Cart = ()=>{
    const [data, setdata]= useState([])
    const {cart, setNoOfProduct, setCart} = useContext(UserContext)
    const navigate = useNavigate()


    const handleBack =()=>{
        navigate("/home")
    }

    const handleOrder = ()=>{
        navigate("/home")
        setCart([])
        setNoOfProduct(0)
    }



    return(
        <>
        
        <div className="w-4/5 mx-auto my-1 flex flex-row justify-start px-2 py-4">
            <button  className='bg-red-600 px-3 py-2 text-md text-white'         onClick={handleBack}>Back to Home</button>
        </div>
        <div className="w-4/5 flex flex-col mx-auto my-2 gap-2  px-2 py-2 ">
                <text className="flex flex-row justify-center mx-auto text-2xl bg-red-600 text-white py-2 w-full">Cart</text>
                <div className="flex flex-col justify-between px-3 w-full border-2 border-red-600 py-5  gap-6">
                    {
                        cart.map((data, index)=>{
                            return(
                                <div  key={index}   className="w-full mx-auto border-slate-200 border-2 h-80  px-2 py-4 lg:w-2/5 md:w-4/5 sm:w-4/5">
                                    <img src={data?.thumbnail }  className=" w-full h-2/5" />
                                    <div className="flex flex-col pl-5 py-2">
                                        <text>{`${data?.title}`}</text>
                                        <text>{`Rs : ${data?.price} /-`}</text>
                                        <text>{`Rating : ${data?.rating}`}</text>
                                        <text>{`Discount : ${data?.discountPercentage}`}</text>
                                    </div>
                                    <div className=" w-full flex flex-row justify-evenly px-2 py-2  ">
                                        <button className=" w-2/5 bg-red-600 text-white px-2 py-1" >Remove</button>
                                        <button className=" w-2/5 bg-red-600 text-white px-2 py-1">Detail</button>
                                    </div>
                                </div>
                            )
                        })
                        
                    }

                </div>
                
        </div>
        <button className="flex flex-row mx-auto my-3 w-3/5 bg-red-600  justify-center py-2 text-white " onClick={handleOrder}>Order</button>
        </>
    )
}