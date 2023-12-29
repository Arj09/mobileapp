import React, { useState } from "react";
import {UserContext} from "./Context";

export const UserContextProvider = ({children}) => {
    
    const [cart, setCart] = useState([])
    const [noOfProduct, setNoOfProduct] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [count, setCount] = useState(0)
    const [Userlogin, setUserlogin] = useState(false)
 
    
    return(
        <UserContext.Provider value={{Userlogin, setUserlogin, cart, setCart , noOfProduct , setNoOfProduct, count, setCount, totalAmount, setTotalAmount}}>
        {children}
        </UserContext.Provider>
    )
}

