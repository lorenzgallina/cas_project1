const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./todos/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/todos', todoRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));