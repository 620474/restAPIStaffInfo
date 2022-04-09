const jwt = require('jsonwebtoken');

const checkToken = (request, response, next) => {
const token = request.token
    console.log(token)
    if (token) {
        jwt.verify(token, 'SECRET', (error, decoded) => {
            if (error) {
                return response.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                request.decoded = decoded;
                next();
            }
        });
    } else {
        return response.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken
}
