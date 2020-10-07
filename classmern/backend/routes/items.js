const router = require('express').Router(); //require express
let Items = require('../models/items.model');//requiring the items model schema

//handling get requests i.e. fetching all items stored in our database
router.route('/').get((req, res) => {
	Items.find() //fetching all records from my database
	     .then(items => res.json(items)) //return json of items
	     .catch(err => res.status(400).json('Error: ' + err));
});

//now we add 
//handling post requests 
router.route('/add').post((req,res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);
     //creating the new item according to our schema 
	const newItem = new Items({
		username,
		description,
		duration,
		date
	});

	//save item 
    newItem.save()
           .then(() => res.json('Item added!')) //get json response if data is added successfully
           .catch(err => res.status(400).json('Error' + err)) //else response if error 

});


//route for fetching a specific item by id 
router.route('/:id').get((req, res) => {
	Items.findById(req.params.id)
	     .then(items => res.json(items))
	     .catch(err => res.status(400).json('Error: ' + err));
});

//route for update by id
router.route('/update/:id').post((req, res) => {
	Items.findById(req.params.id)
	     .then(items => {
              items.username = req.body.username;
              items.description = req.body.description;
              items.duration = Number(req.body.duration);
              items.date = Date.parse(req.body.date);

              items.save()
                   .then(() => res.json('Item is Updated'))
                   .catch(err => res.status(400).json('Error: ' + err))
	     })

	     .catch(err => res.status(400).json('Error ' + err));
});



//route for delete by id
router.route('/:id').delete((req, res) => {
	Items.findByIdAndDelete(req.params.id)
	     .then(() => res.json('Item deleted.'))
	     .catch(err => res.status(400).json('Error ' + err));
});



//export
module.exports = router;