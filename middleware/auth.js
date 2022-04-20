const jwt = require('jsonwebtoken');


const generateAccessToken = (user) => {
    return jwt.sign(user, 'SECRET', {expiresIn: '1m'})
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, 'refreshToken', {expiresIn: '30d'})
}

const checkToken = (request, response, next) => {
    const token = request.token
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

const verifyRefreshToken = (req, res, next) => {
    const { refreshToken } = req.cookies;

    jwt.verify(refreshToken, "refreshToken", (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorised');
        }
        if (decoded) {
            const user = decoded.name
            const token = generateAccessToken({user:user});
            const refreshToken = generateRefreshToken({user:user});
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true
            });
            return res.status(200).json({token});
        }
    });
}



module.exports = {
    checkToken,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}
