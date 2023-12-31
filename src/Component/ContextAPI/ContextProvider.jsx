import React, { useState } from "react";
import {UserContext} from "./Context";

export const UserContextProvider = ({children}) => {
    
    const [cart, setCart] = useState([])
    const [noOfProduct, setNoOfProduct] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [count, setCount] = useState(0)
    const [Userlogin, setUserlogin] = useState(false)
    const [dataG, setDataG] = useState([])
    const [currentTitle, setCurrentTitle] = useState()
 
    
    return(
        <UserContext.Provider value={{Userlogin, setCurrentTitle, currentTitle, setUserlogin, cart, setCart , noOfProduct , setNoOfProduct, count, setCount, totalAmount, setTotalAmount, dataG, setDataG}}>
        {children}
        </UserContext.Provider>
    )
}

