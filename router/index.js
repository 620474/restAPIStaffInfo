const db = require('../db/db')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {checkToken} = require('../api/auth')

router.use(express.urlencoded({extended: true}))
router.use(bodyParser.json())
router.use(cookieParser())



async function getUsers(req, res) {
    const result = await db('staff')
        .select()
    res.render('staff', {results: result})
}



router.get('/', getUsers)



module.exports = router
