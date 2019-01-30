import React, { Component } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import fire from './firebase';
import Authentification from './Containers/Authentification/Authentification';

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
      return(<Authentification />)
    }
  }
  render() {
    return (
      <>
        {this.userReady()}
      </>
    );
  }
}

export default App;
