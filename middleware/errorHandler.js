const errorHandler = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')
    console.log('Path: ', req.path)
    res.status(err.statusCode).send(JSON.stringify(err, null, 4))
    next()
}


module.exports = {errorHandler}
