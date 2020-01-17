const express = require('express');
const router = express.Router();
const mongooseDebugger = require('debug')('app:mongoose');
const {FoodCupboard, validate} = require('../models/foodCupboard');

// Get all foodCupboards
router.get('/', async (req, res) => {
	const foodCupboard = await FoodCupboard
		.find()
		.sort('name');
	
	res.send(foodCupboard);
});

// Create new foodCupboard
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let foodCupboard = new FoodCupboard(
		{
			name: req.body.name
		}
	);
	foodCupboard = await foodCupboard.save();
	mongooseDebugger(foodCupboard);
	
	res.send(foodCupboard);
});

// Get single foodCupboard
router.get('/:id', async (req, res) => {
	const foodCupboard = await FoodCupboard.findById(req.params.id).find();
	
	if (!foodCupboard) return res.status(400).send('The food cupboard with the given id was not found');
	
	res.send(foodCupboard);
});

// Update single foodCupboard
router.put('/:id', async (req, res) => {
	mongooseDebugger(req.params);
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let foodCupboard = await FoodCupboard.findByIdAndUpdate(req.params.id,
		{
			name: req.body.name
		},
		{
			new: true
		}
	);
	
	if (!foodCupboard) return res.status(400).send('The food cupboard with the given id was not found');
	
	res.send(foodCupboard);
});

// Delete single foodCupboard
router.delete('/:id', async (req, res) => {
	const foodCupboard = await FoodCupboard.findByIdAndDelete(req.params.id);
	
	if (!foodCupboard) return res.status(400).send('The food cupboard with the given id was not found');
	
	res.send(foodCupboard);
});

module.exports = router;