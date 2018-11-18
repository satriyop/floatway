const Training = require('../models/training');
const Comment = require('../models/comment');

//all middleware goes here
const middlewareObj = {};

middlewareObj.checkTrainingOwnership = function  (req, res, next) {
	//check if user logged in, if not redirect
	if (req.isAuthenticated()) {
		Training.findById(req.params.id, (err, foundTraining) => {
			if(err) {
				res.redirect('back')
			} else {
			//if logged in, does trainer owns training, if so
			console.log(foundTraining.trainer.id);
			console.log(req.user.id)
			//they are above not equal though printed same, one string one object mongosoe
				if (foundTraining.trainer.id.equals (req.user.id)) {
					next()
				} else {
					req.flash('error', 'You are not authorized!');
					// console.log('trainer is not authorized');
					res.redirect('back')
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to edit!')
		// console.log('trainer need to be log in to edit');
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function  (req, res, next) {
	//check if user logged in, if not redirect
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err) {
				req.flash('error', 'Training not found');
				res.redirect('back')
			} else {
			//if logged in, does user owns comment, if so
			console.log(foundComment.author.id);
			console.log(req.user.id)
			//they are above not equal though printed same, one string one object mongosoe
				if (foundComment.author.id.equals (req.user.id)) {
					next()
				} else {
					req.flash('error', 'You are not authorized!');
					// console.log('user is not authorized');
					res.redirect('back')
				}
			}
		});
	} else {
		console.log('visitor need to be log in to edit');
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn = function (req,res,next) {
	if(req.isAuthenticated()) {
		return next()
	}
	req.flash('error', 'You are not logged in, yet!');	
	res.redirect('/login');
}

module.exports = middlewareObj