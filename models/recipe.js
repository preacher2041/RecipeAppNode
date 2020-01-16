const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Recipe = mongoose.model('Recipe', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	ingredients: {
		type: [String],
		required: true
	},
	method: {
		type: String,
		required: true,
		minlength: 20,
		maxlength: 500
	}
}));

const validate = (recipe) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		ingredients: Joi.array().items(Joi.string()),
		method: Joi.string().min(20).max(50).required()
	});
	
	return schema.validate(recipe)
};

exports.Recipe = Recipe;
exports.validate = validate;