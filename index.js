const path = require('path');
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const UserRouter = require('./router/user-router');
const StaffRouter = require('./router/staff-router');
const {errors} = require('celebrate')
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(UserRouter);
app.use(StaffRouter);

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(errors())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
