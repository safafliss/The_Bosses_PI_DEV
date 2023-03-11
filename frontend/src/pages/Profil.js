import React from 'react'
import { Logout } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Profil(user) {
  const dispatch = useDispatch()
  const LogoutHanlder = ()=>{
     dispatch(Logout())
  }
  return (
    <div>
       <Link className="btn btn-outline-primary"  to="#" onClick={LogoutHanlder}>
                Logout
              </Link>
    </div>
  )
}

export default Profil
