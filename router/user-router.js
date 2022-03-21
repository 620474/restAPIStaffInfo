const express = require('express');
const {userValidator} = require('../api/validation');
const {authUser,registerUser} = require('../controllers/user-controller')

const userRouter = express.Router();

userRouter.route('/login',)
    .post(userValidator, authUser)

userRouter.route('/registration')

    .post(userValidator, registerUser)

module.exports = userRouter;
