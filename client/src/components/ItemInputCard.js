import React from 'react';

import Modal from 'react-modal';

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

class ItemInputCard extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            itemName: '',
            itemDescription: '',
            itemPicture: '',
            Username:''

        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
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
                <button className="logInButton" onClick={this.openModal}>Post item</button>
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
                            <h2 className="treasureMessageLogIn" ref={subtitle => this.subtitle = subtitle}>Booty</h2>

                            <form>


                                <div className="userInputTitleLogIn">Username:</div>
                                <input className="informationInuptLogIn"
                                    name="username"
                                    placeholder="KingOfThePirates"
                                    onChange={this.handleInputChange}
                                    value={this.state.username} />

                                <div className="userInputTitleLogIn">Password:</div>
                                <input className="informationInuptLogIn"
                                    name="password"
                                    placeholder="LettersAnd123And!"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} />
                                {/* add other divs  */}




                                <button className="doneButtonLogIn">Done</button>

                            </form>
                        </div>  
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ItemInputCard;