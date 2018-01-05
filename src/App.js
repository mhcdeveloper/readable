import React, { Component } from 'react';
import './App.css';

import NavBar from './shared/layout/NavBar';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
