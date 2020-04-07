const _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt');
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
	
	// Check to see if user already exists
	// let user = User.findOne({ email: req.body.email});
	
	// if (user) return res.status(400).send('User already registered.');
	
	let user = new User(
		_.pick(req.body, [
			'firstName',
			'lastName',
			'emailAddress',
			'username',
			'password'
		])
	);
	
	const salt = await bcrypt.genSalt(10, );
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();
	
	mongooseDebugger(_.pick(user, ['_id', 'firstName', 'lastName', 'emailAddress', 'username']));
	
	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'emailAddress', 'username']));
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
			email: req.body.email,
			password: req.body.password,
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