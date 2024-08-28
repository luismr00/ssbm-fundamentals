const serverless = require('serverless-http');
const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const cors = require('cors');

// allow cross-origin requests from any domain while in dev
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));
app.use(express.json());
app.use('/user', userRoutes);

module.exports.handler = serverless(app);