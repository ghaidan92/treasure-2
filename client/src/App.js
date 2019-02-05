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

  render() {
    // console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome!</h2>
        </div>
        <HomeImageList users={this.state.items}/>
        {/* <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p> */}
      </div>
    );
  }
}

export default App;
