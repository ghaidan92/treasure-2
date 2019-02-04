import React, { Component } from 'react';

import './App.css';
import API from '../src/utils/API';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {

  state = {
    items: []
  }


  componentDidMount = () => {


    API.getAllItems()
    .then(res => {
      
      this.setState({
        items: res.data
      })

      console.log(this.state)
    })
  }
  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };

  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div className="App">
       
         
          {/* <h2>Welcome {this.props.user.email}</h2> */}
      
     
      </div>
    );
  }
}

export default withAuth(App);
