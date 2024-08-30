const serverless = require('serverless-http');
const express = require('express');
const app = express();
const authRoutes = require('./authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const isDevelopment = process.env.NODE_ENV !== 'production';

// allow cross-origin requests from any domain while in dev
app.use(cors(
    {
        // origin: isDevelopment ? 'http://localhost:8000' : process.env.PRODUCTION_DOMAIN,
        origin: 'http://localhost:8000', // allow requests from any domain
        headers: 'Content-Type, Authorization, Set-Cookie, X-Requested-With',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);

module.exports.handler = serverless(app);