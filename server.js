require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

require("./src/config/mongoose")(app);
require("./src/app/routerHandler")(app)

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('/files'))
app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN Devs'
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});