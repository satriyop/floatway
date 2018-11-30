//SCHEMA SETUP
var mongoose = require("mongoose");

var trainingSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	createdAt: { type: Date, default: Date.now},
	trainer: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reviews'
		}
	],
	rating: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Training", trainingSchema);