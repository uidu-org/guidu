import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent {
  render() {
    return (
      <div>
        <p>Configure calendar view</p>
        <ul>
          <li>Select date range fields</li>
          <li>Choose default view</li>
          <li>Visible fields (old toggler)</li>
        </ul>
      </div>
    );
  }
}
