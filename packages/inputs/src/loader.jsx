import React, { Component } from 'react';
import Spinner from 'react-spinkit';

export default class Loader extends Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <Spinner name="wave" />
      </div>
    );
  }
}
