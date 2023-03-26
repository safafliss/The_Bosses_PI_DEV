var express = require('express');
const {
  Register,
  Login,
  updateProfile,
  getUsers,
  getSingleUser,
  deleteUser,
  deleteProfile,
  uploadImage,
  resetpassword,
  forgotpassword,
  loginImage,
  checkLoginByImage
} = require('../controllers/users.controllers');

var router = express.Router();

const { ROLES, inRole } = require('../security/RoleMiddleware');

const resetPasswordToken = require('../models/resetPasswordToken');
const usersModels = require('../models/users.models');
const jwt = require('jsonwebtoken');
const passport = require("passport");

/* users routes. */
//? sign in
router.post('/register', Register);

//? log in
router.post('/login', Login);

router.post('/resetpassword/:token',resetpassword);

router.post('/forgotpassword', forgotpassword)

//? GET all users
router.get(
  '/getUsers',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  getUsers
);

//? DELETE user
router.delete(
  '/deleteUser/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN.ADMIN),
  deleteUser
);

router.get('/getUser/:id', 
passport.authenticate("jwt", { session: false }),
getSingleUser);

router.put('/getImage/:id', 
passport.authenticate("jwt", { session: false }),
uploadImage);

router.put('/loginImage',  
passport.authenticate("jwt", { session: false }),
loginImage);

router.put('/checkImage',
checkLoginByImage);


//? UPDATE profile
router.put("/updateUser/:id", updateProfile)

//? DELETE profile
router.delete('/deleteProfile',passport.authenticate('jwt', { session: false}),inRole(ROLES.USER), deleteProfile);



router.get('/verify/:user_id/:token', async function(req,res){
    const user_id = req.params.user_id;
    const token = req.params.token;
    // const token_result = await resetPasswordToken.findOne({userId:user_id,token:token});
    await resetPasswordToken.find({token:token}).then((Valid) =>{
      if (Valid){
        usersModels.findByIdAndUpdate(user_id,{isValid:true}).then((exists)=>{
          if (exists){
            var token = jwt.sign({ 
              id: exists._id,
              role: exists.role
             }, process.env.PRIVATE_KEY,  { expiresIn: '90h' });
             res.status(200).json({
               message: "success",
               token: "Bearer "+token
             })
             resetPasswordToken.deleteOne({token:token})
          }
        })
      }else{ 
        // const user = usersModels.findByIdAndDelete(user_id);
        console.log("not valid")
        res.status(403).send("not verified")
       }})
});




module.exports = router;