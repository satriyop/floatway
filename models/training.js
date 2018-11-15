//SCHEMA SETUP
var mongoose = require("mongoose");

var trainingSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
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
	]
});

module.exports = mongoose.model("Training", trainingSchema);