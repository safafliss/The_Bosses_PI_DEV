import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace/> 
   } 

   if(user.isConnected){
    switch (user.role) {
        case 'PARTNER':
          return <Navigate to="/proffpage" replace />;
        case 'PARTICULAR':
          return <Navigate to="/particpage" replace />;
          case 'ASSOCIATION':
            return <Navigate to="/associpage" replace />;
          
        default:
          return <Navigate to="*" replace />;
      }
    }
   return children
}

export default PrivateRouter