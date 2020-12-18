require('dotenv').config();

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// var jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());
app.set('secretKey', process.env._JWT_SECRETKEY)
app.use(bodyParser.urlencoded({ extended: false }))
require("./src/config/mongoose")(app);
require("./src/app/routerHandler")(app)

app.use(morgan('dev'));
app.use(cors());

app.use(express.static('/files'))
app.get('/', (req, res) => {
    res.json({
        message: 'Learning Node'
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});