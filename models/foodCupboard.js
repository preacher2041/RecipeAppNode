const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const FoodCupboard = mongoose.model('Food Cupboard', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	}
}));

const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(20).required(),
	});
	
	return schema.validate(user);
};

exports.FoodCupboard = FoodCupboard;
exports.validate = validate;