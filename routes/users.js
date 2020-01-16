const express = require('express');
const router = express.Router();
const mongooseDebugger = require('debug')('app:mongoose');
const {User, validate} = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
	const user = await User
		.find()
		.sort('name');
	
	res.send(user);
});

// Create new user
router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let user = new User(
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		}
	);
	user = await user.save();
	mongooseDebugger(user);
	
	res.send(user);
});

// Get single user
router.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id).find();
	
	if (!user) return res.status(400).send('The user with the given id was not found');
	
	res.send(user);
});

// Update single user
router.put('/:id', async (req, res) => {
	mongooseDebugger(req.params);
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	let user = await User.findByIdAndUpdate(req.params.id,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		},
		{
			new: true
		}
	);
	
	if (!user) return res.status(400).send('The user with the given id was not found');
	
	res.send(user);
});

// Delete single user
router.delete('/:id', async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	
	if (!user) return res.status(400).send('The user with the given id was not found');
	
	res.send(user);
});

module.exports = router;