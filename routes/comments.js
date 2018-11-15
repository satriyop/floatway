
//=========================================================================
// COMMENT ROUTE
//=========================================================================
const express = require('express');
const router = express.Router({mergeParams: true});
const Training = require('../models/training');
const Comment = require('../models/comment');

//NEW - show form to add comment
router.get("/new",isLoggedIn,function(req, res) {
	//find training by id
	Training.findById(req.params.id, function(err, foundTraining) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {training: foundTraining});

		}
	});
});


router.post("/", function(req, res) {
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
                    console.log(`New comment username ${req.user.username}`); 
					//save the comment
					comment.save();
					//add new comment to comments collections
					foundTraining.comments.push(comment);
					foundTraining.save();
					console.log(comment);
					//redirect to show page	
					res.redirect('/trainings/' + foundTraining._id);
				}	
			});
		}
	});
});


//DEFINE MIDDLEWARE IS LOGIN
function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) {
		return next()
	}	
	res.redirect('/login');
}

module.exports = router;
