const db = require('../db/db')
const express = require('express')
const staffRouter = express.Router();
const bodyParser = require("body-parser");
const {checkToken} = require('../api/auth')

staffRouter.use(bodyParser.json())

staffRouter.route('/addStaff')
    .get(checkToken, (request, response) => {
        response.render('addStaff')
    })
    .post(checkToken, async (request, response) => {
        await db('staff')
            .insert({
                birth_date: request.body.birth_date,
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                position: request.body.position,
                salary: request.body.salary
            })
    })

staffRouter.route('/addstaff')
    .get((request, response) => {
        response.render('addStaff')
    })
    .post(async (request, response) => {
        await db('staff')
            .insert({
                birth_date: request.body.birth_date,
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                position: request.body.position,
                salary: request.body.salary
            })
    })

staffRouter.route('/')
    .get(async(request, response) => {
        const result = await db('staff')
            .select()
        response.render('staff', {results: result})
})

module.exports = staffRouter;
