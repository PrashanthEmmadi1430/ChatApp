const express = require('express')
const {registerUser,logInUser,getUserDetails, logOut,updateUser, searchUsers} = require('../controllers/user-controller')

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',logInUser)
router.get('/user-details',getUserDetails)
router.get('/logout',logOut)
router.post('/update-user',updateUser)
router.post('/search-users',searchUsers)
module.exports = router