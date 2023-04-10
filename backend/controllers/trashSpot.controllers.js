const trashSpot = require("../models/trashSpotModel")
const UserModel = require("../models/users.models")
const cloudinary = require('../utils/cloudinary');


const addTrashSpot = async (req,res) =>{
    try {
        const {idTrash,image,type,position,accessTrash,trashSize,description} = req.body
        const ownerId = req.user._id
        const result = await cloudinary.uploader.upload(image, {
          folder: 'trashSpotImages',
        });
        const imageUploaded = {
            public_id: result.public_id,
            url: result.secure_url,
          }
          var data;
        if (idTrash!=-1){
         data = await trashSpot.findOneAndUpdate({ownerId:ownerId,_id:idTrash},{image:imageUploaded,type:type,position:{latitude:position.lat,longitude:position.long},description:description,accessTrash:accessTrash,trashSize:trashSize},{
            new:true
        }).populate({
            path: 'ownerId',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         }).populate({
            path: 'collected_by',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         });
        }else{
         data = await trashSpot.create({ownerId:ownerId,image:imageUploaded,type:type,position:{latitude:position.lat,longitude:position.long},description:description,accessTrash:accessTrash,trashSize:trashSize})
         data = await data.populate({
            path: 'ownerId',
            model: UserModel,
            select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
         });
        }
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const getAllTrashSpots = async (req,res) =>{
    try {
            const data = await trashSpot.find().populate({
                path: 'ownerId',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path: 'collected_by',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             });
            res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const collectTrash = async (req,res) =>{
    try {
        const {id,image,honorSign,collectedBy} = req.body
        const result = await cloudinary.uploader.upload(image, {
          folder: 'trashSpotCollectedImages',
        });
        const imageUploaded = {
            public_id: result.public_id,
            url: result.secure_url,
          }
        if (honorSign){
            const result = await trashSpot.findByIdAndUpdate( { _id: id },{collected_image:imageUploaded,collected_by:collectedBy,collected:true},{new: true}).populate({
                path: 'ownerId',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             }).populate({
                path: 'collected_by',
                model: UserModel,
                select: { '_id': 1,'firstName':1,'lastName':1,'image':1},
             });
             res.send(result)
        }else{
            res.send("error")
        }

    } catch (error) {
        res.send(error)
    }
}

const deleteATrashSpot = async (req,res) =>{
    try {
            const {id} = req.body
            const trash = await trashSpot.findOneAndDelete({_id:id,ownerId:req.user._id})
            res.send("Deleted!")
    } catch (error) {
        res.send(error)
    }
}

const getTrashRanks = async (req,res) =>{
    try {
        var finalResult = []
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 
        const ownerIds =await trashSpot.find({ createdAt: { $gte: sevenDaysAgo } }).distinct("ownerId")
    for (let id of ownerIds){
        const person =  await  UserModel.findById(id,{firstName:1,lastName:1,email:1, _id:1})
        var dataperson = {}
        dataperson["id"] = person.id
       dataperson["firstName"] = person.firstName
       dataperson["lastName"] = person.lastName
       dataperson["email"] = person.email
       
       await  trashSpot.find({ createdAt: { $gte: sevenDaysAgo } }).count({ownerId:person._id}).then((result) =>{
            dataperson["countPostedTrash"] = result
            dataperson["pointsOfPostedTrash"] = result * 10
        }) 
        dataperson["countCollectedTrash"] = 0
        dataperson["pointsOfCollectedTrash"] = 0
        dataperson["totalPoints"] = 0
        finalResult.push(dataperson)

    }
    const collected_by = await trashSpot.find({ updatedAt: { $gte: sevenDaysAgo } }).distinct("collected_by")
    for (let id of collected_by){
        let indexInFinalResult = finalResult.findIndex(per => per.id == id)
        let dataperson = {}
        const countCollected = await  trashSpot.find({ updatedAt: { $gte: sevenDaysAgo } }).count({collected_by:id})
        dataperson["countCollectedTrash"] = countCollected
        dataperson["pointsOfCollectedTrash"] = countCollected * 50
        if (indexInFinalResult>-1){
            finalResult[indexInFinalResult]["countCollectedTrash"] = dataperson["countCollectedTrash"]
            finalResult[indexInFinalResult]["pointsOfCollectedTrash"] = dataperson["pointsOfCollectedTrash"]
            finalResult[indexInFinalResult]["totalPoints"] = dataperson["pointsOfCollectedTrash"] + finalResult[indexInFinalResult]["pointsOfPostedTrash"]
        }else{
            let person = await UserModel.findById(id,{firstName:1,lastName:1,email:1, _id:1})
            dataperson["id"] = person.id
            dataperson["firstName"] = person.firstName
            dataperson["lastName"] = person.lastName
            dataperson["email"] = person.email
            dataperson["countPostedTrash"] = 0
            dataperson["pointsOfPostedTrash"] = 0
            dataperson["totalPoints"] = dataperson["pointsOfCollectedTrash"] + dataperson["pointsOfPostedTrash"]
            finalResult.push(dataperson)
        }
    }
        finalResult.sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1))
        res.send(finalResult)
    } catch (error) {
        res.send(error)
    }
}

module.exports = { addTrashSpot,getAllTrashSpots,deleteATrashSpot,collectTrash,getTrashRanks};