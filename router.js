const express = require('express');
const {userValidator} = require('./validation/validation');
const {authUserService, registerUserService} = require('./routes/user')
const {checkToken} = require('./middleware/auth.js')
const {staffCreateValidator} = require('./validation/validation')
const {addNewStaffService,showAllStaffService,showStaffByIdService,deleteStaffService} = require('./routes/staff')


const router = express.Router();

router.route('/login',)
    .post(userValidator, authUserService)

router.route('/registration')
    .post(userValidator, registerUserService)

router.route('/registerNewStaff')
    .post(checkToken, staffCreateValidator, addNewStaffService)

router.route('/')
    .get(showAllStaffService)

router.route('/staff/:id')
    .get(checkToken, showStaffByIdService)
    .post(checkToken, deleteStaffService)

module.exports = router;
