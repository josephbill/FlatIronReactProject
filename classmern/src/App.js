import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"; //importing react router
import "bootstrap/dist/css/bootstrap.min.css"; //importing bootstrap

//react components
import Navbar from "./components/navbar.component";
import ItemList from "./components/shopping-list.component";
import EditItem from "./components/edit-shopping.component";
import CreateItem from "./components/create-item.component";
import CreateShopper from "./components/create-shopper.component";

function App() {
  return (
    // <div className="container">
    //      Hello World
    // </div>
    //creating our router elements 
    //the names in {} refer to the components for each view 
    <Router>
        <div className="container">
       <Navbar/>
       <br/>
       <Route path="/" exact component={ItemList} /> 
       <Route path="/edit/:id" component={EditItem}/>
       <Route path="/create" component={CreateItem}/>
       <Route path="/user" component={CreateShopper}/>

        </div>
    </Router>
  );
}

export default App;
