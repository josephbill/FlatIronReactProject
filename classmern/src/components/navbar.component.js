import React, { Component } from 'react';//requiring react
import { Link } from 'react-router-dom';//requiring the react router
//this is how components start
export default class Navbar extends Component{
//all components requirre a render 
	render() {
		return(
	//the navbar is just as in bootstrap but now it has been converted to React
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<Link to="/" className="navbar-brand">Shopping App</Link>
			<div className="collapse navbar-collapse">
			<ul className="navbar-nav">
			<li className="navbar-item">
			<Link to="/" className="nav-link">Items</Link> 
			</li>
			<li className="navbar-item">
			<Link to="/create" className="nav-link">Create Shopping Log</Link>
			</li>
			<li className="navbar-item">
			<Link to="/user" className="nav-link">Create Shopper</Link>
			</li>
            </ul>
            </div>
            </nav>
			);
	}
}