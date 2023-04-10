import React from "react";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import MapTrashSpot from "../../components/MapTrashSpot";
import "./TrashSpot.css";
import { useState, useEffect } from "react";
import NoAccess from "../NoAccess";
import axios from "axios";
import SpotCard from "./SpotCard";
import jwt_decode from "jwt-decode";
import AddUpdateModal from "./AddUpdateModal";
import RankingTrashPage from "./RankingTrashPage";
function TrashSpotHome(props) {
  if (props.user.isConnected && props.user.role == "PARTICULAR") {
  } else {
    return <NoAccess />;
  }
  const options = [
    { value: "", text: "--Choose a type--" },
    { value: "plastic", text: "Plastic" },
    { value: "steel", text: "Steel" },
    { value: "paper", text: "Paper" },
    { value: "other", text: "Other..." },
  ];

  const token = localStorage.getItem("jwt");
  const id = jwt_decode(token).id;
  const webcamRef = React.useRef(null);
  const [currentLat, setCurrLat] = useState(0);
  const [currentLong, setCurrLong] = useState(0);
  const [type, setType] = useState(options[0].value);
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const [accessTrash, setAccessTrash] = useState(false);
  const [trashSize, setTrashSize] = useState("small");
  const [imageName, setImageName] = useState("");
  const [positionLat, setPositionLat] = useState(0);
  const [positionLng, setPositionLng] = useState(0);
  const [description, setDescription] = useState("");
  const [trashSpots, setTrashSpots] = useState([]);
  const [allTrashSpots, setAllTrashSpots] = useState([]);
  const [trashMarks, setTrashMarks] = useState([]);
  const [idTrash, setIdTrash] = useState(-1);
  const [mapMarkerRemoverTrigger, setMapMarkerRemover] = useState("")
  const [addMapMarker, setAddMapMarker] = useState({})
  const [updateTrigger, setUpdateTrigger] = useState(0); // integer state
  const [rankingModel, setRankingModel] = useState(0);

  
  const [rankingPersons, setRankingPersons] = useState([]) 
  useEffect(() => {
  if (rankingPersons.length==0){
      
      axios.get("http://localhost:3600/api/getTrashRanks").then((res) => {
          if (res.data){
              setRankingPersons(res.data)
              console.log(res.data)
          }
      });
  }
    }, []);

  useEffect(() => {
    
    axios.get("http://localhost:3600/api/getAllTrashSpots").then((res) => {
      setAllTrashSpots(res.data);
      setTrashMarks(
        res.data.map((trash) => ({
          id: trash._id,
          longitude: trash.position.longitude,
          latitude: trash.position.latitude,
          ownerId: trash.ownerId._id,
          type: trash.type,
        }))
      );
      setTrashSpots(
        res.data.filter((trash) => {
          if (trash.ownerId._id != id) return trash;
        })
      );
    });
  }, []);

  const uploadTrashPicture = (event) => {
    if (event.target.files.length > 0) {
      if (event.target.files[0].size < 11104900) {
        if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/i))
          setError("You must upload an image");
        else setFileToBase(event.target.files[0]);
      } else {
        setError("Image size must be < 10Mb");
      }
    }
  };

  const setFileToBase = (file) => {
    setImageName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture(reader.result);
      //setData(data);
    };
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrLat(position.coords.latitude);
      setCurrLong(position.coords.longitude);
    });
  }, []);

  const [openModalToggle, setOpenModalToggle] = useState(false);

  const openCloseModal = () => {
    if (openModalToggle) {
      setOpenModalToggle(false);
      emptyModalVariables();
    } else {
      setOpenModalToggle(true);
    }
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleSelection = (event) => {
    setTrashSize(event.target.value);
  };

  const handleAccessTrash = (event) => {
    setAccessTrash(!accessTrash);
  };

  const emptyModalVariables = () => {
    setPicture("");
    setTrashSize("small");
    setType("");
    setImageName("");
    setError("");
    setPositionLat(0);
    setPositionLng(0);
    setDescription("")
    setAccessTrash(false)
    setIdTrash(-1);
    setError("");
  };

  const updateTrashSpot = (trash) => {
    openCloseModal();
    setIdTrash(trash._id);
    setPositionLat(trash.position.latitude);
    setPositionLng(trash.position.longitude);
    setPicture(trash.image.url);
    setTrashSize(trash.trashSize);
    setAccessTrash(trash.accessTrash);
    setDescription(trash.description);
    setType(trash.type);
    setAddMapMarker({})
    
  };

  const addTrashSpot = (trash)=>{
    setAllTrashSpots(allTrashSpots.filter((tr)=> trash._id!= tr._id))
    setAllTrashSpots(allTrashSpots=> [trash,...allTrashSpots]) 
    setAddMapMarker({
      id: trash._id,
      longitude: trash.position.longitude,
      latitude: trash.position.latitude,
      ownerId: trash.ownerId._id,
      type: trash.type,
    })
    removeTrashFromMap(trash._id)
    setTrashMarks(()=>[...trashMarks,{
      id: trash._id,
      longitude: trash.position.longitude,
      latitude: trash.position.latitude,
      ownerId: trash.ownerId._id,
      type: trash.type,
    }])
    setUpdateTrigger(updateTrigger+1)
  }

  const saveUpdateTrash = () => {
    if (picture != "") {
      if (type != "" && type != "other") {
        if (positionLat != 0) {
          axios
            .post("http://localhost:3600/api/addTrashSpot", {
              idTrash: idTrash,
              image: picture,
              type: type,
              position: { long: positionLng, lat: positionLat },
              accessTrash: accessTrash,
              trashSize: trashSize,
              description: description,
            })
            .then((res) => {
              if (res.data) {
                addTrashSpot(res.data)
                openCloseModal();
                emptyModalVariables();
                //show notification
              } else {
                setError(res.data);
              }
            });
        } else {
          setError("You need to choose a place");
        }
        setError("Please wait...");
      } else {
        setError("You need to select a type for the trash!");
      }
    } else {
      setError("A picture of the Trash is needed!");
    }
  };

  useEffect(()=>{
      if (updateTrigger==-2){
      showAllTrashSpotsSaufMine()
      }else{
        showMyTrashSpots()
      }
  },[updateTrigger])


  const getSelectedPositionFromChild = (position) => {
    setPositionLat(position.lat);
    setPositionLng(position.long);
  };

  const openDialog = () => {
    document.getElementById("fileid").click();
  };

  const showMyTrashSpots = () => {
    setRankingModel(0)
    setTrashSpots(
      allTrashSpots.filter((trash) => {
        if (trash.ownerId._id == id) return trash;
      })
    );
  };


  const showAllTrashSpotsSaufMine = () => {
    setRankingModel(0)
    setTrashSpots(
      allTrashSpots.filter((trash) => {
        if (trash.ownerId._id != id) return trash;
      })
    );
  };

  const removeTrashFromAllTrashSpots = (trash) => {
    allTrashSpots.splice(
      allTrashSpots.findIndex((a) => a._id === trash._id),
      1
    );
    trashMarks.splice(trashMarks.findIndex((a) => a.id === trash._id),
    1)
    removeTrashFromMap(trash._id)
    showMyTrashSpots();
  };

  const removeTrashFromMap=(id)=>{
      setMapMarkerRemover(id)
  }

  const collectTrashUpdate = (trash) =>{
    console.log("accessed",trash)
    setAllTrashSpots(allTrashSpots.filter((tr)=> trash._id!= tr._id))
    setAllTrashSpots(allTrashSpots =>[trash,...allTrashSpots])
    if (trash.ownerId._id==id){
      
    setUpdateTrigger(-1)
      showMyTrashSpots()
    }else{
      
    setUpdateTrigger(-2)
    }
  }



  return (
    <>
      <Navbar />
      <div className="d-flex ">
        <div className="leftSide" style={{ width: "710px" }}>
          <div className="container ">
            <div
              className="buttonsTrash"
            >
              <button
                className="trashSpotButtons btn"
                onClick={showAllTrashSpotsSaufMine}
              >
                All trash spots
              </button>
              <button
                className="trashSpotButtons btn"
                onClick={showMyTrashSpots}
              >
                My trash spots
              </button>
              <button
                className="trashSpotButtons btn "
                onClick={()=>setRankingModel(1)}
              >
                Ranking
              </button>
            </div>
            <div className="trashContainer">
            {trashSpots.length > 0 && !rankingModel ?
              trashSpots.map((trash) => (
                <SpotCard
                  key={trash._id}
                  updateTrashSpot={updateTrashSpot}
                  trashSpots={trash}
                  removeTrashFromAllTrashSpots={removeTrashFromAllTrashSpots}
                  collectTrashUpdate = {collectTrashUpdate}
                ></SpotCard>
              )):
              <RankingTrashPage rankingPersons={rankingPersons}></RankingTrashPage>
              }
              </div>
          </div>
        </div>
        <MapTrashSpot
          currLat={currentLat}
          currLong={currentLong}
          getPosition={getSelectedPositionFromChild}
          openCloseModal={openCloseModal}
          trashMarks={trashMarks}
          showAllTrashSpotsSaufMine={showAllTrashSpotsSaufMine}
          showMyTrashSpots={showMyTrashSpots}
          myid={id}
          mapMarkerRemoverTrigger = {mapMarkerRemoverTrigger}
          addMapMarker = {addMapMarker} 
        ></MapTrashSpot>
      </div>
      {openModalToggle === true && (
        <AddUpdateModal
          description={description}
          openCloseModal={openCloseModal}
          setDescription={setDescription}
          picture={picture}
          uploadTrashPicture={uploadTrashPicture}
          openDialog={openDialog}
          imageName={imageName}
          handleChange={handleChange}
          options={options}
          type={type}
          trashSize={trashSize}
          handleSelection={handleSelection}
          handleAccessTrash={handleAccessTrash}
          accessTrash={accessTrash}
          error={error}
          saveUpdateTrash={saveUpdateTrash}
          idTrash={idTrash}
        />
      )}
    </>
  );
}

export default TrashSpotHome;
