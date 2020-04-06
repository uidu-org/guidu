import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import { formDefaultProps } from '../../form/examples-utils';
import FieldGeosuggest from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldGeosuggest
          {...inputDefaultProps}
          label="Enter a fruit"
          geolocationEnabled={false}
          // geocoderType={['(cities)']}
          countryRestricted="it"
          valueGetter={(suggestion) => {
            console.log(suggestion);
            return suggestion.structured_formatting.main_text;
          }}
        />
      </Form>
    );
  }
}
