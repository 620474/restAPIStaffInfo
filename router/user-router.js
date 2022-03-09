const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('../db/db.js');

const userRouter = express.Router();

userRouter.use(express.urlencoded({extended: true}));
userRouter.use(bodyParser.json());
userRouter.use(cookieParser());

userRouter.route('/login')
    .get((request, response) => {
        response.render('login');
    })
    .post((request, response) => {
        console.log(request.body)
        db('users')
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
                                response.cookie('token', token)
                                response.redirect('/')
                            }
                        })
                }
            })
    })

userRouter.route('/logout')
    .get((request, response) => {
        response.clearCookie('token')
        response.redirect('/')
    })

userRouter.route('/registration')
    .get((request, response) => {
    response.render('registration')
    })
    .post(async (request, response) => {
        const {username, password} = request.body
        await db('users')
            .insert({
                name: username,
                password: bcrypt.hashSync(password, 8)
            })
        response.redirect('/')
    })

module.exports = userRouter
