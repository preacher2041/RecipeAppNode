const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
	lastName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
	emailAddress: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	}
});

const User = mongoose.model('User', userSchema);

const validate = (user) => {
	const schema = Joi.object({
		firstName: Joi.string().min(3).max(20).required(),
		lastName: Joi.string().min(3).max(20).required(),
		emailAddress: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }).min(3).max(50).required(),
		username: Joi.string().min(3).max(20).required()
	});
	
	return schema.validate(user);
};

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validate;