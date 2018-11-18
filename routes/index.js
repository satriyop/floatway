
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
	res.render('register', {page: 'register'});
});

//handle the sign up/register post
router.post('/register', (req,res) => {
	const newUser = new User({username: req.body.username});
	const newUserPassword = req.body.password;
	User.register(newUser, newUserPassword, (err, user) => {
		if (err) {
			req.flash('error', err.message);
			console.log(err);
			return res.redirect('register');
		}
		passport.authenticate('local')(req, res, ()=>{
			req.flash('success', 'Welcome to Floatway Training Partner ' + user.username);
			res.redirect('/trainings')
		})
	} )
});

//show login form
router.get('/login', (req,res) => {
	res.render('login', {page: 'login'});
});

//handling login logic
//use passport as middleware
router.post('/login',passport.authenticate('local', {
	successRedirect: '/trainings',
	failureRedirect: '/login',
	successFlash: 'Welcome to Floatway',
	failureFlash: true
}), (res,req) => {
	
})

//logout logic
//prevent comment if not logged in
router.get('/logout', (req,res) => {
	req.logout();
	req.flash('success', "You are logged out");
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