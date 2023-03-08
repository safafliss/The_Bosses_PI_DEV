var express = require('express');
const { Register, Login, Test , updateProfile, Admin,deleteProfile ,uploadImage ,banProfile } = require('../controllers/users.controllers');
const { ROLES,inRole } = require('../security/RoleMiddleware')
const passport = require('passport');
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




module.exports = router;