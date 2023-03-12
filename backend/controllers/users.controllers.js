const { exists } = require("../models/users.models");
const UserModel = require("../models/users.models");
const validatorRegister = require("../validation/Register");
const validateLogin = require("../validation/Login")
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken')
const cloudinary = require("../utils/cloudinary")
const crypto = require("crypto");
const resetPasswordToken = require("../models/resetPasswordToken");



const Register = async (req, res) => {
  const { errors, isValid } = validatorRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({email: req.body.email})
      .then(async(exist) =>{
        if(exist){
          errors.email = "user exist"
          res.status(404).json(errors)
        }else{
          const hash = bcrypt.hashSync(req.body.password, 10)
          req.body.password = hash; 
          req.body.role = "USER";
          user = await UserModel.create(req.body);
          generateResetToken(user._id);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }

  //await res.send('ok')
};

const generateResetToken = async (userid) =>{
  tokken = crypto.randomBytes(32).toString("hex")
  await resetPasswordToken.create({userId:userid,token:tokken});
  //send email with token url here
}

const Login = async(req, res) =>{
  const { errors, isValid } = validateLogin(req.body);
try{
if(!isValid){a
res.status(404).json(errors)
}else{
  UserModel.findOne({email: req.body.email})
  .then(user =>{
    if(!user){
      errors.email = "not found user"
      res.status(404).json(errors)
    }else{
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch=>{
        if(!isMatch){
          errors.password = "incorrect password"
          res.status(404).json(errors)
        }else{
          resetPasswordToken.findOne({userId:user._id}).then(notValid =>{
            if (notValid){
            res.status(403).json({
              message:"Please Verify your account before loggin (check email)",
            })
            }else{  
                if (user.isValid == false){
                  user.deleteOne();
                  res.status(403).json({
                    message:"user is not found",
                  })
                }else{
                  var token = jwt.sign({ 
                    id: user._id,
                    // firstName: user.firstName,
                    // lastName: user.firstName,
                    // email: user.email,
                    role: user.role
                   }, process.env.PRIVATE_KEY,  { expiresIn: '90h' });
                   res.status(200).json({
                     message: "success",
                     token: "Bearer "+token
                   })
                }
            }
          })}
      });
    }
  } )
}
}catch (error) {
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

const deleteProfile = async (req, res) => {
  try {
    await UserModel.findByIdAndRemove(req.body.id);
    res.status(200).json('done');
  } catch (error) {
    res.json(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: 'profilePictures',
    });
    const profile = await UserModel.findByIdAndUpdate(req.user._id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(200).json('done');
  } catch (error) {
    res.json(error);
  }
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const banProfile = async (req, res) => {
  try {
    const { user_id, banDuration } = req.body;
    var date = new Date();
    const profile = await UserModel.findByIdAndUpdate(
      user_id,
      { $inc: { 'banned.banNumber': 1 } },
      {
        banned: {
          isBanned: true,
          banDuration: banDuration,
          banExpiresAt: date.addDays(parseInt(banDuration)),
        },
      }
    );
    res.status(200).json('done');
  } catch (error) {
    res.json(error);
  }

  
}


module.exports = {
  Register,
  Login,
  Test,
  updateProfile,
  Admin,
  getUsers,
  getSingleUser,
  deleteUser,
  deleteProfile,
  uploadImage,
  banProfile,
}