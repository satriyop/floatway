var mongoose 	= require("mongoose");
var Campground 	= require("./models/campground");
var Comment 	= require("./models/comment"); 

var data = [
	{
		name: "Surabaya",
		image: "https://www.divergenttravelers.com/wp-content/uploads/2016/10/edit-7790-.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt odit saepe, quisquam molestiae enim assumenda, architecto reiciendis amet iure, fuga dolorum sequi laborum quam voluptatibus tempora alias magnam maxime iste."
	},

	{
		name: "Yogyakarta",
		image: "https://www.divergenttravelers.com/wp-content/uploads/2016/10/edit-7790-.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ratione cumque, aut quia ipsam accusamus impedit ipsa ex officiis placeat accusantium, aperiam animi modi suscipit repellendus id maiores maxime! Natus!"
	},
	{
		name: "Semarang",
		image: "https://www.divergenttravelers.com/wp-content/uploads/2016/10/edit-7790-.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem corrupti in voluptates eveniet quia consequuntur perspiciatis nesciunt, cum impedit amet aliquam reprehenderit laudantium ratione harum voluptatibus, nobis expedita iusto. Eos."
	},

];

function seedDB() {
	Campground.remove({}, function(err) {
		if (err) {
			console.log (err);
		} else {
			console.log("removed campground!")
		}
		//add campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, newCampground) {
				if (err) {
					console.log (err);
				} else {
					console.log("Added new campground!")
					//add Comment
					Comment.create({text: "This is cool", author: "Paijo"}, function (err, newComment) {
						if (err) {
							console.log (err);
						} else {
							console.log("Added new comment!");
							newCampground.comments.push(newComment);
							newCampground.save();
						}
					});
				}
			});
		});
	});

}



module.exports = seedDB;