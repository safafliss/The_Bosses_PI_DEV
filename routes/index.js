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
} = require('../controllers/users.controllers');
const { ROLES, inRole } = require('../security/RoleMiddleware');
const passport = require('passport');
var router = express.Router();

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

module.exports = router;
