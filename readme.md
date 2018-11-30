#Floatway

* Add Landing Page
* Add Training Page that lists all campground


Each training has
* Name
* Image
* Description
* Trainer
* Comments
* Reviews

#seeding DB

[
	{name: "Blockchain", image: "http://www.image.com", description: "lorem", trainer: "Joni"}
	{name: "Optimize 3G", image: "http://www.image.com, description: "lorem", trainer: "Alex"}
	{name: "Machine Learning", image: "http://www.image.com", description: "lorem", trainer: "Felix"}
	{name: "Artificial Intelligence", image: "http://www.image.com", description: "lorem", trainer: "rizky"}
]


#Data Association

#Data Reference

RESTFUL ROUTE

TRAINING
name      url                   verb      desc
=====================================================
INDEX     trainings   	        GET       Display all trainings from DB
NEW       trainings/new 	    GET       Display form to add trainings that later add to DB
CREATE    trainings         	POST      Add new trainings to DB
SHOW      trainings/:id       	GET       Show info about one (1) trainings
EDIT	  trainings/:id/edit	GET		  Display form for edit training		
UPDATE	  trainings/:id			PUT		  Update the edited training
DESTROY	  trainings/:id			DELETE	  Delete Training

COMMENT
name      url                   					verb      desc
=========================================================================
NEW       trainings/:id/comments/new   				GET       Display form to add comments @ training
CREATE    trainings/:id/comments   					POST      Add new comments to DB
EDIT	  trainings/:id/comments/:comment_id/edit	GET		  Display form to edit comment
UPDATE	  trainings/:id/comments/:comment_id		PUT		  Update the edited comments @ training
DESTROY	  trainings/:id/comments/:comment_id		DELETE	  Delete comment

REVIEW
name      url                   					verb      desc
=========================================================================
NEW       trainings/:id/reviews/new   				GET       Display form to add comments @ training
CREATE    trainings/:id/reviews   					POST      Add new comments to DB
EDIT	  trainings/:id/reviews/:review_id/edit		GET		  Display form to edit comment
UPDATE	  trainings/:id/reviews/:review_id			PUT		  Update the edited comments @ training
DESTROY	  trainings/:id/reviews/:review_id			DELETE	  Delete comment



#Layout and basic styling
* Create header and footer partials
* Add in bootstrap, jQuery, font


#Creating New Trainings
* Setup new campgrounds route
* Add in body parser
* Setup route to show form
* Add basic unstyled form

#Style the training page
* Add a better header/title
* Make training display in a grid

#Style the Navbar and Form
* Add a Navbar to all template
* Style the new training form

#Add Mongoose
* installing & Config Mongoose
* Setup training Model
* Use training Model to our Routes

#Show Page 
* Review RESTful routes we've seen
* Add description to our campground model
* Show db.collections.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use export module
* Require everything correctly

#Add seeds file
* Add a seeds.js file
* Run the seeds file every time the server start

#Add Comment Model
* Make error go
* Display comment on training show

#Comment New/Create
* Discuss nested route
* Add the comment new and create route
* Add the new comment form


#Authentication
* Tools for authentication
	* Passport
	* Passport Local
	* Passport Local Mongoose
	* Auth Flow
	* Expess-session
* Add Register routes
* Add Register form

* Add Login routes
* Add Login Form

* Add Logout routes
* Add isLoggedIn Middleware
* Add checkTrainingOwnership Middleware
* Add checkCommentOwnership Middleware



# Middleware
* isLoggedIn
* checkTrainingOwnership
* checkCommentOwnership


