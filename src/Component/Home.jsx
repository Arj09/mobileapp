import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Card } from "./Card";
import { UserContext } from "./ContextAPI/Context";
import { useNavigate } from 'react-router-dom'
import { Popup } from "./Popup";


export const Home = ()=>{
    const [data,setData] = useState([])
    const [search, setSearch] = useState('')
    const [amount, setAmount] = useState('All')
    const [firstAmount, setFirstAmount] = useState()
    const [secondAmount, setSecondAmount] = useState()
    const [inc, setInc] = useState(0)
    const { setCart, setNoOfProduct, noOfProduct, cart, totalAmount, setTotalAmount, Userlogin, setDataG, setCurrentTitle} = useContext(UserContext)
    const navigate = useNavigate()
    const [display, setDisplay] = useState(false)
    const [indexPopup, setIndexPopup] = useState()
    let AddtoCart = true


    const  handleAmount = (e)=>{
        setAmount(e.target.value)
        const value = e.target.value
        const b = value.split(" ")
        setFirstAmount(b[0])
        setSecondAmount(b[1])

        console.log(b)
        console.log(firstAmount, secondAmount)



    }

    const handleAdd = (index)=>{
        

       
        const findData = data[index]
        
        const AddProduct_title = data[index].title
        for(let i = 0; i<cart.length ; i++){
            const ad = cart.filter((cart)=>cart.title == AddProduct_title)
            if(cart[i]?.title == ad[0]?.title){
                if(cart[i]?.Qty < 5){
                    cart[i].Qty = cart[i].Qty + 1
                    setTotalAmount(totalAmount + cart[i].price)
                   
                }
                AddtoCart = false
            }
        }
        
        if(AddtoCart){
            const findData = data[index]
            const { title, price, discountPercentage, rating, description, brand, thumbnail } = findData
            const newData = { title, price, discountPercentage, rating, brand , description, thumbnail, Qty:1}
            setCart(cart=>([...cart, newData]))
            setTotalAmount(totalAmount + data[index].price)
            setNoOfProduct(noOfProduct+1)

        }
        
        
       
        setDisplay(true)
        setIndexPopup(index)
        setTimeout(()=>{
            setDisplay(false)
            setIndexPopup()
        }, [1000])

    }
    const handleCart = ()=>{
        navigate("/cart")
        
    }


    const handleDetail = (data)=>{
        setCurrentTitle(data)
        navigate("/detail")
    }


    useEffect(()=>{
        axios.get("https://dummyjson.com/products").then((res)=>{
            console.log(res.data.products)
            setData(res.data.products)
           
            
        }).catch((err)=>{
            console.log(err)
        })

    },[])


    if(!localStorage.getItem('Token')){
        navigate("/")
    }

    



    return(
        <div>
            <div className=" w-full flex flex-col justify-center     bg-red-600 h-[80px] px-5 py-5 ">
                
                <div className=" flex flex-row justify-between  ">
                <input placeholder=" Search By Product name" className=" border-gray-100 border-2  rounded h-[40px] w-[180px] pl-3 text-sm  lg:w-[500px] md:w-[400px] sm:w-[350px] " onChange={(e)=>setSearch(e.target.value)}/>
                
                <div className="flex flex-row ml-5  ">
                
                    
                    
                    {
                        noOfProduct == 0 ? (
                            <div className=" hidden"></div>

                        ) : (
                            <text className=" flex flex-row absolute px-3 py-1 bg-yellow-400 text-white rounded-full top-2 right-7  text-sm">{noOfProduct}</text>
                        )
                    }

                   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-white mt-1.5 hover:text-orange-600" onClick={handleCart}>
  <                     path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>

                </div>
                </div>

            </div>

                <div className="w-4/5 flex flex-row mx-auto my-4 h-[40px] bg-red-600 px-5 py-2 rounded">
                    <text className=" text-white pr-2">Filter</text>
                    <select value={amount} onChange={handleAmount} >
                        <option value='All'>All</option>
                        <option value='1 100' >1-100</option>
                        <option value='100 500'>100-500</option>
                        <option value='500 1000'>500-1000</option>
                        <option value='1000 5000'>1000-5000</option>
                    </select>
                </div>


            <div className="w-5/5 sm:w-4/5 md:w-4/5 lg:w-4/5 border-none  my-2 mx-auto grid grid-cols-1  grid-rows-1 justify-between gap-y-7 gap-x-2  py-5 pl-9 pr-5 lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2">
                {
                    data?.filter((data)=>(data.title.toLowerCase().startsWith(search.toLowerCase())))
                    .filter((data)=>(amount === "All" ? data : data.price > firstAmount && data.price <secondAmount ))
                    .map((data, index)=>{
                        
                        return(
                            <div  key={index}   className="w-11/12 border-slate-200 border-2 h-80  relative rounded">
                                <img src={data?.thumbnail }  className=" w-full h-2/5 rounded " />
                                <div className="flex flex-col pl-5 py-2 ">
                                    {
                                        display && indexPopup == index  ? (
                                            <Popup text={'Item added'}/>
                                        ):(
                                            <text className=" hidden"></text>
                                        )
                                    }
                                    
                                    
                                    <text>{`${data?.title}`}</text>
                                    <text>{`Rs : ${data?.price} /-`}</text>
                                    <text>{`Rating : ${data?.rating}`}</text>
                                    <text>{`Discount : ${data?.discountPercentage}`}</text>
                                </div>

                               
                                <div className=" w-full flex flex-row justify-evenly px-2 py-2 relative  ">
                                    
                                    
                                    <button className=" w-2/5 bg-red-600 text-white px-2 py-1 rounded" onClick={()=>handleAdd(index)}>Add</button>
                                    <button className=" w-2/5 bg-red-600 text-white px-2 py-1 rounded" onClick={()=>handleDetail(data.title)}>Detail</button>
                                </div>

                            </div>
                        )
                    })
                }
               

            </div>
            {
                data.length == 0 ? (
                    <text className="flex flex-row justify-center mx-auto text-5xl my-36">Data is loading</text>
                ): (
                    <text className=" hidden">that is not display</text>
                )
            }

            

            

            
        



        </div>
    )
}