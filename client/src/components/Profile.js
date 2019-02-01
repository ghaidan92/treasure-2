import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import ItemInputCard from "./ItemInputCard.js";
import { Link } from 'react-router-dom';
import ImageList from './ImageList';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    items: [],
    itemObjects: []
  };

  itemloop(itemArr) {
    for (var i= 0; i < 5; i++) {
      API.getItem(itemArr[i]).then(res => {
        this.state.itemObjects.push({itemObjects: res})
        console.log(this.state.itemObjects);
      });
    }
  }

  componentDidMount() {
    API.getUser(this.props.user.id)
    .then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        userId: res.data._id,
        items: res.data.items
      })  
      console.log(this.state.items);
    })
    .then(data => {
      this.itemloop(this.state.items);
    })
  }

 



  render() {
    /*=========================================================== 
    THIS IS ABLE TO GRAB ITEM INFORMATION BASED ON USER STATE BUT NEED TO FIND WAY TO NOT HAVE ALL FUNCTIONALITY IN RENDER METHOD. GOAL IS TO LOOP THROUGH STATE AND MAKE DYNAMIC API CALLS PLUGGING IN EACH ELEMENT OF ITEMS ARRAY INTO FUNCTION PARAMETERS 
    =============================================================*/
  
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <ItemInputCard
          userId={this.state.userId}
        />
        <Link to="/">Go home</Link>

        <ImageList itemObjects={this.state.itemObjects} />

      </div>
    )
  }
}

export default withAuth(Profile);