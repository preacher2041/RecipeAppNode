const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

const recipeCategories = [
	{id: 1, name: 'beef'},
	{id: 2, name: 'chicken'},
	{id: 3, name: 'lamb'},
	{id: 4, name: 'pork'},
	{id: 5, name: 'seafood'}
];

// Get all recipe categories
router.get('/', (req, res) => {
	res.send(recipeCategories);
});

// Create new recipe categories
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
	const category = recipeCategories.find(c => {
		return c.id === parseInt(req.params.id);
	});
	
	if (!category) return res.status(400).send('Recipe category not found');
	
	res.send(category);
});


// Update single recipe category
router.put('/:id', (req, res) => {
	const category = recipeCategories.find(c => {
		return c.id === parseInt(req.params.id);
	});
	
	if (!category) return res.status(400).send('Recipe category not found');
	
	const {error} = validateCategory(req.body);
	if (error) return res.status(400).send(error);
	
	category.name = req.body.name;
	res.send(category);
});


// Delete single recipe category
router.delete('/:id', (req, res) => {
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

module.exports = router;