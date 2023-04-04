const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// CONST
const PORT = 3001;

// import routers
const loginRouter = require('./src/router/login');

// import middleware
const middlewareHeaders = require('./src/middlewares/headers');

// create app
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => middlewareHeaders(req, res, next)) // validate headers


// http request
app.use('/login', loginRouter)


// listen
app.listen(PORT)