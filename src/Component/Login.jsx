import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/Context";
import { Popup } from "./Popup";


export const Login = ()=>{
    const [login, setLogin] = useState({})
    const navigate = useNavigate()
    const [display, setDisplay] = useState(false)

    const handleData = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setLogin(login=>({...login, [name]: value}))
    }

    const { setUserlogin}  = useContext(UserContext)


    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('https://dummyjson.com/auth/login',{
            username : login.username,
            password : login.password

        }).then((res)=>{
            setDisplay(true)
            console.log(res.data)
            localStorage.setItem("Token", res.data.token)
            setUserlogin(true)
            navigate("/home")

        }).catch((err)=>{
            console.log(err)
            alert("Something wrong")
        })

        setLogin({username:"", password:""})


    }
    return(
        <div >
            
            <form  onSubmit={handleSubmit} className=" relative  flex flex-col mx-auto mt-56 rounded gap-3 text-center w-4/5 border-2 border-slate-200 px-5 pt-12 pb-10 lg:w-2/5  md:w-3/5">
                {
                    display ? (
                        <div className={"flex flex-row absolute  py-4 bg-red-600  text-white top-20 w-4/5 right-12  justify-center rounded" }>
                            <text className=" text-md text-center">{'Login sucessfully'}</text>
                        </div>
                    ):(
                        <text className=" hidden"></text>
                    )
                }
                
                <text className="flex flex-row justify-center text-slate-900 pb-7 text-2xl">Mobile Order App</text>
                <input  placeholder="Enter username"  class="border-gray-100 border-2 pl-1"  name="username" value={login.username || ""} onChange={handleData} required />
                <input    placeholder="Enter password"  class="border-gray-100 border-2 pl-1"  name="password" value={login.password || ""} onChange={handleData} required/>
                <button class="bg-red-600 text-white px-5 py-1 rounded" >Login</button>
            </form>
        </div>
    )
}