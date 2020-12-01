import { code, Example, md } from '@uidu/docs';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import fields from '../src';

export default md`
  # DataFields

  DataFields manage a lot of data-driven interfaces. Depending on field-type many things should change, from available options and available question kinds, to how users can filter the field.

  A field can contain the following:

  - *form*: if the field requires additional info to be created (eg: select fields need options)
  - *importer*: helpers when importing raw data to match data with field's required format (eg: in a checkboxField, map true and false value from raw data)
  - *availableQuestions*: array of question kinds allowed for this field (eg: singleSelectField can have Select, RadioGroup or a FieldDownshift)
  - *availableFilters*: array of filters (eg: euquals, moreThan, contains, notEqual)

  ## Usage

  ${code`import fields, { dateField } from '@uidu/data-fields';`}

  ${(
    <IntlProvider locale="en">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field: any) => (
            <tr>
              <td className="text-nowrap" style={{ verticalAlign: 'middle' }}>
                <code>{field.kind}</code>
              </td>
              <td className="">
                <div className="d-flex align-items-center">
                  <span
                    className="mr-3 d-flex justify-content-center align-items-center rounded flex-shrink-0"
                    style={{
                      backgroundColor: field.color,
                      width: 28,
                      height: 28,
                    }}
                  >
                    {field.icon}
                  </span>
                  <div className="">
                    <p className="mb-0">{field.name}</p>
                    <p className="mb-0 text-muted small">{field.description}</p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </IntlProvider>
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
