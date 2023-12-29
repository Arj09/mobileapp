import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/Context";


export const Login = ()=>{
    const [login, setLogin] = useState({})
    const navigate = useNavigate()

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
        <div>
            <form  onSubmit={handleSubmit} className="flex flex-col mx-auto mt-56 rounded gap-3 text-center w-4/5 border-2 border-slate-200 px-5 pt-12 pb-10 lg:w-2/5  md:w-3/5">
                <text className="flex flex-row justify-center text-slate-900 pb-7 text-2xl">Mobile Order App</text>
                <input  placeholder="Enter username"  class="border-gray-100 border-2 pl-1"  name="username" value={login.username || ""} onChange={handleData} required />
                <input   placeholder="Enter password"  class="border-gray-100 border-2 pl-1"  name="password" value={login.password || ""} onChange={handleData} required/>
                <button class="bg-red-600 text-white px-5 py-1 rounded" >Login</button>
            </form>
        </div>
    )
}