require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
// var jwt = require('jsonwebtoken');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('secretKey', process.env._JWT_SECRETKEY)
app.use(bodyParser.urlencoded({ extended: false }))
require("./src/config/mongoose")(app);
require("./src/app/routerHandler")(app)



// app.options('*', cors());

console.log(__dirname)

app.use('/files', express.static(path.join(__dirname, 'files')))
app.use(express.static(path.join(__dirname, 'frontEnd/dist')))
app.get('/', (req, res) => {
    res.redirect('/user')
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});