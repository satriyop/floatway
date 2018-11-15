
//============
//AUTH ROUTES
//=============
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

//index homepage
router.get("/",function(req, res){
	res.render("landing");
});

//show register form
router.get('/register', (req,res) => {
	res.render('register');
});

//handle the sign up/register post
router.post('/register', (req,res) => {
	const newUser = new User({username: req.body.username});
	const newUserPassword = req.body.password;
	User.register(newUser, newUserPassword, (err, user) => {
		if (err) {
			console.log(err);
			return res.sender('register');
		}
		passport.authenticate('local')(req, res, ()=>{
			res.redirect('/trainings')
		})
	} )
});

//show login form
router.get('/login', (req,res) => {
	res.render('login');
});

//handling login logic
//use passport as middleware
router.post('/login',passport.authenticate('local', {
	successRedirect: '/trainings',
	failureRedirect: '/login'
}), (res,req) => {
	
})

//logout logic
//prevent comment if not logged in
router.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/trainings');
})

//DEFINE MIDDLEWARE IS LOGIN
function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) {
		return next()
	}	
	res.redirect('/login');
}

module.exports = router;