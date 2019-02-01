import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import ItemInputCard from "./ItemInputCard.js";
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    itemName: "",
    itemDescription: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      console.log(res);
      
      this.setState({
        username: res.data.username,
        email: res.data.email,
        userId: res.data._id
      })
    })
    // API.getItem(this.props.item).then(res => {
    //   console.log(res);
      
    //   this.setState({
    //     itemName: res.data.itemName,
    //     itemDescription: res.data.itemDescription,
    //     userId: res.data._id
    //   })
    // });
  }

  render() {
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <p></p>
        <ItemInputCard
          userId={this.state.userId}
        />
        <Link to="/">Go home</Link>
     
        
      </div>
    )
  }
}

export default withAuth(Profile);