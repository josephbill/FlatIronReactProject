import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


//Item component 
const Items = props => (
      <tr>
        <td>{props.items.username}</td>
        <td>{props.items.description}</td>
        <td>{props.items.duration}</td>
        <td>{props.items.date.substring(0,10)}</td>
        <td>
          <Link to={"/edit/" + props.items._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteItem(props.items._id)}}> Delete</a>
        </td>
      </tr>

	) 

export default class EditItem extends Component{
   constructor(props){
   	  super(props);

   	  this.deleteItem = this.deleteItem.bind(this);
   	  this.state = {items: []};
   }

   //and inside this method we will fetch our items before the page loads
   componentDidMount(){
       axios.get('http://localhost:5000/items/')
            .then(response => {
            	this.setState({ items: response.data})
            })
            .catch((error) => {
            	console.log(error);
            })
   }

   //delete item 
   deleteItem(id){
   	  axios.delete('http://localhost:5000/items' + id)
   	       .then(res => console.log(res.data));

   	       //also delete the item from the view 
   	       this.setState({
   	       	//here if item id does not equal the id we are deleting we can filter that in the table for view
   	       	    //_id is from mongoDB 
   	       	    items : this.state.items.filter(el => el._id != id)
   	       })
   }

   //itemlist
   itemList(){
   	   return this.state.items.map(currentitem => {
   	   	//passing 3 props here
   	   	  return <Items items={currentitem} deleteItem={this.deleteItem} key={currentitem._id} />;
   	   })
   }

	render(){
		return(
            <div>
            <h3>Shopping Activities</h3>
            <table className="table">
            <thead className="thead-light">
            <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              { this.itemList()}
            </tbody>
            </table>
            </div>
			);
			
		
	}
}