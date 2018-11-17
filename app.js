const express		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose		= require("mongoose"),
	moment 			= require('moment'),
	passport		= require('passport'),
	LocalStrategy 	= require('passport-local'),
	methodOverride	= require('method-override'),
	Training  		= require("./models/training"),
	User			= require('./models/user'),
	Comment     	= require("./models/comment"),
	seedDB			= require("./seeds");


const commentRoutes 	= require('./routes/comments'),
	  trainingRoutes 	= require('./routes/trainings'),
      indexRoutes 		= require('./routes/index');

// mongoose.connect("mongodb://localhost/floatway");
mongoose.connect("mongodb://satriyop:ann4lisa@ds147942.mlab.com:47942/floatway");

//mongodb://satriyop:ann4lisa@ds147942.mlab.com:47942/floatway


//process.env.databaseURL
console.log(process.env.GEOCODER_API_KEY);

app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));
// console.log(__dirname);


// seedDB();

//PASSPORT CONFIGURATION
//creating the session
app.use(require('express-session')({
	secret: 'floatway or high way!',
	resave: false,
	saveUninitialized: false
}));

//Use moment for all views files
app.locals.moment = moment;

//using passport
app.use(passport.initialize());
app.use(passport.session());

//using the localstrategy from passport
//called by route /login as middleware
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to pass currentUser object to every views
app.use((req,res,next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use(indexRoutes);
app.use('/trainings',trainingRoutes);
app.use('/trainings/:id/comments',commentRoutes);

app.listen(3000, () => console.log('floatway app listening on port 3000!'));
















































