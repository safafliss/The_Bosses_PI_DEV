import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function LoggedFBG({user1}) {
  console.log(user1)
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Lama App
        </Link>
      </span>
      {user1 ? (
        <ul className="list">
          <li className="listItem">
            <img
              referrerpolicy="no-referrer"
              src={user1.provider === 'facebook' ? user1.photos[0].value : user1.image.url}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user1.provider === 'facebook' ? user1.displayName:user1.firstName+' '+user1.lastName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};


export default LoggedFBG