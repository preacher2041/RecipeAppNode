const express = require('express');
const app = express();
const config = require('config');

// Middleware
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:database');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Development mode');
}

// Database
const mongoose = require('mongoose');

if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR: jwtPrivateKey is not defined');
	process.exit(1);
}

mongoose.connect('mongodb://localhost/recipesApp',  { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => databaseDebugger('Connected to MongoDB'))
	.catch((err) => databaseDebugger('Could not connect to MongoDB', err));

// Routes
const home = require('./routes/home');
const foodCupboards = require('./routes/foodCupboards');
const foodTypes = require('./routes/foodTypes');
const ingredients = require('./routes/ingredients');
const recipes = require('./routes/recipes');
const shoppingLists = require('./routes/shoppingLists');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use('/api/food-cupboards', foodCupboards);
app.use('/api/food-types', foodTypes);
app.use('/api/ingredients', ingredients);
app.use('/api/recipes', recipes);
app.use('/api/shopping-list', shoppingLists);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

// Start web server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running web server on port ${port}.`);
});
