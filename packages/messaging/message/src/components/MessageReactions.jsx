// @flow

import React, { Component } from 'react';

const getCounts = array =>
  array.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), Object.create(null));

export default class MessageReactions extends Component<*> {
  static defaultProps = {
    reactions: [],
  };

  render() {
    const { reactions } = this.props;
    const reactionsCounter = getCounts(reactions);
    return (
      <div className="mt-2">
        {Object.keys(reactionsCounter).map(reaction => (
          <button key={reaction} className="btn btn-sm border mr-2 px-2 py-1">
            {reaction} {reactionsCounter[reaction]}
          </button>
        ))}
      </div>
    );
  }
}
