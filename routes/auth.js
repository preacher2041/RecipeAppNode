const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');

// Create new user
router.post('/', async (req, res) => {
	const {error} = validateAuth(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	// Check if user exists
	let user = await User.findOne({email: req.body.email});
	if (!user) return res.status(400).send('Invalid email or password.');
	
	// Compare sent password with stored password
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');
	
	const token = user.generateAuthToken();
	res.send(token);
});

const validateAuth = (req) => {
	const schema = Joi.object({
		emailAddress: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	});
	
	return schema.validate(req);
};

module.exports = router;