import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Card } from "./Card";
import { UserContext } from "./ContextAPI/Context";
import { useNavigate } from 'react-router-dom'


export const Home = ()=>{
    const [data,setData] = useState([])
    const [search, setSearch] = useState('')
    const [amount, setAmount] = useState('All')
    const [firstAmount, setFirstAmount] = useState()
    const [secondAmount, setSecondAmount] = useState()
    const [inc, setInc] = useState(0)
    const { setCart, setNoOfProduct, noOfProduct, cart, totalAmount, setTotalAmount, Userlogin} = useContext(UserContext)
    const navigate = useNavigate()

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
                cart[i].Qty = cart[i].Qty + 1
                setTotalAmount(totalAmount + cart[i].price)
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
        
        
       


    }
    const handleCart = ()=>{
        navigate("/cart")
        
    }


    const handleDetail = ()=>{
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
            <div className=" w-full flex flex-row justify-between text-center align-middle  bg-red-600 h-[80px] px-5 py-5 ">
                
                
                <input placeholder=" Search By Product name" className=" border-gray-100 border-2  rounded h-[40px] w-[180px] pl-3 text-sm  lg:w-[500px] md:w-[400px] sm:w-[350px] " onChange={(e)=>setSearch(e.target.value)}/>
                
                <div className="flex flex-row ml-5  ">
                
                    
                    
                    {
                        noOfProduct == 0 ? (
                            <div className=" hidden"></div>

                        ) : (
                            <text className=" flex flex-row absolute px-3 py-1 bg-yellow-400 text-white rounded-full top-2 right-12  text-sm">{noOfProduct}</text>
                        )
                    }

                    <text className="  cursor-pointer px-2 rounded py-2 bg-white text-red-600" onClick={handleCart}>Cart</text>
                </div>

            </div>

                <div className="w-4/5 flex flex-row mx-auto my-2 h-[40px] bg-red-600 px-5 py-2">
                    <text className=" text-white pr-2">Filter</text>
                    <select value={amount} onChange={handleAmount} >
                        <option value='All'>All</option>
                        <option value='1 100' >1-100</option>
                        <option value='100 500'>100-500</option>
                        <option value='500 1000'>500-1000</option>
                        <option value='1000 5000'>1000-5000</option>
                    </select>
                </div>


            <div className="w-5/5 sm:w-4/5 md:w-4/5 lg:w-4/5   border-slate-100 border-2  my-2 mx-auto grid grid-cols-1  grid-rows-1 justify-between gap-y-7 gap-x-2  py-5 pl-9 pr-5 lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2">
                {
                    data?.filter((data)=>(data.title.toLowerCase().startsWith(search.toLowerCase())))
                    .filter((data)=>(amount === "All" ? data : data.price > firstAmount && data.price <secondAmount ))
                    .map((data, index)=>{
                        
                        return(
                            <div  key={index}   className="w-11/12 border-slate-200 border-2 h-80 ">
                                <img src={data?.thumbnail }  className=" w-full h-2/5" />
                                <div className="flex flex-col pl-5 py-2">
                                    <text>{`${data?.title}`}</text>
                                    <text>{`Rs : ${data?.price} /-`}</text>
                                    <text>{`Rating : ${data?.rating}`}</text>
                                    <text>{`Discount : ${data?.discountPercentage}`}</text>
                                </div>
                                <div className=" w-full flex flex-row justify-evenly px-2 py-2  ">
                                    {

                                    }
                                   
                                    
                                    <button className=" w-2/5 bg-red-600 text-white px-2 py-1" onClick={()=>handleAdd(index)}>Add</button>
                                    
                                    <button className=" w-2/5 bg-red-600 text-white px-2 py-1" onClick={handleDetail}>Detail</button>
                                </div>

                            </div>
                        )
                    })
                }
               

            </div>

           
            

            
        



        </div>
    )
}