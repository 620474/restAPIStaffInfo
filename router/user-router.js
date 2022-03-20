const express = require('express');
const {usersValidator} = require('../api/validation');
const {authUser,registerUser} = require('../controllers/user-controller')

const userRouter = express.Router();

userRouter.route('/login',)
    .post(usersValidator, authUser)

userRouter.route('/registration')

    .post(usersValidator, registerUser)

module.exports = userRouter;
