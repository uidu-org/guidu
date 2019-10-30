import React, { PureComponent } from 'react';
import fields from '..';

export default class Basic extends PureComponent {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <tr>
              <td className="text-nowrap"><code>{field.id}</code></td>
              <td className="text-nowrap">
                <span className="mr-3">{field.icon}</span>
                {field.name}
              </td>
              <td>{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
