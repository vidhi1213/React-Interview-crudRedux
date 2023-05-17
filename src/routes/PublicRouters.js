import React from 'react'
import { Navigate  } from "react-router-dom";
import Cookies from 'universal-cookie';

function PublicRouters({children}) {
    const cookies = new Cookies();
    let token =  cookies.get('userdata');
  return (
    <>
    {   
        token ? <Navigate to='/dashboard' /> : children           
    }   
    </>
  )
}


export default PublicRouters
