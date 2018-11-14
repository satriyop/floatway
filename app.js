var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Training  	= require("./models/trainings"),
	Comment     = require("./models/comment"),
	seedDB		= require("./seeds")

mongoose.connect("mongodb://localhost/floatway");

app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
console.log(__dirname);


seedDB();
//=========================================================================
// TRAINING ROUTE
//=========================================================================


app.get("/",function(req, res){
	res.render("landing");
});
//INDEX - show all trainings
app.get("/trainings", function(req, res){
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
app.post("/trainings", function (req, res) {
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newTraining = {name: name, image:image, description: desc}
	// campgrounds.push(newCampground);
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
app.get("/trainings/new", function(req, res) {
	res.render("trainings/new");
});


//SHOW by id
app.get("/trainings/:id", function(req, res) {
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


//=========================================================================
// COMMENT ROUTE
//=========================================================================

//NEW - show form to add comment
app.get("/trainings/:id/comments/new", function(req, res) {
	//find training by id
	Training.findById(req.params.id, function(err, foundTraining) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: foundTraining});

		}
	});
});


app.post("/trainings/:id/comments", function(req, res) {
	//lookup training using ID at url
	Training.findById(req.params.id, function(err, foundTraining){
		if (err) {
			console.log(err);
		} else {
			console.log(req.body.comment);
			//create new comment
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					//connect new comment to training
					foundTraining.comments.push(comment);
					foundTraining.save();
					//redirect to show page	
					res.redirect('/trainings/' + foundTraining._id);
				}	
			});
		}
	});
});






app.listen(3000, () => console.log('floatway app listening on port 3000!'));
















































