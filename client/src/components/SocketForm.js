import React, { Component } from 'react';
import { sockets } from '../../utils/sockets';


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

                        <form id="messageForm">
                            <div class="form-group">
                                <label>Enter Message</label>
                                <textarea class="form-control" id="message"></textarea>
                                <br />
                                <input type="submit" class="btn btn-primary" value="Send Message" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default SocketForm;