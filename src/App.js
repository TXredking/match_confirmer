import React, { Component } from 'react';

import Player from './components/player';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App-main container-fluid">
        <header className="App-header row">
          <div className="col" />
          <h1 className="App-title col-lg-9">Is your partner the one?</h1>
          <div className="col" />
        </header>
        <div className="App-intro row">
          <div className="col" />
          <h2 className="col-lg-9">
            Answer the following questions and we will probably confirm what you
            were already thinking!
          </h2>
          <div className="col" />
        </div>
        <div className="row">
          <div className="col" />
          <Player className="col" />
          <div className="col" />
        </div>
      </div>
    );
  }
}

export default App;
