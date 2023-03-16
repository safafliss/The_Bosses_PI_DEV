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
  DeleteProfile,
  uploadImage,
  banProfile,
  resetpassword,
  forgotpassword,
  AddProfile,
  FindSingleProfile,
  FindAllProfiles,
} = require('../controllers/users.controllers');
const { ROLES, inRole } = require('../security/RoleMiddleware');
const passport = require('passport');
const resetPasswordToken = require('../models/resetPasswordToken');
const usersModels = require('../models/users.models');
var router = express.Router();
const CLIENT_URL = 'http://localhost:3000/';

/* users routes. */

//? sign in
router.post('/register', Register);

//? log in
router.post('/login', Login);

router.post('/resetpassword/:token', resetpassword);
router.post('/forgotpassword', forgotpassword);

//? GET all users
router.get(
  '/getUsers',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  getUsers
);

//? GET a single user
router.get(
  '/getUser/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
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

router.post(
  '/profiles',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  AddProfile
);
router.get(
  '/profiles',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  FindAllProfiles
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  FindSingleProfile
);

router.put(
  '/updateProfile',
  passport.authenticate('jwt', { session: false }),
  updateProfile
);

router.delete(
  '/profiles/:id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile
);

router.post(
  '/uploadImage',
  passport.authenticate('jwt', { session: false }),
  uploadImage
);
router.post(
  '/banProfile',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  banProfile
);
router.get('/verify/:user_id/:token', async function (req, res) {
  const user_id = req.params.user_id;
  const token = req.params.token;
  const token_result = await resetPasswordToken.findOne({
    userId: user_id,
    token: token,
  });
  if (token_result) {
    const user = await usersModels.findByIdAndUpdate(user_id, {
      isValid: true,
    });
    token_result.deleteOne();
    res.send('User verified');
  } else {
    const deleteUser = await resetPasswordToken
      .findOne({ userId: user_id })
      .then((token_here) => {
        if (!token_here) {
          const user = usersModels.findByIdAndDelete(user_id);
        }
      });
    res.status(403).send('Invalid token');
  }
});
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
