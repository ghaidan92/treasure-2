import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import ItemInputCard from "./ItemInputCard.js";
import { Link } from 'react-router-dom';
import ImageList from './ImageList';
import AddPic from './AddPic/index.js';
import './profile.css'
import Modal from 'react-modal';



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
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          zipcode: res.data.zipcode,
          email: res.data.email,
          userId: res.data._id,
          items: res.data.items
        })
      })
  }





  render() {

    return (
      <div className="container">
        <div className="Profile">
          <h1 className="headerProfile">Ye Profile</h1>
          <p>Ahoy {this.state.firstname} <span title="Will of the D., sign of a great pirate!">D</span> {this.state.lastname}!</p>
          <div className="profilePicture"></div>
          <AddPic />
          <p>Username: {this.state.username}</p>
          <p>Email: {this.state.email}</p>
          <p>Zipcode: {this.state.zipcode} </p>
        </div>
        {/* <Link to="/">Go home</Link> */}
        <ItemInputCard
          userId={this.state.userId}
        />
        <ImageList itemObj={this.state.items} />

      </div>
    )
  }
}

export default withAuth(Profile);