const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema ({
	name: String,
	author: String,
	tags: [String],
	date: {type: Date, default: Date.now},
	isPublished: Boolean
}));

exports.Category = Category;