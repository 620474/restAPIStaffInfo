const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authUser = async (request,response) => {
    const {name, password} = request.body;
        await db('users')
            .where({name: name})
            .then(user => {
                if (!user) {
                    response.status(401).json({
                        error: 'No user by that name'
                    })
                } else {
                    return bcrypt
                        .compare(password, user[0].password)
                        .then(isAuthenticated => {
                            if (!isAuthenticated) {
                                response.status(401).json({
                                    error: 'Unauthorized Access!'
                                })
                            } else {
                                let token = jwt.sign(user[0], 'SECRET', {expiresIn: '5m'})
                                response.status(200).send({token});
                            }
                        })
                }
            })
}

const registerUser = async (request,response) => {
    const {name, password} = request.body

    await db('users')
        .insert({
            name: name,
            password: bcrypt.hashSync(password, 8)
        })
    response.status(200).send({
        text: "Ready"
    })
}


module.exports ={authUser,registerUser}
