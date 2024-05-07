const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const MongoStore = require('connect-mongo');
const connectDB = require('./db');

connectDB();

// Allow requests from http://localhost:8000 and include credentials
const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true
};

const app = express();
// app.use(cors()); // Enable CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'mySecret', // Change this to an environment variable later
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// --- Routes ---

app.use('/api/users', require('./routes/userRoutes'));

// --- Server listener ---

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});