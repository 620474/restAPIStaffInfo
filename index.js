const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const UserRouter = require('./router/user-router')
const StaffRouter = require('./router/staff-router')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(UserRouter)
app.use(StaffRouter)

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// simple route
app.get("/", (req, res) => {
res.render('index')
});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
