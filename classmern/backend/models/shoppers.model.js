//require mongoose first 
const mongoose = require('mongoose');
//intialize the schema
const Schema = mongoose.Schema;
//declare the fields for the shoppers schema
const userSchema = new Schema({
	//we will store a shopper name in the field username
	username: {
		//validation for the entries 
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3
	},
}, {
    timestamps: true,

});
//store this upload
const User = mongoose.model('Shopper',userSchema);
//export
module.exports = User;