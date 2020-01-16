const express = require('express');
const app = express();

// Middleware
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:database');

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Development mode');
}

// Database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipesApp',  { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => databaseDebugger('Connected to MongoDB'))
	.catch((err) => databaseDebugger('Could not connect to MongoDB', err));

// Routes
const home = require('./routes/home');
const foodTypes = require('./routes/foodTypes');

app.use('/api/food-types', foodTypes);
app.use('/', home);

// Start web server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running web server on port ${port}.`);
});
