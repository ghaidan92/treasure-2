import React from 'react';
import API from '../utils/API'
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
            zipCode: ''

        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        //the way the console log is located it looks like it is 1 letter behing but really it is not
        // console.log(this.state)
        this.setState({
            [name]: value
        });
    }

    handlePostItem = (e) => {
        e.preventDefault()
        const { itemName, itemDescription, itemPicture, zipCode } = this.state;
        let userId = this.props.userId
        const newItem = {
            itemName, 
            itemDescription,
            itemPicture,
            zipCode,
            userId
        }
    //    console.log(newItem)
        API.postItem(newItem)
        this.setState({
            itemName: "",
            itemDescription: "",
            itemPicture: "",
            username:"",
            
        })

    }
    handleGetItem = (e) => {
        e.preventDefault()
        const { itemName, itemDescription, itemPicture, username } = this.state;
        
        const newItem = {
            itemName, 
            itemDescription,
            itemPicture,
            username,
        }
       console.log(newItem)
        API.getItem(newItem)
        this.setState({
            itemName: "",
            itemDescription: "",
            itemPicture: "",
            username:"",
            zipCode:"",
           
        })

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

    // handleAddItemSubmit = e=>{
    //     e.preventDefault()
    //     console.log(this.props);
        
    //     var body = {
    //         itemName: this.state.zipCode,
    //         itemDescription: this.state.password,
    //         userId: this.props.userId
    //     }
        
    // }

    

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
                            <h2 className="treasureMessageLogIn" ref={subtitle => this.subtitle = subtitle}>List your Booty!</h2>

                            <form onSubmit={this.handlePostItem}>


                                <div className="userInputTitleLogIn">zipCode:</div>
                                

                                <div className="userInputTitleLogIn">Item Name:</div>
                                <input className="informationInuptLogIn"
                                    name="itemName"
                                    placeholder="Item name"
                                    value={this.state.itemName}
                                    onChange={this.handleInputChange} />

                                <div className="userInputTitleLogIn"> Item Description:</div>
                                <input className="informationInuptLogIn"
                                    name="itemDescription"
                                    placeholder="Describe your item"
                                    value={this.state.itemDescription}
                                    onChange={this.handleInputChange} />

                                <div className="userInputTitleLogIn"> Upload Picture:</div>
                                <input className="informationInuptLogIn"
                                    name="itemPicture"
                                    placeholder="Upload your picture here!"
                                    value={this.state.itemPicture}
                                    onChange={this.handleInputChange} />
                               
                               <input className="informationInuptLogIn"
                                    name="zipCode"
                                    placeholder=" zipCode"
                                    onChange={this.handleInputChange}
                                    value={this.state.zipCode} />


                                <button className="doneButtonLogIn" >Post Item</button>

                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ItemInputCard;