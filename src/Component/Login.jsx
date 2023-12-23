import React from "react";
import { useNavigate } from "react-router-dom";


export const Login = ()=>{

    const navigate = useNavigate()


    const handleSubmit = (e)=>{
        e.preventDefault()
        navigate('/home')


    }
    return(
        <div>
            <form  onSubmit={handleSubmit} className="flex flex-col mx-auto mt-56 rounded gap-3 text-center w-4/5 border-2 border-slate-200 px-5 pt-12 pb-10 lg:w-2/5  md:w-3/5">
                <text className="flex flex-row justify-center text-slate-900 pb-7 text-2xl">Mobile Order App</text>
                <input  placeholder="Enter email"  class="border-gray-100 border-2 pl-1" />
                <input   placeholder="Enter password"  class="border-gray-100 border-2 pl-1"/>
                <button class="bg-red-600 text-white px-5 py-1 rounded" >Login</button>
            </form>
        </div>
    )
}