require('dotenv').config({ path: '/Users/emmamendez/.env' }); // Load environment variables from .env file
const express = require('express');
const { Client } = require('pg');
const app = express();

// PostgreSQL Configuration
const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

// Connect to PostgreSQL
client
  .connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Failed to connect to PostgreSQL:', err));

// Express Server Setup
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Optional: Example Route
app.get('/', (req, res) => {
  res.send('Welcome to the KLPS Application!');
});
