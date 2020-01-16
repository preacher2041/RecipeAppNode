const express = require('express');
const router = express.Router();
const mongooseDebugger = require('debug')('app:mongoose');
const {FoodType, validate} = require('../models/foodType');

// Get all food types
router.get('/', async (req, res) => {
	const foodType = await FoodType
		.find()
		.sort('name');
	
	res.send(foodType);
});

// Create new food type
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let foodType = new FoodType({name: req.body.name});
	foodType = await foodType.save();
	mongooseDebugger(foodType);
	
	res.send(foodType);
});

// Get single food type
router.get('/:id', async (req, res) => {
	const foodType = await FoodType.findById(req.params.id).find();
	
	if (!foodType) return res.status(400).send('The food type with the given id was not found');
	
	res.send(foodType);
});

// Update single food type
router.put('/:id', async (req, res) => {
	mongooseDebugger(req.params);
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let foodType = await FoodType.findByIdAndUpdate(req.params.id,
		{
			name: req.body.name
		},
		{
			new: true
		}
	);
	
	if (!foodType) return res.status(400).send('The food type with the given id was not found');
	
	res.send(foodType);
});

// Delete single food type
router.delete('/:id', async (req, res) => {
	const foodType = await FoodType.findByIdAndDelete(req.params.id);
	
	if (!foodType) return res.status(400).send('The food type with the given id was not found');
	
	res.send(foodType);
});

module.exports = router;