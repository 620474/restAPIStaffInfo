const {saveUser, loginUser} = require('../models/userModel')

const saveUserServices = (name, password) => {
    return saveUser(name, password)
}


const loginUserServices = (name) => {
    return loginUser(name)
}


module.exports = {
    saveUserServices,
    loginUserServices
}
