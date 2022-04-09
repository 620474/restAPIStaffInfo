const express = require('express');
const {userValidator} = require('../middleware/validation');
const {authUserService, registerUserService} = require('../services/userService')

const userRouter = express.Router();

userRouter.route('/login',)
    .post(userValidator, authUserService)

userRouter.route('/registration')
    .post(userValidator, registerUserService)

module.exports = userRouter;
