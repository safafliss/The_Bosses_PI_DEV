var express = require('express');
const { Register, Login, Test } = require('../controllers/users.controllers');
const passport = require('passport');
var router = express.Router();


/* users routes. */
router.post('/register', Register );
router.post('/login', Login );


/* test router */
router.get('/test',passport.authenticate('jwt', { session: false}), Test);



module.exports = router;
