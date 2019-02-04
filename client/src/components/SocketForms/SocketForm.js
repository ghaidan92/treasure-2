import React, { Component } from 'react';
import './SocketForm.css';
import { sockets } from '../../utils/sockets';
import API from '../../utils/API';


class SocketForm extends Component {
    state = {
        message: '',
        sentMessage: '',
        messages: []
    };

    constructor(props) {
        super(props);
        sockets.listenForMessage(data => {
            this.setState({ messages: [...this.state.messages, data] })
        });
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    submitForm = event => {
        event.preventDefault();
        sockets.sendMessage(this.state.message);
        this.setState({ message: "" });
    };
    handlePostChat = (e) => {
        e.preventDefault()
        const { message } = this.state;
        let userId = this.props.userId
        const newChat = {
            message,
            userId
        }
    //    console.log(newChat)
        API.postChat(newChat)
        this.setState({
            message: ""
            
        })

    }
    // handleGetChats = (req, res) => {
    //     API.getAllChats()
    //     .then(res.jason())
    //   }

    render() {
        return (
            <div class="container">
                <div id="messageArea" class="row">
                    <div class="col-md-4">
                        {/* <div class="well">
                            <h3>Online Users</h3>
                            <ul class="list-group" id="users"></ul>
                        </div> */}
                    </div>
                    <div class="col-md-8">
                        <div class="chat" id="chat"></div>
                        {this.state.messages.map(message => <li key={message}>{message}</li>)}
                        <form id="messageForm">
                            <div class="form-group">
                                <label>Enter Message</label>
                                <div class="form-control" id="message" placeholder="messages appear here">{this.messages}</div>
                                <br />
                                <input
                                    value={this.state.message}
                                    name="message"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="your message"
                                    className="form-control"
                                />
                                <input type="submit" class="btn btn-primary" value="Send Message" onClick={this.handlePostChat} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default SocketForm;