const express = require('express');
const router = express.Router();
const { auth } = require('./../middleware/auth');
const {login, register, current} = require('../controllers/users');


// api/users/login
router.post('/login', login);
// api/users/register
router.post('/register', register);
// api/users/current
router.get('/current', auth, current);


module.exports = router;
