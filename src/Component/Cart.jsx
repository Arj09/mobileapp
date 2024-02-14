import React, { useContext, useState } from "react";
import { UserContext } from "./ContextAPI/Context";
import { useNavigate } from "react-router-dom";
import { Popup } from "./Popup";



export const Cart = ()=>{
    const [data, setdata]= useState([])
    const {cart, setNoOfProduct, setCart, noOfProduct, totalAmount, setTotalAmount} = useContext(UserContext)
    const navigate = useNavigate()
    const [display, setDisplay] = useState(false)
    const [indexPopup, setIndexPopup] = useState()


    const handleBack =()=>{
        navigate("/home")
    }

    const handleOrder = ()=>{
        navigate("/home")
        setCart([])
        setNoOfProduct(0)
    }


    const handleRemove =(index, price, Qty)=>{
         
        let arr = cart
            cart.splice(index, 1)
        setCart([...arr])
        setTotalAmount(totalAmount - price * Qty)
        setNoOfProduct(noOfProduct - 1)

    }

    const handleDetail = ()=>{
        navigate('/detail')
    }

    const handleInc = (price, index)=>{
        setIndexPopup(index)

        if(cart[index].Qty<5){
            cart[index].Qty = cart[index].Qty + 1
            setTotalAmount(totalAmount + price)

        }
        else
        {
            setDisplay(true)
            setTimeout(()=>{
                setDisplay(false)

            }, [1000])
            

        }


    }
    const handleDec = (price, index)=>{
        if(cart[index].Qty>1){
            cart[index].Qty = cart[index].Qty - 1
            setTotalAmount(totalAmount - price)
        }

    }

    if(!localStorage.getItem('Token')){
        navigate("/")
    }



    return(
        <>
        
        <div className="w-4/5 mx-auto my-1 flex flex-row justify-start px-2 py-4">
            <button  className='bg-red-600 px-3 py-2 text-md text-white rounded'         onClick={handleBack}>Back to Home</button>
        </div>


        <div className="w-4/5 flex flex-col mx-auto my-2 gap-2  px-2 py-2 ">
                <text className="flex flex-row justify-center mx-auto text-2xl bg-red-600 text-white py-2 w-full rounded">Cart</text>
                <div className="w-full flex flex-row mx-auto my-1 bg-red-600 justify-between px-4 text-xl rounded  ">
                    <text className="text-white py-2 ">{`Total No Of Product : ${noOfProduct}`} </text>
                    <text className="text-white py-2">{`Total Amount : ${totalAmount}`}</text>
                </div>
                <div className="flex flex-col justify-between px-3 w-full border-2 border-red-600 py-5  gap-6 rounded">
                    {
                        cart.map((data, index)=>{
                            return(
                                <div  key={index}   className="w-full mx-auto relative border-slate-200 border-2 h-80  px-2 py-4 lg:w-2/5 md:w-4/5 sm:w-4/5">
                                    <img src={data?.thumbnail }  className=" w-full h-2/5" />
                                    <div className="flex flex-col pl-5 py-1">
                                        <text>{`${data?.title}`}</text>
                                        <text>{`Rs : ${data?.price} /-`}</text>
                                        <text>{`Rating : ${data?.rating}`}</text>
                                        <text>{`Discount : ${data?.discountPercentage}`}</text>
                                        
                                        <div className=" w-full flex flex-row  ">


                                            {
                                                display && indexPopup == index ? (
                                                    <Popup text={'You can add maximum 5 quantity'}/>
                                                ):(
                                                    <div className=" hidden"></div>

                                                )
                                            }


                                            <text>{`Quantity :`}</text>
                                            <div className=" border-2 border-red-600 ml-2 rounded">
                                                <button className="px-1" onClick={()=>handleDec(data.price, index)}>-</button>
                                                <text className="px-1">{data.Qty}</text>
                                                <button className="px-1" onClick={()=>handleInc(data.price, index)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" w-full flex flex-row justify-evenly px-2 py-2  ">
                                        <button className=" w-2/5 bg-red-600 text-white px-2 py-1 rounded"  onClick={()=>handleRemove(index, data?.price, data?.Qty)}>Remove</button>
                                        <button className=" w-2/5 bg-red-600 text-white px-2 py-1 rounded" onClick={(e)=>handleDetail(index)}>Detail</button>
                                    </div>
                                </div>
                            )
                        })
                        
                    }

                </div>
                
        </div>
        
        <button className="flex flex-row mx-auto my-3 w-3/5 bg-red-600  justify-center py-2 text-white rounded " onClick={handleOrder}>Order</button>
        </>
    )
}