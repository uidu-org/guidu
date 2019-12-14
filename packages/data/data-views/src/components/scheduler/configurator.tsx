import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent {
  render() {
    return (
      <div>
        <p>Configure table view</p>
        <ul>
          <li>Visible fields (old toggler)</li>
          <li>Grouping (Grouper)</li>
        </ul>
      </div>
    );
  }
}
