import React, { Component } from 'react';
import './App.css';
import CampusSpaces from './CampusSpaces';
import Login from './Login';

class App extends Component {
  state = {
    isLoggedIn: false, // Can be changed using developer tools :(
    username: ""
  }

  render() {
    return (
      <div className="App">
      {this.state.isLoggedIn ? 
        <CampusSpaces 
          currentUser = {this.state.username}
        />
        :
        <Login
          updateLoggedIn = {(value) => this.setState({isLoggedIn: value})}
          updateUsername = {(value) => this.setState({username: value})}
        />
      }
      </div>
    );
  }
}

export default App;
