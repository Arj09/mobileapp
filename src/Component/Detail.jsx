import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "./ContextAPI/Context"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Detail = ()=>{

    
    const { dataG, currentTitle} = useContext(UserContext)
    
    const [data, setData] = useState()
    const navigate = useNavigate()
    const find = data?.filter((data)=>data.title == currentTitle)
    
    

    useEffect(()=>{
        axios.get("https://dummyjson.com/products").then((res)=>{
            console.log(res.data.products)
            setData(res.data.products)
           
            
        }).catch((err)=>{
            console.log(err)
        })

    },[])

    const handleBack = ()=>{
        navigate("/home")
    }

    return(
        <div>
            <div className="flex flex-row mx-auto my-5 justify-start w-4/5 px-4">
                <button className="bg-red-600 text-white px-3 py-1" onClick={handleBack}>Back to home</button>
            </div>
            {
                find?.map((data, index)=>{
                    return(
                        <div className="flex flex-col mx-auto my-10 border-2 border-red-600 w-4/5 ">
                            <div className=" flex flex-row mx-auto w-full my-3 justify-center">
                                <img className="w-2/4" src={data.thumbnail} alt="page"  />
                                
                            </div>
                            
                            <div className="w-full  flex flex-col mx-auto my-2 justify-start pl-5 pb-5 pr-3">
                                <text className=" text-2xl">{data.title}</text>
                                <text >{`Rs : ${data.price} /-` }</text>
                                <text >{`Discount : ${data.discountPercentage} ` }</text>
                                <text >{`Rating : ${data.rating} ` }</text>
                                <text >{`Brand : ${data.brand} ` }</text>
                                <text >{`Category : ${data.category} ` }</text>
                                <text >{`Description : ${data.description} ` }</text>
                                

                            </div>
                 
                    </div>
                    )
                })
            }

             
        </div>
    )
}