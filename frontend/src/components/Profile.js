import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {setUser} from "../redux/actions/authActions"
import jwt_decode from 'jwt-decode';
import { setAuth } from '../util/setAuth';
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Profile = (props) => {
  const { handleClose, show } = props;
  const type = Object.keys(props).includes("show")
  const showHideClassName = "modal" //show ? "modal display-block" : "modal display-none";
  var showHideStyle = show ? {display: "block"} : {display: "none"};
  if (!type){
     showHideStyle = {display: "block"};
  }
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    console.log(pictureSrc);

    UpdateImage(pictureSrc);
  });
  const UpdateImage = async (image) => {
    if (!type){
      const response = await axios.put(`http://localhost:3600/api/loginImage`, {
        image: image,
      });
    }
    else{
     await axios.put(`http://localhost:3600/api/checkImage`, {
        image: image,
      }).then((response)=>{
        const { token } = response.data;
        localStorage.setItem('jwt', token);
        const decode = jwt_decode(token);
        setUser(decode);
        setAuth(token);
      })
    }
  
  };
  return (
    <div className={showHideClassName} style={showHideStyle}>
      <section className="modal-main">
        <h2 className="mb-5 text-center">
          React Photo Capture using Webcam Examle
        </h2>
        <div>
          {picture == "" ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={picture} />
          )}
        </div>
        <div>
          {picture != "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setPicture();
              }}
              className="btn btn-primary"
            >
              Retake
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="btn btn-danger"
            >
              Capture
            </button>
          )}
        </div>
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};
export default Profile;
