const Joi = require('@hapi/joi');
const express = require('express');

const app = express();
app.use(express.json());

const recipeCategories = [
	{id: 1, name: 'beef'},
	{id: 2, name: 'chicken'},
	{id: 3, name: 'lamb'},
	{id: 4, name: 'pork'},
	{id: 5, name: 'seafood'}
];

// Recipes home
app.get('/', (req, res) => {
	res.send('Welcome to recipes app');
});


// Get all recipe categories
app.get('/api/categories', (req, res) => {
	res.send(recipeCategories);
});

// Create new recipe categories
app.post('/api/categories', (req, res) => {
	console.log(req.body);
	const {error} = validateCategory(req.body);
	if (error) return res.status(400).send(error);
	
	const category = {
		id: recipeCategories.length + 1,
		name: req.body.name
	};
	
	recipeCategories.push(category);
	res.send(recipeCategories);
});

// Get single recipe category
app.get('/api/categories/:id', (req, res) => {
	const category = recipeCategories.find(c => {
		return c.id === parseInt(req.params.id);
	});
	
	if (!category) return res.status(400).send('Recipe category not found');
	
	res.send(category);
});


//TODO Update single recipe category
app.put('/api/categories/:id', (req, res) => {
	const category = recipeCategories.find(c => {
		return c.id === parseInt(req.params.id);
	});
	
	if (!category) return res.status(400).send('Recipe category not found');
	
	const {error} = validateCategory(req.body);
	if (error) return res.status(400).send(error);
	
	category.name = req.body.name;
	res.send(category);
});


//TODO Delete single recipe category
app.delete('/api/categories/:id', (req, res) => {
	const category = recipeCategories.find(c => {
		return c.id === parseInt(req.params.id);
	});
	
	if (!category) return res.status(400).send('Recipe category not found');
	
	const index = recipeCategories.indexOf(category);
	recipeCategories.splice(index, 1);
	
	res.send(category);
});

const validateCategory = (category) => {
	const validationSchema = Joi.object({
		name: Joi.string().min(3).required()
	});
	
	return validationSchema.validate(category);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running web server on port ${port}.`);
});
