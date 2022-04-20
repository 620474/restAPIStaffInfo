const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {saveUser, loginUser} = require('../models/userModel')
const {generateRefreshToken, generateAccessToken} = require('../middleware/auth')

const registerUser = async (req, res, next) => {
    const {name, password} = req.body
    try {
        await saveUser(name, password)
        return res.status(200).json("Success");
    } catch (err) {
        return next(err)
    }
}

const authUser = async (request, response, next) => {
    const {name, password} = request.body;
    try {
        loginUser(name)
            .then(user => {
                if (!user) {
                    return response.status(401).json({
                        error: 'No user by that name'
                    })
                } else {
                    return bcrypt
                        .compare(password, user.password)
                        .then(isAuthenticated => {
                            if (!isAuthenticated) {
                                return response.status(401).json({
                                    error: 'Unauthorized Access!'
                                })
                            } else {
                                let refreshToken = generateRefreshToken({user: user.name})
                                let token = generateAccessToken({user: user.name})
                                response.cookie("refreshToken", refreshToken, {
                                    httpOnly: true
                                });
                                return response.status(200).json({token, refreshToken});
                            }
                        })
                }
            })
    } catch (err) {
        next(err)
    }
}

module.exports = {registerUser, authUser}
