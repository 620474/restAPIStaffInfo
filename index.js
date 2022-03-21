const express = require("express");
const cors = require("cors");
const UserRouter = require('./router/user-router');
const StaffRouter = require('./router/staff-router');
const {errors} = require('celebrate')
const bearerToken = require('express-bearer-token');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bearerToken());
app.use(cors());

app.use(errors())


app.use(UserRouter);
app.use(StaffRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
