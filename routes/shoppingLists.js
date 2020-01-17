const express = require('express');
const router = express.Router();
const mongooseDebugger = require('debug')('app:mongoose');
const {ShoppingList, validate} = require('../models/shoppingList');

// Get all shoppingLists
router.get('/', async (req, res) => {
	const shoppingList = await ShoppingList
		.find()
		.sort('name');
	
	res.send(shoppingList);
});

// Create new shoppingList
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let shoppingList = new ShoppingList(
		{
			name: req.body.name,
			quantity: req.body.quantity,
			unit: req.body.unit
		}
	);
	shoppingList = await shoppingList.save();
	mongooseDebugger(shoppingList);
	
	res.send(shoppingList);
});

// Get single shoppingList
router.get('/:id', async (req, res) => {
	const shoppingList = await ShoppingList.findById(req.params.id).find();
	
	if (!shoppingList) return res.status(400).send('The shopping list with the given id was not found');
	
	res.send(shoppingList);
});

// Update single shoppingList
router.put('/:id', async (req, res) => {
	mongooseDebugger(req.params);
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let shoppingList = await ShoppingList.findByIdAndUpdate(req.params.id,
		{
			name: req.body.name,
			quantity: req.body.quantity,
			unit: req.body.unit
		},
		{
			new: true
		}
	);
	
	if (!shoppingList) return res.status(400).send('The shopping list with the given id was not found');
	
	res.send(shoppingList);
});

// Delete single shoppingList
router.delete('/:id', async (req, res) => {
	const shoppingList = await ShoppingList.findByIdAndDelete(req.params.id);
	
	if (!shoppingList) return res.status(400).send('The shopping list with the given id was not found');
	
	res.send(shoppingList);
});

module.exports = router;