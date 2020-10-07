const mongoose = require('mongoose'); //require mongoose
const Schema = mongoose.Schema; //intialize our schema
//create our schema format 
const shoppingItemsSchema = new Schema({
	//setting our entities and also doing the validation for each entity
	username: {type: String, required: true},
	description: {type: String, required: true},
	duration: {type: Number, required: true},
	date: {type: Date, required:true},
},{

	timestamps: true,
});
//create the new upload 
const Items  = mongoose.model('Items', shoppingItemsSchema);
//export 
module.exports = Items;