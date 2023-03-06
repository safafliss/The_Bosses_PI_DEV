var express = require('express');
const { Register, Login, Test, Admin } = require('../controllers/users.controllers');
const passport = require("passport");
var router = express.Router();
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile } = require('../controllers/profile.controllers');

/* users routes. */
router.post('/register', Register );
router.post('/login', Login );

/* test router */
// router.get('/test',passport.authenticate('jwt', { session: false}), inRole(ROLES.USER), Test);
// router.get('/admin',passport.authenticate('jwt', { session: false}), inRole(ROLES.USER), Admin);

/* add profile route */
router.post("/profiles", 
passport.authenticate("jwt", { session: false }),
AddProfile);

/* get all profiles */
router.get("/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
FindAllProfiles);

/* get one profiles */
router.get("/profile", 
passport.authenticate("jwt", { session: false }),
FindSingleProfile);

/* delete profile */
router.delete("/profiles/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.ADMIN),
DeleteProfile);


module.exports = router;