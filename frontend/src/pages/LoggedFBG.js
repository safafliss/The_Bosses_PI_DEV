import React, { useEffect, useState } from 'react'

function LoggedFBG() {
    const [userfbg,setuserfbg]=useState(null)
    useEffect(() => {
        const getUser = () => {
          fetch("http://localhost:3000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
              setuserfbg(resObject.user);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
      }, []);
  return (
    <div className="navbar">
      <a href='/login'>Logout</a>
      logged in successfully
    </div>
  )
}

export default LoggedFBG