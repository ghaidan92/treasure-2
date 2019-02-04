import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import LogIn from '../LogIn/index.js';
import Register from '../Register/index.js';
import './navbar.css';
import { MDBCol } from "mdbreact";
import SearchBar from '../SearchBar/index';


class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            x: 200,
            y: 0
        }
    }


    _onMouseMove = (e) => {
        const width = this.refs.AboutUsBox.clientWidth;
        const height = this.refs.AboutUsBox.clientHeight;
        const oX = (e.nativeEvent.offsetX / width) * 100;
        const oY = (e.nativeEvent.offsetY / height) * 100;
        console.log(oX, oY);
        this.setState({
            x: oX,
            y: oY
        })
    }


    showNavigation = () => {
        if (this.Auth.loggedIn()) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup"><Register /></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login"><LogIn /></Link>
                    </li>
                </ul>
            );
        }
    };

    render() {
        const { x, y } = this.state;
        const maskStyle = {
            '--maskX': x,
            '--maskY': y
        }
        return (
            <nav className="navbar navbar-expand-md navbarStyle">
                <div className="container">
                    <div className="titleContainer">
                        <Link className="navbar-brand treasureTitle" to="/" onMouseMove={this._onMouseMove} ref="AboutUsBox" style={maskStyle} >Treasure</Link>
                        <div className="navbar-brand treasureTitle cloneWrapper" to="/" onMouseMove={this._onMouseMove} ref="AboutUsBox" style={maskStyle}>Find <br />Hidden...</div>
                    </div>
                    <MDBCol md="6">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                        
                    </MDBCol>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        {this.showNavigation()}
                    </div>

                </div>

                <img className="shipMove" src="./images/ship.png" alt="ship" />
            </nav>
        )
    }
}


export default Navbar;