import React from "react";

export const Popup = ({text, top})=>{
    return(
        <div className={"flex flex-row absolute  py-2 bg-red-600  text-white top-36 w-4/5  justify-center rounded" }>
                <text className=" text-md">{text}</text>
        </div>
    )

}