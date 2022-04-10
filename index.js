const express = require("express");
const cors = require("cors");
const errorhandler = require('errorhandler');
const UserRouter = require('./router/userRouter');
const StaffRouter = require('./router/staffRouter');
const {errors} = require('celebrate');
const bearerToken = require('express-bearer-token');
const {logger, errorLogger} =require('./logger/logger');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bearerToken());
app.use(cors());

app.use(logger);

app.use(UserRouter);
app.use(StaffRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorhandler());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
