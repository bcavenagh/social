import React, { Component } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import Dashboard from './Containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Layout/>
      </div>
    );
  }
}

export default App;
