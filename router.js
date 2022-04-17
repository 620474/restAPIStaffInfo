const express = require('express');
const {userValidator} = require('./validation/validation');
const {authUser, registerUser} = require('./routes/user')
const {checkToken} = require('./middleware/auth.js')
const {staffCreateValidator} = require('./validation/validation')
const {addNewStaff,showAllStaff,showStaffById,deleteStaff} = require('./routes/staff')


const router = express.Router();

router.route('/login',)
    .post(userValidator, authUser)

router.route('/registration')
    .post(userValidator, registerUser)

router.route('/registerNewStaff')
    .post(checkToken, staffCreateValidator, addNewStaff)

router.route('/')
    .get(showAllStaff)

router.route('/staff/:id')
    .get(checkToken, showStaffById)
    .post(checkToken, deleteStaff)

module.exports = router;
