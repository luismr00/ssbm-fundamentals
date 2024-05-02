const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const connectDB = require('./db');

connectDB();

const app = express();
app.use(cors()); // Enable CORS middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---

app.use('/api/users', require('./routes/userRoutes'));

// --- Server listener ---

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});