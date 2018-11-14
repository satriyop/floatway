var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
	seedDB		= require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine", "ejs");

seedDB();
//=========================================================================
// CAMPGROUND ROUTE
//=========================================================================


app.get("/",function(req, res){
	res.render("landing");
});
//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	// res.render("campgrounds", {listcamp:campgrounds});
	//GET ALL CAMPGROUND FROM DB
	Campground.find(function(err, allCampgrounds) {
		if (err){
			console.log("Can not get data from DB")
		} else {
			res.render("campgrounds/index", {listcamp:allCampgrounds});			
		}
	});
});

//CREATE - add new campground to DB
app.post("/campgrounds", function (req, res) {
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image:image, description: desc}
	// campgrounds.push(newCampground);
	Campground.create(newCampground, function (err, campground){
		if (err) {
			console.log(err);
		} else {
			console.log(`Newly Added Campground`);
			console.log(campground);
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to add campground
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});


//SHOW by id
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log("Error finding the campground ID");
		} else {
			//show template with that campground
			console.log(foundCampground);			
			res.render("campgrounds/show", {showCamp: foundCampground});
		}
	});
});


//=========================================================================
// COMMENT ROUTE
//=========================================================================

//NEW - show form to add comment
app.get("/campgrounds/:id/comments/new", function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: foundCampground});

		}
	});
});


app.post("/campgrounds/:id/comments", function(req, res) {
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			console.log(req.body.comment);
			//create new comment
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					//connect new comment to campground
					foundCampground.comments.push(comment);
					foundCampground.save();
					//redirect to show page	
					res.redirect('/campgrounds/' + foundCampground._id);
				}	
			});
		}
	});
});






app.listen(3000, () => console.log('YelCamp app listening on port 3000!'));
















































