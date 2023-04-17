const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = new Schema(
  {
    firstName: 'string',
    lastName: 'string',
    password: 'string',
    role: {type: 'string' , default: 'PARTICULAR'},
    phoneNumber: 'string',
    organisationName: 'string',
    street: 'string',
    postalCode: 'string',
    city: 'string',
    state: 'string',
    gender: 'string',
    birthDate: 'Date',
    bio: 'string',
    banned: {
      isBanned: { type: Boolean, default: false },
      banDuration: 'Number',
      banExpiresAt: 'Date',
      banNumber: {
        type: 'Number',
        default: 0,
      },
    },
    email: {
      type: 'string',
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
      },
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', UserModel);
