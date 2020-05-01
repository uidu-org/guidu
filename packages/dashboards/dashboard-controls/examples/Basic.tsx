import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import { More } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div className="d-flex align-items-center p-3">
        <More />
      </div>
    );
  }
}
