const serverless = require('serverless-http');
const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const isDevelopment = process.env.NODE_ENV === 'development';

// allow cross-origin requests from any domain while in dev
app.use(cors(
    {
        origin:'http://localhost:8000',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));
app.use(cookieParser());
app.use(express.json());
app.use('/user', userRoutes);

module.exports.handler = serverless(app);