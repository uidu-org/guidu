import React, { Component } from 'react';
import Propose from '../';

export default class Basic extends Component<any, any> {
  render() {
    return (
      <Propose
        proposal={{}}
        form={{ questions: [] }}
        onCreate={(_donation, token) => console.log(token)}
      />
    );
  }
}
