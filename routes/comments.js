
//=========================================================================
// COMMENT ROUTE
//=========================================================================
const express = require('express');
const router = express.Router({mergeParams: true});
const Training = require('../models/training');
const Comment = require('../models/comment');
const middleware = require('../middleware');

//NEW - show form to add comment
router.get("/new",middleware.isLoggedIn,function(req, res) {
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

//COMMENT EDIT SHOW FORM

router.get('/:comment_id/edit',middleware.checkCommentOwnership, (req,res) => {
	//find the training
	Comment.findById(req.params.comment_id,(err, foundComment) => {
		if (err) {
			res.redirect('back');
		} else {
			//passing object {} training_id and comment to view to render
			res.render('comments/edit', {training_id: req.params.id, comment: foundComment});
		}
	});
});

//COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req,res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err,updatedComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect(`/trainings/${req.params.id}`);
		}
	});
});


//COMMENT DESTROY
router.delete('/:comment_id',middleware.checkCommentOwnership, (req,res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/trainings/' + req.params.id);
		}
	});
});



module.exports = router;
