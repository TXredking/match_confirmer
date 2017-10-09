import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const answer = this.props.answer;
    return (
      <button onClick={this.props.handleClick(answer)}>
        {answer}
      </button>
    );
  }
}
