const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ShoppingList = mongoose.model('Shopping List', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
	quantity: {
		type: Number,
		required: true,
	},
	unit: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 15
	}
}));

const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(20).required(),
		quantity: Joi.number().required(),
		unit: Joi.string().min(3).max(15).required(),
	});
	
	return schema.validate(user);
};

exports.ShoppingList = ShoppingList;
exports.validate = validate;