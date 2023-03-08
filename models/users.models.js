const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const UserModel = new Schema(
  {
    firstName: "string",
    lastName: "string",
    password: "string",
    role: "string",
    phoneNumber:"string",
    organisationName:"string",
    address:{
      street:"string",
      postalCode:"string",
      city:"string",
      state:"string"
    },
    banned:{
      isBanned:"boolean",
      banDuration:"Number",
      banExpiresAt:"Date",
      banNumber:{
        type:"Number",
        default:0
      }
    },
    email: {
      type: "string",
      trim: true,
      unique: true,
    },
    image: {
      public_id: {
          type: String,
          // required: true
      },
      url: {
          type: String,
          // required: true
      }
  }
  },
  {
    timestamps: true,
  }
);





module.exports = mongoose.model("users", UserModel);