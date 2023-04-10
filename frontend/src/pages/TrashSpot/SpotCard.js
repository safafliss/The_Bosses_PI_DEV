import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import axios from "axios";
import DeleteAcceptModal from './DeleteAcceptModal';
import CollectModal from './CollectModal';

function SpotCard(props) {
    const token = localStorage.getItem("jwt")
    const id = jwt_decode(token).id
    const [deleteTrash , setDeleteTrash] = useState(false)
    const [postedAt , setPostedAt] = useState('') 
    const [collectTrash, setCollectTrash] = useState(false)

    const deleteTrashSpot = ()=>{
        axios.post("http://localhost:3600/api/deleteATrashSpot",{id:props.trashSpots._id}).then((res)=>{
                if (res.data){
                    setDeleteTrash(false)
                    props.removeTrashFromAllTrashSpots(props.trashSpots)
              //show notification
            }else{
            }
          })
    }
    const updateTrash = ()=>{
        props.updateTrashSpot(props.trashSpots)
    }

    useEffect(()=>{
        setPostedAt(set_the_right_time(props.trashSpots.updatedAt))
    },[props.trashSpots.updatedAt])

    const  set_the_right_time =(posted_at)=>{
        var la_date = new Date().getTime() - new Date(posted_at).getTime()
        var days = Math.round(la_date/(1000*3600*24))
        var hours = Math.round(la_date/(1000*3600))
        var minutes = Math.round(la_date/(1000*60))
        if (days == 0 && hours == 0){
          return minutes + "min ago"
        }else{
          if (days == 0){
            return hours + "h ago"
          }
          return days + "d ago"
        }
      }

      const closeCollectModal = () =>{
        setCollectTrash(false)
      }
      
      
      const collectTrashUpdate = (trash) =>{
        props.collectTrashUpdate(trash)
      }

  return (
    <div id={props.trashSpots._id} className='container mt-2' style={{zIndex:5}}>
        <div className="card" style={{width: "100%"}}>
        {props.trashSpots.collected ?
        <div className='d-flex '>

        <div className="w-50">
        <h5 className='imageBefore'>Before</h5>
        <img className="card-img-top"  src={props.trashSpots.image.url} style={{height:"340px",borderBottom:".5px black solid"}} alt="Card image cap" />
        </div>
        <div className="w-50" >
        <h5 className='imageAfter'>After</h5>
        <img className="card-img-top imageAfterImage" src={props.trashSpots.collected_image.url} style={{height:"340px",borderBottom:".5px black solid"}} alt="Card image cap" />
        </div>
        </div>:
        <img className="card-img-top" src={props.trashSpots.image.url} style={{height:"340px",borderBottom:".5px black solid"}} alt="Card image cap" />}
        <div className="card-body">
            <div className='uploaderInformation d-flex justify-content-between'>
                <a  className='d-flex' href={"/formTrash/" +props.trashSpots.ownerId._id} style={{textDecoration: "none",color:'black'}}>
                <img src={props.trashSpots.ownerId.image.url}  style={{borderRadius:"50%",width:"70px"}} referrerPolicy='no-referrer' />
                <h4 className='align-self-center' style={{textAlign:"center"}}>&nbsp; {props.trashSpots.ownerId.firstName} &nbsp; {props.trashSpots.ownerId.lastName}</h4>
                </a>
                <p className='align-self-center' >{props.trashSpots.updatedAt!= props.trashSpots.createdAt ? 'Collected ':'Posted '} {postedAt}</p>
            </div>
            <div className='d-flex justify-content-around mt-3 mb-3'>
            <p className="card-title"><b>Trash Type:</b> {props.trashSpots.type}</p>
            <p className="card-text"><b>Trash Size:</b> {props.trashSpots.trashSize}</p>
            <p className="card-text"><b>Accessibility</b>: {props.trashSpots.accessTrash==false? 'Accessible':"Hard to access"}</p>
            </div>
            {props.trashSpots.description &&
            <p className="d-flex justify-content-start"><b>Description: &nbsp; </b>{props.trashSpots.description}</p>}
            {id != props.trashSpots.ownerId._id ?
            <div className='d-flex justify-content-between'>
                
                 {props.trashSpots.collected ?
                    <p className='align-self-center trashCollectedBy' style={{textAlign:"center"}}>Trash Collected by <b>{props.trashSpots.collected_by.firstName} {props.trashSpots.collected_by.lastName}</b></p>
                :<p></p>}
            <button className="btn btn-success" disabled={props.trashSpots.collected} value={"text"} onClick={()=> setCollectTrash(!collectTrash)}>{props.trashSpots.collected ? 'Collected':'Collect'}</button>
            </div>:
            <div className='d-flex justify-content-between'>
            <button onClick={()=>setDeleteTrash(true)} className="btn btn-danger">Delete</button>
            {deleteTrash &&
                <DeleteAcceptModal setDeleteTrash={setDeleteTrash} deleteTrashSpot={deleteTrashSpot}></DeleteAcceptModal>
            }
            {!props.trashSpots.collected &&
            <button  className="btn btn-warning" onClick={updateTrash}>Update</button>}
            {props.trashSpots.collected &&
            <p className='mt-1'>Trash Collected by <b>{props.trashSpots.collected_by.firstName} {props.trashSpots.collected_by.lastName}</b></p>
                }
            {props.trashSpots.collected ?
            <button className="btn btn-success" disabled>Collected</button>
            :<button  className="btn btn-success" onClick={()=> setCollectTrash(!collectTrash)}>Collect</button>}
            </div>
            }
        {collectTrash && <CollectModal collectTrashUpdate = {collectTrashUpdate} myid={id} closeCollectModal={closeCollectModal} trash = {props.trashSpots}></CollectModal> }
        </div>
        </div>
    </div>
            
  )
}

export default SpotCard