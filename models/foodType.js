const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const FoodType = mongoose.model('Food Type', new mongoose.Schema ({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	}
}));

const validate = (category) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(20).required()
	});
	
	return schema.validate(category);
};

exports.FoodType = FoodType;
exports.validate = validate;