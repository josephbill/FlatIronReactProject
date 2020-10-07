import React, { Component } from 'react';
import DatePicker from 'react-datepicker'; //importing date picker 
import axios from 'axios';
export default class CreateItem extends Component{
    //create my constructor
    constructor(props){
    	super(props);
        //binding the methods to this class 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    	this.state = {
    		username: '',
    		description: '',
    		duration: 0,
    		date: new Date(),
    		users: [] //this will allow us to store our users 
    	}
    }

    //loading a default user for test
    componentDidMount(){
    	// this.setState({
    	// 	users: ['test user'],
    	// 	username: 'test user'
    	// })
    	axios.get('http://localhost:5000/shoppers/')
    	     .then(response => {
    	     	//first check if users are actually present 
    	     	if (response.data.length > 0) {
    	     		this.setState({
    	     			users: response.data.map(shoppers => shoppers.username),
    	     			username: response.data[0].username
    	     		})
    	     	}
    	     })
    }

    onChangeUsername(e){
    	this.setState({
    		username: e.target.value
    	});
    }

    onChangeDescription(e){
    	this.setState({
    		description: e.target.value
    	});
    }

    onChangeDuration(e){
    	this.setState({
    		duration: e.target.value
    	});
    }

    onChangeDate(date){
    	this.setState({
    		date: date
    	});
    }

    onSubmit(e){
    	//prevent default html submit action
    	e.preventDefault();

    	//next we store users input in a variable 
    	//when u create a variable inside a method in react then u can use the const and let keywords
    	//as long as that variable is explicitly used in the method
    	const exercise = {
    		username: this.state.username,
    		description: this.state.description,
    		duration: this.state.duration,
    		date: this.state.date
    	}

        //sending http request  // sending data to mongoDatabase
        axios.post('http://localhost:5000/items/add', exercise)
             .then(res => console.log(res.data));

        //for testing
    	console.log(exercise);



    	//redirect user to view all items when an item is added succesfully
    	window.location = "/";
    }

	render(){
		return(
           //creating the form 
           //and add the necessary methods
           <div>
              <h3>Create a shopping item</h3>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                >
                {
                	//this data will come from database 
                	//and will map that data to the option element
                	this.state.users.map(function(user){
                		return <option
                         key={user}
                		>{user}
                		</option>;
                	})
                }
                </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input 
                    type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                  </div>
                  <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                    />
                    </div>
                    <div className="form-group">
                      <label>Date: </label>
                      <div>
                      <DatePicker
                        selected = {this.state.date}
                        onChange= {this.onChangeDate}
                      />
                      </div>
                    </div>

                    <div className="form-group">
                       <input type="submit" value="Create Item" className="btn btn-primary"/>
                    </div>
              </form> 
           </div>


			);
			
		
	}
}