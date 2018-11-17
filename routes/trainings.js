
//=========================================================================
// TRAINING ROUTE
//=========================================================================

const express = require('express');
const router = express.Router();
const Training = require('../models/training');
const NodeGeocoder = require('node-geocoder');

//GEOCODER
const options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
  };
   
const geocoder = NodeGeocoder(options);

const middleware = require('../middleware');


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
router.post("/",middleware.isLoggedIn, function (req, res) {
	//get data from form and add to training array
	const name = req.body.name;
	const price = req.body.price;
	const image = req.body.image;
	const desc = req.body.description;
	const trainer = {
		id: req.user._id,
		username: req.user.username
	};
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			console.log(err);
		//   req.flash('error', 'Invalid address');
		  return res.redirect('back');
		}
		console.log(data);
		const lat = data[0].latitude;
		const lng = data[0].longitude;
		const location = data[0].formattedAddress;

		const newTraining = {name: name, price: price, image:image, description: desc, trainer:trainer, location: location, lat: lat, lng: lng};
	
		// console.log(req.user);
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
});

//NEW - show form to add training
router.get("/new",middleware.isLoggedIn, function(req, res) {
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
			console.log(foundTraining);			
			res.render("trainings/show", {showTraining: foundTraining});
		}
	});
});


//EDIT TRAINING ROUTE
router.get('/:id/edit',middleware.checkTrainingOwnership, (req,res) => {
	//check if user logged in, if not redirect
	Training.findById(req.params.id, (err, foundTraining) => { 
		res.render('trainings/edit', {training: foundTraining});
	});
});
//UPDATE TRAINING ROUTE
router.put('/:id',middleware.checkTrainingOwnership, (req,res) => {
	//Geocoder
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			// req.flash('error', 'Invalid address');
			console.log(err);
			return res.redirect('back');
		}
		req.body.training.lat = data[0].latitude;
		req.body.training.lng = data[0].longitude;
		req.body.training.location = data[0].formattedAddress;	
		//find and update the correct training
		//const data = {name:req.body.name, image: req.body.image, description: req.body.description}
		Training.findByIdAndUpdate(req.params.id, req.body.training, (err, updatedTraining) => {
			console.log(req.body.training);
			if(err) {
				console.log(err);
				res.redirect('/trainings');
			} else {
				console.log(updatedTraining);
				res.redirect(`/trainings/${req.params.id}`);
			}
		})
	//redirect to show page
	});
})

//DESTROY TRAINING ROUTE
router.delete('/:id',middleware.checkTrainingOwnership, (req,res) => {
	//find and delete selected training
	// res.send('Delete Training?')
	Training.findByIdAndRemove(req.params.id, (err) => {
		if(err) {
			console.log(err);
		} else {
			// console.log(res);
			res.redirect('/trainings');
		}
	});
});

module.exports = router;