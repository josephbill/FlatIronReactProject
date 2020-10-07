const router = require('express').Router(); //use express
let User = require('../models/shoppers.model'); //use the shoppers.model.js schema 
// route for getting our shoppers 
//handles incoming get requests
router.route('/').get((req, res) => {
	User.find()
	   .then(shoppers => res.json(shoppers)) //return json of shopper
	   .catch(err => res.status(100).json('Error: ' + err)); //if error display the error 
});
//route for adding a shopper
//handling post request
router.route('/add').post((req, res) => {
	const username = req.body.username;
	//create new shopper
	const newUser = new User({username});
    //save shopper 
    
    newUser.save()
	  .then(() => res.json('shopper added')) //return json if shopper is added 
	  .catch(err => res.status(400).json('Error' + err)); //return error message if error occurs
});
//finally export
module.exports = router;