#YelpCamp

* Add Landing Page
* Add Campground Page that lists all campground


Each campground has
* Name
* Image

[
	{name: "Yogyakarta", image: "http://www.image.com"}
	{name: "Yogyakarta", image: "http://www.image.com"}
	{name: "Yogyakarta", image: "http://www.image.com"}
	{name: "Yogyakarta", image: "http://www.image.com"}
]

RESTFUL ROUTE

CAMPGROUND
name      url                   verb      desc
=====================================================
INDEX     campgrounds           GET       Display all campgrounds from DB
NEW       campgrounds/new       GET       Display form to add campgrounds that later add to DB
CREATE    campgrounds           POST      Add new campground to DB
SHOW      campgrounds/:id       GET       Show info about one (1) campground

COMMENT
name      url                   			verb      desc
=========================================================================
NEW       campgrounds/:id/comments/new   	GET       Display form to add campgrounds that later add to DB
CREATE    campgrounds/:id/comments   		POST      Add new campground to DB


#Layout and basic styling
* Create header and footer partials
* Add in bootstrap


#Creating New Campgrounds
* Setup new campgrounds route
* Add in body parser
* Setup route to show form
* Add basic unstyled form

#Style the campground page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a Navbar to all template
* Style the new campground form

#Add Mongoose
* installing & Config Mongoose
* Setup campground Model
* Use campground Model to our Routes

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
* Display comment on campground show

#Comment New/Create
* Discuss nested route
* Add the comment new and create route
* Add the new comment form










# floatway
