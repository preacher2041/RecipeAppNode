const express = require('express');
const router = express.Router();
const mongooseDebugger = require('debug')('app:mongoose');
const {Recipe, validate} = require('../models/recipe');

// Get all recipes
router.get('/', async (req, res) => {
	const recipe = await Recipe
		.find()
		.sort('name');
	
	res.send(recipe);
});

// Create new recipe
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let recipe = new Recipe(
		{
			name: req.body.name,
			foodType: req.body.foodType,
			ingredients: req.body.ingredients,
			method: req.body.method,
			author: req.body.author,
			tags: req.body.tags
		}
	);
	recipe = await recipe.save();
	mongooseDebugger(recipe);
	
	res.send(recipe);
});

// Get single recipe
router.get('/:id', async (req, res) => {
	const recipe = await Recipe.findById(req.params.id).find();
	
	if (!recipe) return res.status(400).send('The recipe with the given id was not found');
	
	res.send(recipe);
});

// Update single recipe
router.put('/:id', async (req, res) => {
	mongooseDebugger(req.params);
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let recipe = await Recipe.findByIdAndUpdate(req.params.id,
		{
			name: req.body.name,
			foodType: req.body.foodType,
			ingredients: req.body.ingredients,
			method: req.body.method,
			author: req.body.author,
			tags: req.body.tags
		},
		{
			new: true
		}
	);
	
	if (!recipe) return res.status(400).send('The recipe with the given id was not found');
	
	res.send(recipe);
});

// Delete single recipe
router.delete('/:id', async (req, res) => {
	const recipe = await Recipe.findByIdAndDelete(req.params.id);
	
	if (!recipe) return res.status(400).send('The recipe with the given id was not found');
	
	res.send(recipe);
});

module.exports = router;