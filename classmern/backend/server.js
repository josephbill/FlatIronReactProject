const express = require('express'); //requiring express
const cors  = require('cors'); //cors 
//connect to mongoDb using mongoose 
const mongoose = require('mongoose'); 

require('dotenv').config(); //requiring our environment variables 

//starting the express server and giving it a port to run on
const app = express();
const port = process.env.PORT || 5000;

//app should allow cross resource sharing 
app.use(cors());
app.use(express.json()); //allowing our app to receive and request for JSON data 

//require uri from mongodb atlas 
const uri  = process.env.ATLAS_URI; //pick actual uri from mongodb console 
//connect mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
	); //useNewUrlParser: true, useCreateIndex: true , these are flags that help deal with mongo updates  

const connection  = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

//informing the server to use the route files
//routes
const itemsRouter = require('./routes/items');
const shoppersRouter = require('./routes/shoppers');

//use the files 
app.use('/items', itemsRouter);
app.use('/shoppers',shoppersRouter);



//when app is running let me know via this message 
app.listen(port, () => {
	console.log(`server is running on port: ${port}` );
});

//start this server using the command nodemon server.js