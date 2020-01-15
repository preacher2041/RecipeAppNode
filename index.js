const express = require('express');
const app = express();

// Middleware
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:database');

app.use(express.json());
app.use(helmet());

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Development mode');
}

// Database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipesApp',  { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => databaseDebugger('Connected to MongoDB'))
	.catch((err) => databaseDebugger('Could not connect to MongoDB', err));

const categorySchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: {type: Date, default: Date.now},
	isPublished: Boolean
});

const Category = mongoose.model('Category', categorySchema);

const createCategory = async () => {
	const category = new Category({
		name: 'Beef',
		author: 'preacher2041',
		tags: ['tag1', 'tag2'],
		isPublished: true
	});
	
	const result = await category.save();
	databaseDebugger(result);
};

createCategory();

// Routes
const home = require('./routes/home');
const categories = require('./routes/categories');

app.use('/api/categories', categories);
app.use('/', home);

// Start web server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running web server on port ${port}.`);
});
