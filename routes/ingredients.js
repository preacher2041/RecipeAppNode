const express = require('express');
const router = express.Router();
const mongooseDebugger = require('debug')('app:mongoose');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const {Ingredient, validate} = require('../models/ingredient');

// Get all ingredients
router.get('/', async (req, res) => {
	const ingredient = await Ingredient
		.find()
		.sort('name');
	
	res.send(ingredient);
});

// Create new ingredient
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let ingredient = new Ingredient(
		{
			name: req.body.name,
			defaultUnit: req.body.defaultUnit,
			foodCupboard: req.body.foodCupboard,
			minimumLevel: req.body.minimumLevel,
			maximumLevel: req.body.maximumLevel,
		}
	);
	ingredient = await ingredient.save();
	mongooseDebugger(ingredient);
	
	res.send(ingredient);
});

// Get single ingredient
router.get('/:id', async (req, res) => {
	const ingredient = await Ingredient.findById(req.params.id).find();
	
	if (!ingredient) return res.status(400).send('The ingredient with the given id was not found');
	
	res.send(ingredient);
});

// Update single ingredient
router.put('/:id', async (req, res) => {
	mongooseDebugger(req.params);
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let ingredient = await Ingredient.findByIdAndUpdate(req.params.id,
		{
			name: req.body.name,
			defaultUnit: req.body.defaultUnit,
			foodCupboard: req.body.foodCupboard,
			minimumLevel: req.body.minimumLevel,
			maximumLevel: req.body.maximumLevel,
		},
		{
			new: true
		}
	);
	
	if (!ingredient) return res.status(400).send('The ingredient with the given id was not found');
	
	res.send(ingredient);
});

// Delete single ingredient
router.delete('/:id', [auth, admin], async (req, res) => {
	const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
	
	if (!ingredient) return res.status(400).send('The ingredient with the given id was not found');
	
	res.send(ingredient);
});

module.exports = router;