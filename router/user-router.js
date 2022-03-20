const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {usersValidator} = require('../api/validation');

const userRouter = express.Router();

userRouter.route('/login',)

    .post(usersValidator, async (request, response) => {
        await db('users')
            .where({name: request.body.name})
            .then(user => {
                if (!user) {
                    response.status(401).json({
                        error: 'No user by that name'
                    })
                } else {
                    return bcrypt
                        .compare(request.body.password, user[0].password)
                        .then(isAuthenticated => {
                            if (!isAuthenticated) {
                                response.status(401).json({
                                    error: 'Unauthorized Access!'
                                })
                            } else {
                                let token = jwt.sign(user[0], 'SECRET', {expiresIn: '5m'})
                                response.statusCode = 200;
                                response.cookie('token', token)
                                response.cookie('name',user[0].name)
                                response.redirect('/')
                            }
                        })
                }
            })
    })

userRouter.route('/registration')

    .post(usersValidator,async (request, response) => {
        const {username, password} = request.body
        await db('users')
            .insert({
                name: username,
                password: bcrypt.hashSync(password, 8)
            })

        response.redirect('/')
    })

module.exports = userRouter;
