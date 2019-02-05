

import React from 'react';
 
import Modal from 'react-modal';
import './addpic.css'
import AuthService from './../AuthService';
import API from '../../utils/API';

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

class AddPic extends React.Component {


  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      modalIsOpen: false,
      picture: '',
     
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.picture )
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.closeModal();
        
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
        <button className="addPicButton" onClick={this.openModal}><span class="replies">Add Pic</span>
    <span class="comment">&#9875;</span></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="registerModal">
            <button className="xButton" onClick={this.closeModal}>x</button>
            <br />
            <br />
            <div className="bodyOfReg">
            <h2 className="treasureMessage" ref={subtitle => this.subtitle = subtitle}>What a beauty!</h2>

            <form>
             
              <div className="userInputTitle">Add Pic:</div>
              <input className="informationInupt"
                name="picture"
                placeholder=""
                value={this.state.picture} 
                onChange={this.handleInputChange}
                
                 />

            
            
              <button className="doneButton" onClick={this.handleFormSubmit}>Done</button>
                
            </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddPic;