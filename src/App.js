import React, { Component } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import fire from './firebase';
import Login from './Containers/Authentification/Login';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      isReady: false
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ user, isReady: true });
      }else{
        this.setState({ user: null, isReady: false });
      }
    })
  }
  userReady(){
    if(this.state.isReady){
      return(<Layout />);
    }else{
      return(<Login />)
    }
  }
  render() {
    return (
      <div>
        {this.userReady()}
      </div>
    );
  }
}

export default App;
