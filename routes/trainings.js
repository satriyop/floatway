
//=========================================================================
// TRAINING ROUTE
//=========================================================================

const express = require('express');
const router = express.Router();
const Training = require('../models/training');

//INDEX - show all trainings
router.get("/", function(req, res){
	console.log(req.user);
	//GET ALL TRAININGS FROM DB
	Training.find(function(err, allTrainings) {
		if (err){
			console.log("Can not get data from DB")
		} else {
			res.render("trainings/index", {listTraining:allTrainings});			
		}
	});
});

//CREATE - add new campground to DB
router.post("/", function (req, res) {
	//get data from form and add to training array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const newTraining = {name: name, image:image, description: desc}
	// trainings.push(newCampground);
	Training.create(newTraining, function (err, training){
		if (err) {
			console.log(err);
		} else {
			console.log(`Newly Added Training`);
			console.log(training);
			//redirect back to training page
			res.redirect("/trainings");
		}
	});
});

//NEW - show form to add training
router.get("/new", function(req, res) {
	res.render("trainings/new");
});


//SHOW by id
router.get("/:id", function(req, res) {
	//find the training with provided ID at the url
	Training.findById(req.params.id).populate("comments").exec(function(err, foundTraining) {
		if (err) {
			console.log("Error finding the training ID");
		} else {
			//show template with that training
			// console.log(foundTraining);			
			res.render("trainings/show", {showTraining: foundTraining});
		}
	});
});

module.exports = router;