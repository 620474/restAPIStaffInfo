const express = require("express");
const cors = require("cors");
const bearerToken = require('express-bearer-token');
const {logger, errorLogger} =require('./logger/logger');
const {errorHandler} = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser')
const router = require('./router')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bearerToken());
app.use(cookieParser())
app.use(cors());

app.use(logger);

app.use(router);

app.use(errorLogger);

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
