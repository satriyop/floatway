var mongoose 	= require("mongoose");
var Training 	= require("./models/training");
var Comment 	= require("./models/comment"); 

var data = [
	{
		name: "Blockchain",
		image: "https://ethelo.com/wp-content/uploads/2018/02/Blockchain.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt odit saepe, quisquam molestiae enim assumenda, architecto reiciendis amet iure, fuga dolorum sequi laborum quam voluptatibus tempora alias magnam maxime iste."
	},

	{
		name: "Optimasi 3G",
		image: "https://uidesign.gbtcdn.com/gb_blog/2843/global-network-types.png",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ratione cumque, aut quia ipsam accusamus impedit ipsa ex officiis placeat accusantium, aperiam animi modi suscipit repellendus id maiores maxime! Natus!"
	},
	{
		name: "Machine Learning",
		image: "https://cdn-images-1.medium.com/max/1600/1*60gs-SFYyooZZBxatuoNJw.jpeg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem corrupti in voluptates eveniet quia consequuntur perspiciatis nesciunt, cum impedit amet aliquam reprehenderit laudantium ratione harum voluptatibus, nobis expedita iusto. Eos."
	},
	
	{
		name: "Artificial Intelligence",
		image: "https://cdn-images-1.medium.com/max/800/1*rchGC6ySU1CEezcLEMJkzg.jpeg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem corrupti in voluptates eveniet quia consequuntur perspiciatis nesciunt, cum impedit amet aliquam reprehenderit laudantium ratione harum voluptatibus, nobis expedita iusto. Eos."
	}

];

function seedDB() {
	Training.remove({}, function(err) {
		if (err) {
			console.log (err);
		} else {
			console.log("removed training!")
		}
		//add trainings
		data.forEach(function(training){
			Training.create(training, function(err, newTraining) {
				if (err) {
					console.log (err);
				} else {
					console.log("Added new training!")
					//add Comment
					Comment.create({text: "This training is cool", author: "Lingga"}, function (err, newComment) {
						if (err) {
							console.log (err);
						} else {
							console.log("Added new comment!");
							newTraining.comments.push(newComment);
							newTraining.save();
						}
					});
				}
			});
		});
	});

}



module.exports = seedDB;