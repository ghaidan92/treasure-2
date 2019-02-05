import React from 'react';
import API from '../utils/API'
import Modal from 'react-modal';
import './iteminputcard.css'

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
            zipCode: '',
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this); 
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        //the way the console log is located it looks like it is 1 letter behing but really it is not
        this.setState({
            [name]: value,
        });
        
    }

    handlePostItem = () => {
        const itemPicture = this.state.itemPicture;
        const { itemName, itemDescription, zipCode, } = this.state;
        let userId = this.props.userId
        const newItem = {
            itemName, 
            itemDescription,
            itemPicture,
            zipCode,
            userId
        }
        console.log("this.state")
        console.log(this.state)
        API.postItem(newItem)
        .then(
            this.setState({
                itemName: "",
                itemDescription: "",
                itemPicture: "",
                zipCode: ''
            })
        )
    }
    handleGetItem = (e) => {
        const { itemName, itemDescription, itemPicture, zipCode } = this.state;
        
        const newItem = {
            itemName, 
            itemDescription,
            itemPicture,
            zipCode
        }
        
        API.getItem(newItem)
        this.setState({
            itemName: "",
            itemDescription: "",
            itemPicture: "",
            username:"",
            zipCode:"",
           
        })

    }

    handleUploadImage(e) {

        e.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0] );
        data.append('category', 'image');
               
        fetch('https://www.fileconvrtr.com/api/convert/file?apiKey=a8f545dbb31244a5b081a8cc6bdf37f7',{
          method: 'POST',
          body: data
        }).then((response) => {
            
        response.json()
        .then((body) => {
            this.setState({
                itemPicture: body.s3Url  
            })
            this.handlePostItem();
            });
            
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
                <button className="postItem"onClick={this.openModal}><span class="replies">Post item</span>
                <span className="comment"> 🔱️</span></button>
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
                                    onChange={this.handleInputChange} 
                                     />

                                <div className="userInputTitleLogIn"> Upload Picture:</div>
                                <input type="file"
                                    ref={(ref) => { this.uploadInput = ref; }}
                                     />
                               
                               <input className="informationInuptLogIn"
                                    name="zipCode"
                                    placeholder=" zipCode"
                                    onChange={this.handleInputChange}
                                    value={this.state.zipCode} 
                                />


                                <button className="doneButtonLogIn" onClick={this.handleUploadImage} >Post Item</button>

                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ItemInputCard;