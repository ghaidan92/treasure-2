import React, { Component } from 'react';

import './App.css';
import API from '../src/utils/API';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import HomeImageList from './components/HomeImageList'
const Auth = new AuthService();

class App extends Component {

  state = {
    items: []
  }

  componentDidMount = () => {

    API.getAllUsers()
    .then(res => {
      console.log(res.data)
      this.setState({
        items: res.data
      })

      console.log(this.state)
    });

  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };

  render() {
    // console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div className="App">
<<<<<<< HEAD
       
         
          {/* <h2>Welcome {this.props.user.email}</h2> */}
      
     
=======
        <div className="App-header">
          
          <h2>Welcome {this.props.user.email}</h2>
        </div>
        <HomeImageList users={this.state.items}/>
        <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p>
>>>>>>> e4ec3de407fa04d6b3a92935e3c4aa0f1cfd6fe1
      </div>
    );
  }
}

export default withAuth(App);
