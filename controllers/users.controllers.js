const { exists } = require('../models/users.models');
const UserModel = require('../models/users.models');
const validatorRegister = require('../validation/Register');
const validateLogin = require('../validation/Login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const Register = async (req, res) => {
  const { errors, isValid } = validatorRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = 'user exist';
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10);
          req.body.password = hash;
          req.body.role = 'USER';
          await UserModel.create(req.body);
          res.status(200).json({ message: 'success' });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }

  //await res.send('ok')
};

const Login = async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = 'not found user';
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = 'incorrect password';
              res.status(404).json(errors);
            } else {
              var token = jwt.sign(
                {
                  id: user._id,
                  // firstName: user.firstName,
                  // lastName: user.firstName,
                  // email: user.email,
                  role: user.role,
                },
                process.env.PRIVATE_KEY,
                { expiresIn: '1h' }
              );
              res.status(200).json({
                message: 'success',
                token: 'Bearer ' + token,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Test = (req, res) => {
  res.send(req.user);
};
const Admin = (req, res) => {
  res.send(req.user);
};

const updateProfile = async (req, res) => {
  try {
    //
    if ('password' in req.body) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;
    }
    await UserModel.findByIdAndUpdate(req.user._id, { $set: req.body });
    res.status(200).json(Object.keys(req.body));
  } catch (error) {
    res.json(error);
  }
};

const getUsers = async (req, res) => {
  const users = await UserModel.find({}).sort({ createdAt: -1 });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(401).json({ error: res.error });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  const user = await UserModel.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  res.status(200).json(user);
};

module.exports = {
  Register,
  Login,
  Test,
  updateProfile,
  Admin,
  getUsers,
  getSingleUser,
  deleteUser,
};
