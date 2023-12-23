import React, { useState } from "react";
import {UserContext} from "./Context";

export const UserContextProvider = ({children}) => {
    
    const [cart, setCart] = useState([])
    const [noOfProduct, setNoOfProduct] = useState(0)
 
    
    return(
        <UserContext.Provider value={{cart, setCart , noOfProduct , setNoOfProduct}}>
        {children}
        </UserContext.Provider>
    )
}

