import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent {
  render() {
    return (
      <div>
        <p>Configure table view</p>
        <ul>
          <li>Choose field for address</li>
          <li>Visible fields</li>
        </ul>
      </div>
    );
  }
}
