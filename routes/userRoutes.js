const express = require('express')
const router = express.Router();

const{register} = require('../controllers/register');
const{login} = require('../controllers/login');
const{searchUser} = require('../controllers/searchUser');
const{auth} = require('../middlewares/auth')

router.post('/register', register);
router.post('/login' , login);
router.get('/searchuser',auth,  searchUser)


module.exports = router