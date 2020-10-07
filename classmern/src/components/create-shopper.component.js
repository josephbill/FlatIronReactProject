import React, { Component } from 'react';
import axios from 'axios';

export default class EditItem extends Component{
   constructor(props){
   	   super(props);
       //binding methods to this class
   	   this.onChangeUsername = this.onChangeUsername.bind(this);
   	   this.onSubmit = this.onSubmit.bind(this);

   	   //saving users input 
   	   this.state = {
   	   	    username: '',
   	   }
   }

     onChangeUsername(e){
    	this.setState({
    		username: e.target.value
    	});
    }


     onSubmit(e){
    	//prevent default html submit action
    	e.preventDefault();

    	//next we store users input in a variable 
    	//when u create a variable inside a method in react then u can use the const and let keywords
    	//as long as that variable is explicitly used in the method
    	const user = {
    		username: this.state.username,
    	}
        //for testing
    	console.log(user);

        //sending http request  // sending data to mongoDatabase
        axios.post('http://localhost:5000/shoppers/add', user)
             .then(res => console.log(res.data));

    	//set user name back to blank so they can enter a username 
    	this.setState({
    		username: ''
    	})
    }


	render(){
		return(
             <div>
                <h3>Create Shopper</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>username: </label>
                        <input type="text"
                          required
                          className="form-control"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Shopper" className="btn btn-primary"/>
                    </div>
                </form>
             </div>
			);
			
		
	}
}