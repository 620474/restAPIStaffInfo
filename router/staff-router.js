const db = require('../db/db.js')
const express = require('express')
const {checkToken} = require('../api/auth.js')
const {staffCreateValidator} = require('../api/validation')
const staffRouter = express.Router();
const {addNewStaff,showAllStaff,showStaffById,deleteStaff} = require('../controllers/staff-controller')


staffRouter.route('/addStaff')
    .post(checkToken, staffCreateValidator, addNewStaff)

staffRouter.route('/')
    .get(showAllStaff)

staffRouter.route('/staff/:id')
    .get(checkToken, showStaffById)
    .post(checkToken, deleteStaff)

module.exports = staffRouter;
