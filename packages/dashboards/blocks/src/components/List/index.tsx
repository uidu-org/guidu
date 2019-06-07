import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';

export default class ListBlock extends PureComponent<any> {
  render() {
    const { rowData, loaded } = this.props;
    const { data, timeline } = rowData;

    if (!loaded) {
      return <Spinner />;
    }

    return (
      <div className="card h-100">
        <div className="card-header">Featured</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    );
  }
}
