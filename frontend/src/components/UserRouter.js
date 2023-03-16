import React from 'react'
import { Navigate } from 'react-router-dom'

const UserRouter = ({user, children}) =>{
    console.log(user.role)

    


    // if(user.isConnected && user.role === "PARTNER"){
    //     console.log("ena PARTNER")
    //   return <Navigate to="/proffpage" replace/> 

    // } else{ if(user.isConnected && user.role === "PARTICULAR"){
    //     console.log("ena PARTICULAR")
    //   return <Navigate to="/particpage" replace/> 
    // }
    // else{ if(user.isConnected && user.role === "ASSOCIATION"){
    //     console.log("ena association")
    //   return <Navigate to="/associpage" replace/> 
      
    // }
  
    // }
    // }
    
    return children
  }
  
  export default UserRouter