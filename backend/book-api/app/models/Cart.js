let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let CartSchema   = new Schema({
	title: String,
	createdAt: Date,
	id: Number,
	item: String,
	price: Number,
});

module.exports = mongoose.model('Cart', CartSchema);