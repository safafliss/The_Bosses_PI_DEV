var express = require('express');
const { Register, Login, Test , updateProfile, Admin } = require('../controllers/users.controllers');
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



module.exports = router;
