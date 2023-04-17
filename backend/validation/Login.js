const isEmpty = require('./isEmpty');
const validator = require('validator');
const UserModel = require('../models/users.models');

module.exports = async function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  let user = await UserModel.findOne({ email: data.email }).then(
    async (user) => {
      if (user.banned.isBanned) {
        return true;
      } else if (
        user.banned.isBanned &&
        new Date() > user.banned.banExpiresAt
      ) {
        user.banned.isBanned = false;
        await UserModel.findOneAndUpdate({ _id: user._id }, user, {
          new: true,
        }).then((result) => {
          res.status(200).json(result);
        });
        return false;
      } else {
        return false;
      }
    }
  );

  if (!validator.isEmail(data.email)) {
    errors.email = 'Required format email';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Required email';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Required password';
  }
  if (user == true) {
    errors.banned = 'You are banned till ...';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
