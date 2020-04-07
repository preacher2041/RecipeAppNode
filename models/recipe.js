const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {userSchema} = require('./user');

const Recipe = mongoose.model('Recipe', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	foodType: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
	ingredients: [
		{
			name: {
				type: String,
				required: true,
				minlength: 3,
				maxlength: 20
			},
			quantity: {
				type: Number,
				required: true
			},
			unit: {
				type: String,
				required: true,
				minlength: 3,
				maxlength: 15
			}
		}
	],
	method: [
		{
			step: {
				type: String,
				required: true,
				minlength: 10,
				maxlength: 500
			}
		}
	],
	author: userSchema,
	tags: [
		{
			name: {
				type: String,
				required: true,
				minlength: 3,
				maxlength: 15
			}
		}
	]
}));

const validate = (recipe) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		foodType: Joi.string().min(3).max(20).required(),
		ingredients: Joi.array().items(Joi.object({
			name: Joi.string().min(3).max(20).required(),
			quantity: Joi.number().required(),
			unit: Joi.string().min(3).max(15).required()
		})),
		method: Joi.array().items(Joi.object({
			step: Joi.string().min(10).max(50).required()
		})),
		author: Joi.object({
			firstName: Joi.string().min(3).max(20).required(),
			lastName: Joi.string().min(3).max(20).required(),
			emailAddress: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }).min(3).max(50).required(),
			username: Joi.string().min(3).max(20).required(),
			password: Joi.string().min(3).max(100).required()
		}),
		tags: Joi.array().items(Joi.object({
			name: Joi.string().min(3).max(15).required()
		}))
		
	});
	
	return schema.validate(recipe)
};

exports.Recipe = Recipe;
exports.validate = validate;