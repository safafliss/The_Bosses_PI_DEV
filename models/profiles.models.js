const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
{
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required : true
    },
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
      banNumber:"Number"
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
    }}
);

module.exports = mongoose.model("profiles", UserProfile);