import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import ItemInputCard from "./ItemInputCard.js";
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    items: []
  };

  componentDidMount() {
    API.getUser(this.props.user.id)
    .then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        userId: res.data._id,
        items: res.data.items
      })  
    });
  }


  render() {
    /*========= THIS IS ABLE TO GRAB ITEM INFORMATION BASED ON USER STATE BUT NEED TO FIND WAY TO NOT HAVE ALL FUNCTIONALITY IN RENDER METHOD. GOAL IS TO LOOP THROUGH STATE AND MAKE DYNAMIC API CALLS PLUGGING IN EACH ELEMENT OF ITEMS ARRAY INTO FUNCTION PARAMETERS============================*/
    for (var i= 0; i < this.state.items.length; i++) {
      console.log(i)
      API.getItem(this.state.items[i]).then(res => {
        console.log(res);
      });
    }
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <ItemInputCard
          userId={this.state.userId}
        />
        <Link to="/">Go home</Link>

     
        
      </div>
    )
  }
}

export default withAuth(Profile);