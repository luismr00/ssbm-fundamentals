const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const connectDB = require('./db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---

app.use('/api/users', require('./routes/userRoutes'));

// --- Server listener ---

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});