var express = require('express');
const {
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
} = require('../controllers/users.controllers');
const { ROLES, inRole } = require('../security/RoleMiddleware');
const passport = require('passport');
var router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

/* users routes. */

//? sign in
router.post('/register', Register);

//? log in
router.post('/login', Login);

//? GET all users
router.get(
  '/getUsers',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN.ADMIN),
  getUsers
);

//? GET a single user
router.get(
  '/getUser/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN.ADMIN),
  getSingleUser
);

//? DELETE a user
router.delete(
  '/deleteUser/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN.ADMIN),
  deleteUser
);





/* test router */
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER.PARTICULIER),
  Test
);
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER),
  Admin
);
router.put(
  '/updateProfile',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ASSOCIATION),
  updateProfile
);
router.delete(
  '/deleteProfile',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.USER),
  deleteProfile
);
router.post(
  '/uploadImage',
  passport.authenticate('jwt', { session: false }),
  uploadImage
);
router.post(
  '/banProfile',
  passport.authenticate('jwt', { session: false }),
  banProfile
);

/* authentication with fb && google */
// router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", { scope: ["profile"] })
// );

// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );


module.exports = router;