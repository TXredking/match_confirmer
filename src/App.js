import React, { Component } from 'react';
import './App.css';

const questions = [
  "Are y'all ready for this whole love thing?!",
  "The planet doesn't revolve around you, yes?",
  'Do you generally like other people?',
  'Is love really real?',
];

class Button extends Component {
  render() {
    const answer = this.props.answer;
    return (
      <button onClick={this.props.handleClick(answer)}>
        {answer}
      </button>
    );
  }
}

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'playerOne',
      playerOne: {
        name: 'Partner A', //if time add input so player's can input their own names
        questionNumber: 0,
        answers: [],
      },
      playerTwo: {
        name: 'Player B',
        questionNumber: 0,
        answers: [],
      },
    };
    this.initialState = this.state;
    this.handleClick = this.handleClick.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClick = (answer) => (e) => {
    e.preventDefault();
    const person = this.state[this.state.currentPlayer];
    const getOtherPerson = () => {
      const players = Object.keys(this.state);
      if (this.state.currentPlayer === players[1]) return players[2];
      return players[1];
    };

    const otherPerson = getOtherPerson();
    const answers = person.answers.slice();
    answers.push(answer)
    this.setState(previousState => {
      return {
        ...this.state,
        currentPlayer: otherPerson,
        [this.state.currentPlayer]: {
          ...person,
          questionNumber: person.questionNumber + 1,
          answers
        },
      };
    });
  }

  calculateScore() {
    const playerOneAnswers = this.state["playerOne"].answers;
    const playerTwoAnswers = this.state["playerTwo"].answers;
    let compatabilityScore = 0;

      playerOneAnswers.map((x, i) => {
        if (x === playerTwoAnswers[i]) return compatabilityScore = compatabilityScore + 1;
        return x;
      });

    return (compatabilityScore/4) * 100;
  }

  handleReset(e) {
    e.preventDefault();

    this.setState(this.initialState);
  }

  render() {
    const player = this.state[this.state.currentPlayer];
    if (this.state["playerTwo"].answers.length === questions.length) {
      const compatabilityScore = this.calculateScore();
      const positiveResponse = compatabilityScore > 50;

      return (
        <div className="card">
          <div className="card-header">{positiveResponse ? 'Congrats!' : 'Well this is awkward...'}</div>
          <div className="card-body">
            <h4 className="card-title">Your score is {`${compatabilityScore}%`}</h4>
            <button onClick={this.handleReset}>Try again?</button>
          </div>
        </div>)
    }

      return (
        <div className="card">
          <div className="card-header">{player.name}</div>
          <div className="card-body">
            <h4 className="card-title">{questions[player.questionNumber]}</h4>
            <Button answer="Yes" handleClick={this.handleClick} />{" "}
            <Button answer="No" handleClick={this.handleClick} />
          </div>
        </div>
      );
  }
}

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
