import { code, Example, md, Table, Td, Th, Tr } from '@uidu/docs';
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
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
          </Tr>
        </thead>
        <tbody>
          {fields.map((field: any) => (
            <Tr key={field.kind}>
              <Td>
                <code>{field.kind}</code>
              </Td>
              <Td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      backgroundColor: field.color,
                      color: '#fff',
                      width: 28,
                      height: 28,
                      marginRight: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      flexShrink: 0,
                    }}
                  >
                    {field.icon}
                  </span>
                  <div>
                    <p style={{}}>{field.name}</p>
                    <p style={{ fontSize: '.95rem', color: 'gray' }}>
                      {field.description}
                    </p>
                  </div>
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </IntlProvider>
  )}

  ${(
    <Example
      packageName="@uidu/data-fields"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
      overflowHidden
      fullWidth
      style={{ flexDirection: 'row' }}
    />
  )}
`;
