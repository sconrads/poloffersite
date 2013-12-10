// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

	mongoose.connect('mongodb://localhost:27017/offers'); 	// connect to mongoDB database on modulus.io

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});

	// define model =================

	var Offers = mongoose.model('Offers', {
		_id : String
	});

	// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all offers
	app.get('/api/offers', function(req, res) {

		Offers.find(function(err, offers) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(offers); 
		});
	});

	// get offers for a specific month
	app.get('/api/offers/:month_id', function(req, res) {

		Offers.find({
			_id : req.params.month_id 
		}, function(err, offers) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(offers);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


	// listen (start app with node server.js) ======================================
	app.listen(8080);
	console.log("App listening on port 8080");


	