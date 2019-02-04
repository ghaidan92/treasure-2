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

  componentDidMount() {
    API.getUser(this.props.user.id)
    .then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        userId: res.data._id,
        items: res.data.items
      })  
    })
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

        <ImageList itemObj={this.state.items} 
        username={this.state.username}/>

      </div>
    )
  }
}

export default withAuth(Profile);