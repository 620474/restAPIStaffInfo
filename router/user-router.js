const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {usersValidator} = require('../api/validation');
const db = require('../db/db.js');
const {authUser,registerUser} = require('../controllers/user-controller')

const userRouter = express.Router();


userRouter.route('/login',)
    .post(usersValidator, authUser)

userRouter.route('/registration')

    .post(usersValidator, registerUser)

module.exports = userRouter;
