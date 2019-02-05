

import React from 'react';
 
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import AuthService from './../AuthService';
import API from '../../utils/API';
import './register.css'
// import { groupPatternsByBaseDirectory } from 'fast-glob/out/managers/tasks';

const customStyles = {

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class Register extends React.Component {


  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      modalIsOpen: false,
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      zipcode: '',
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.zipcode )
    .then(res=> {
    // this.Auth.login(this.state.email, this.state.password)  
    
        // once the user has signed up
        // send them to the login page
        this.closeModal();
        // window.location.replace("/profile")
        // this.props.history.replace('/login');
      })
      .catch(err => alert(err));
  };

  handleInputChange = e => {
    const {name, value} = e.target;
    //the way the console log is located it looks like it is 1 letter behing but really it is not
    console.log(this.state)
    this.setState({
        [name]: value
    });
}
//idea for what to do on submit
// handleFormSubmit = e => {
//     e.preventDefault();
//     API
//         .addNewMember(this.state)
//         .then(res => {
//             alert(`Added new member named: ${res.data.name}`)
//             this.setState({
//                 name: "",
//                 github:"",
//                 linkedin:""
//             });
//         })
//         .catch(err => console.log(err));   
// }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button className="signUpButton" onClick={this.openModal}><span class="replies">Sign Up</span>
    <span class="comment">&#9875;</span></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
         
        >
          <div className="registerModal">
            <button className="xButton" onClick={this.closeModal}>x</button>
            <br />
            <br />
            <div className="bodyOfReg">
            <h2 className="treasureMessage" ref={subtitle => this.subtitle = subtitle}>Start your treasure hunting adventure!</h2>

            <form>
              <div className="leftColumn">
              <div className="userInputTitle">First Name:</div>
              <input className="informationInupt"
                name="firstname"
                placeholder="Gold"
                value={this.state.firstname} 
                onChange={this.handleInputChange}
                
                 />

              <div className="userInputTitle">Last Name:</div>
              <input className="informationInupt"
                name="lastname"
                placeholder="Roger"
                value={this.state.lastname} 
                onChange={this.handleInputChange}/>


              <div className="userInputTitle">Email:</div>
              <input className="informationInupt"
                name="email"
                placeholder="goldroger@gmail.com"
                value={this.state.email} 
                onChange={this.handleInputChange} />
              </div>
              <div className="rightColumn">
              <div className="userInputTitle">Username:</div>
              <input className="informationInupt"
                name="username"
                placeholder="KingOfThePirates"
                onChange={this.handleInputChange}
                value={this.state.username} />

              <div className="userInputTitle">Password:</div>
              <input className="informationInupt"
              name="password"
                placeholder="LettersAnd123And!"
                value={this.state.password} 
                onChange={this.handleInputChange}/>


              <div className="userInputTitle">ZIP Code:</div>
              <input className="informationInupt"
                placeholder="00000"
                name="zipcode"
                value={this.state.zipcode} 
                onChange={this.handleInputChange} />
            
              </div>
            
              <button className="doneButton" onClick={this.handleFormSubmit}>Done</button>
                
            </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Register;