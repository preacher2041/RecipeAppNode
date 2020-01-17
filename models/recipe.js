const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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
			amount: {
				type: Number,
				required: true
			},
			measurement: {
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
				minlength: 20,
				maxlength: 500
			}
		}
	],
	author: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
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
		name: Joi.string().min(5).max(50).required(),
		foodType: Joi.string().min(3).max(20).required(),
		ingredients: Joi.array().items(Joi.object({
			name: Joi.string().min(3).max(20).required(),
			amount: Joi.number().required(),
			unit: Joi.string().min(3).max(15).required()
		})),
		method: Joi.array.items(Joi.string().min(20).max(50).required()),
		author: Joi.string().min(3).max(20).required(),
		tags: Joi.array.items(Joi.string().min(3).max(15).required()),
		
	});
	
	return schema.validate(recipe)
};

exports.Recipe = Recipe;
exports.validate = validate;