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
		foodType: Joi.string().min(3).max(20).required(),
		ingredients: Joi.array().items(Joi.object({
			name: Joi.string().min(3).max(20).required(),
			quantity: Joi.number().required(),
			unit: Joi.string().min(3).max(15).required()
		})),
		method: Joi.array().items(Joi.object({
			step: Joi.string().min(10).max(50).required()
		})),
		tags: Joi.array().items(Joi.object({
			name: Joi.string().min(3).max(15).required()
		}))
		
	});
	
	return schema.validate(recipe)
};

exports.Recipe = Recipe;
exports.validate = validate;