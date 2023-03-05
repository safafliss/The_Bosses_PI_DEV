const { exists } = require("../models/users.models");
const UserModel = require("../models/users.models");
const validatorRegister = require("../validation/Register");
const validateLogin = require("../validation/Login")
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken')
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
          await UserModel.create(req.body);
          res.status(200).json({ message: "success" });
        }
      })
    }
  } catch (error) {
    res.status(404).json(error.message);
  }

  //await res.send('ok')
};

const Login = async(req, res) =>{
  const { errors, isValid } = validateLogin(req.body);
try{
if(!isValid){
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
          var token = jwt.sign({ 
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
           }, process.env.PRIVATE_KEY,  { expiresIn: '1h' });
           res.status(200).json({
             message: "success",
             token: "Bearer "+token
           })
        }
      })
    }
  })
}
} catch(error){
  res.status(404).json(error.message);
}
}

const Test = (req, res) =>{
  res.send("Je suis la page test")
}
module.exports = { Register, Login, Test };
