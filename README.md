<h1 align="center">restAPIStaffInfo</h1>
<img src="https://img.shields.io/badge/made%20by-620474-blue.svg" >

# Installation
`npm i --save`

### Demonstration

Demonstration code from index.

```js
// index.js
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
```
Router

```js
// staff.js

staffRouter.route('/registerNewStaff')
    .post(checkToken, staffCreateValidator, addNewStaffService)

staffRouter.route('/')
    .get(showAllStaffService)

staffRouter.route('/staff/:id')
    .get(checkToken, showStaffByIdService)
    .post(checkToken, deleteStaffService)
```
# Router -

| Route       | Type   | Description                      |
| ---------- | ------ | ---------------------------------- |
| `/` | Get | Get all staffs |
| `/registerNewStaf` | Post | Add new staff |
| `/staff/:id` | Get |  Get a staff info by Id |
| `/staff/:id` | Post | Delete a staff by Id |
| `/login` | Post |  Login user |
| `/registration` | Post | Registration a new user|



CRUD server with registration, authentication,routes, logging, errorhandler.
Using postgresql database.
Used packages: express, bcrypt, jwt, pg, knexjs, celebrate, winston, express-winston,
errorhandler.
