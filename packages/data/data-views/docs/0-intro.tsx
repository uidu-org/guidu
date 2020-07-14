import { code, Example, md } from '@uidu/docs';
import * as React from 'react';
import dataViews from '..';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import dataViews, { dateField } from '@uidu/data-views';`}

  ${(
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {dataViews.map(({ id, icon: Icon, name, description, color }) => (
          <tr>
            <td className="text-nowrap">
              <code>{id}</code>
            </td>
            <td className="text-nowrap">
              <div className="d-flex align-items-center">
                <span className="mr-2 d-flex">
                  <Icon size={16} color={color} />
                </span>
                {name}
              </div>
            </td>
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  ${(
    <Example
      packageName="@uidu/data-fields"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}
`;
