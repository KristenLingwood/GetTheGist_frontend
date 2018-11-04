import React, { Component } from 'react';
import Header from '../Header';
import Routes from '../Routes';
import Footer from '../Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;