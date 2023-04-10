const mongoose = require("mongoose");
const MyObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// const UserModel = require('../models/users.models');
const TrashSpotModel = new Schema(
  {
    ownerId:{ type: MyObjectId, ref: 'user' },
    accessTrash:"boolean",
    trashSize: "string",
    type:"string",
    position: {
        longitude: {
          type: Number,
        },
        latitude: {
          type: Number,
        },
      },
    image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      description:"string",
      collected:{
        type:Boolean,
        default:false,
      },
      collected_image:{
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      collected_by:{ type: MyObjectId, ref: 'user' },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("trashSpot", TrashSpotModel);
