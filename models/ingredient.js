const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Ingredient = mongoose.model('Ingredients', new mongoose.Schema ({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
	defaultUnit: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 15
	},
	foodCupboard: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 15
	},
	minimumLevel: {
		type: Number,
		required: true
	},
	maximumLevel: {
		type: Number,
		required: true
	}
}));

const validate = (category) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(20).required(),
		defaultUnit: Joi.string().min(3).max(15).required(),
		foodCupboard: Joi.string().min(3).max(15).required(),
		minimumLevel: Joi.number().required(),
		maximumLevel: Joi.number().required()
	});
	
	return schema.validate(category);
};

exports.Ingredient = Ingredient;
exports.validate = validate;