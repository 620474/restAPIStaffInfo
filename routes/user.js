const {saveUser, loginUser} = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserService = async (req, res, next) => {
    const {name, password} = req.body
    try {
        await saveUser(name, password)
        return res.status(200).json("Success");
    } catch (err) {
        return next(err)
    }
}

const authUserService = async (request, response, next) => {
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
                                let token = jwt.sign(user, 'SECRET', {expiresIn: '5m'})
                                return response.status(200).json({token});
                            }
                        })
                }
            })
    } catch (err) {
        next(err)
    }
}

module.exports = {registerUserService, authUserService}
