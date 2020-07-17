import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
  # DataFields

  DataFields manage a lot of data-driven interfaces. Depending on field-type many things should change, from available options and available question kinds, to how users can filter the field.

  A field can contain the following:

  - *form*: if the field requires additional info to be created (eg: select fields need options)
  - *importer*: helpers when importing raw data to match data with field's required format (eg: in a checkboxField, map true and false value from raw data)
  - *availableQuestions*: array of question kinds allowed for this field (eg: singleSelectField can have Select, RadioGroup or a FieldDownshift)
  - *availableFilters*: array of filters (eg: euquals, moreThan, contains, notEqual)

  ${code`import fields, { dateField } from '@uidu/data-fields';`}

  ${(
    <Example
      packageName="@uidu/data-fields"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}
`;
