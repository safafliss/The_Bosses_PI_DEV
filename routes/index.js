var express = require('express');
const { Register, Login, Test , updateProfile, Admin,deleteProfile ,uploadImage ,banProfile } = require('../controllers/users.controllers');
const { ROLES,inRole } = require('../security/RoleMiddleware')
const passport = require('passport');
const resetPasswordToken = require('../models/resetPasswordToken');
const usersModels = require('../models/users.models');
var router = express.Router();


/* users routes. */
router.post('/register', Register );
router.post('/login', Login );





/* test router */
router.get('/test',passport.authenticate('jwt', { session: false}), inRole(ROLES.USER.PARTICULIER), Test);
router.get('/admin',passport.authenticate('jwt', { session: false}), inRole(ROLES.USER), Admin);
router.put('/updateProfile',passport.authenticate('jwt', { session: false}),inRole(ROLES.ASSOCIATION), updateProfile);
router.delete('/deleteProfile',passport.authenticate('jwt', { session: false}),inRole(ROLES.USER), deleteProfile);
router.post('/uploadImage',passport.authenticate('jwt', { session: false}), uploadImage);
router.post('/banProfile',passport.authenticate('jwt', { session: false}), banProfile);
router.get('/verify/:user_id/:token', async function(req,res){
    const user_id = req.params.user_id;
    const token = req.params.token;
    const token_result = await resetPasswordToken.findOne({userId:user_id,token:token});
    if (token_result){
        const user = await usersModels.findByIdAndUpdate(user_id,{isValid:true})
        token_result.deleteOne()
        res.send("User verified")
    }else{
        const deleteUser = await resetPasswordToken.findOne({userId:user_id}).then(token_here=>{
            if (!token_here){
                const user = usersModels.findByIdAndDelete(user_id);
            }
        })
        res.status(403).send("Invalid token")
    }
});




module.exports = router;
