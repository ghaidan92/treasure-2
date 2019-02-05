

import React from 'react';
 
import Modal from 'react-modal';
import AuthService from './../AuthService';
import './login.css'
import { Link } from 'react-router-dom';
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

class LogIn extends React.Component {


  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      modalIsOpen: false,
      email: '',
      password: '',
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

  handleInputChange = e => {
    const { name, value } = e.target;
    //the way the console log is located it looks like it is 1 letter behing but really it is not
    console.log(this.state)
    this.setState({
      [name]: value
    });


  }
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // once user is logged in
        // take them to their profile page
        // alert("logged in");
        this.closeModal();
        window.location.reload("/");
        // this.props.history.replace(`/profile`);
      })
      .catch(err => {
        alert("error");
      });
  };
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
        <button className="logInButton"  onClick={this.openModal}>   <span class="replies">Log In</span>
    <span class="comment">🚣‍♂️</span></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="registerModalLogIn">
            <button className="xButtonLogIn" onClick={this.closeModal}>x</button>
            <br />
            <br />
            <div className="bodyOfRegLogIn">
              <h2 className="treasureMessageLogIn" ref={subtitle => this.subtitle = subtitle}>Ahoy Matey!</h2>

              <form>


                <div className="userInputTitleLogIn">Email:</div>
                <input className="informationInuptLogIn"
                  name="email"
                  placeholder="KingOfThePirates@gmail.com"
                  onChange={this.handleInputChange}
                  value={this.state.email} />

                <div className="userInputTitleLogIn">Password:</div>
                <input className="informationInuptLogIn"
                  name="password"
                  placeholder="LettersAnd123And!"
                  value={this.state.password}
                  onChange={this.handleInputChange} />




                <button type="submit" className="doneButtonLogIn" onClick={this.handleFormSubmit}>Done</button>

              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default LogIn;