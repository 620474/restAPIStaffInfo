const express = require('express')
const {checkToken} = require('../middleware/auth.js')
const {staffCreateValidator} = require('../middleware/validation')
const staffRouter = express.Router();
const {addNewStaffService,showAllStaffService,showStaffByIdService,deleteStaffService} = require('../controllers/staffController')


staffRouter.route('/registerNewStaff')
    .post(checkToken, staffCreateValidator, addNewStaffService)

staffRouter.route('/')
    .get(showAllStaffService)

staffRouter.route('/staff/:id')
    .get(checkToken, showStaffByIdService)
    .post(checkToken, deleteStaffService)

module.exports = staffRouter;
