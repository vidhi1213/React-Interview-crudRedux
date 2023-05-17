import React from 'react'
import {  Navigate  } from "react-router-dom";
import Cookies from 'universal-cookie';


const PrivateRouters = ({children}) =>  {
    const cookies = new Cookies();
    return (
        <>
        {   
            !cookies.get('userdata') ? <Navigate to='/' /> : children     
        }   
        </>
       
    )
}


export default PrivateRouters
