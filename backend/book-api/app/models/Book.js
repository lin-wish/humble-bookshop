let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let BookSchema   = new Schema({
	title: String,
	author: String,
	createdAt: Date,
	id: Number,
	imageUrl: String,
	price: Number,
	year: Number
});

module.exports = mongoose.model('Book', BookSchema);