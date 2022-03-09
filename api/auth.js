const jwt = require("jsonwebtoken");
const express = require('express')
const cookieParser = require('cookie-parser')
const router = express.Router();
router.use(cookieParser())


let checkToken = (req, res, next) => {
const token = req.cookies.token
    if (token) {
        jwt.verify(token, "SECRET", (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};



module.exports = {
    checkToken
}
