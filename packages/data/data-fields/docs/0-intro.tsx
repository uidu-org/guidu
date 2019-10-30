import { code, Example, md } from '@uidu/docs';
import * as React from 'react';
import fields from '..';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import fields, { dateField } from '@uidu/data-fields';`}

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
        {fields.map((field: any) => (
          <tr>
            <td className="text-nowrap">
              <code>{field.id}</code>
            </td>
            <td className="text-nowrap">
              <span className="mr-3">{field.icon}</span>
              {field.name}
            </td>
            <td>{field.description}</td>
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
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}
`;
