const db = require('../db/db.js');
const bcrypt = require("bcrypt");


const saveUser =  (name, password) => {
    return db('users')
        .insert({
            name: name,
            password: bcrypt.hashSync(password, 8)
        });
}


const loginUser = async (name) => {
    const res = await db('users')
        .where({name: name})
    return res[0]
}

module.exports = {
    saveUser,
    loginUser
};
