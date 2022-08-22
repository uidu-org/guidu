import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { Form } from '@uidu/form';
import React from 'react';
import { useDefaultForm } from '../../form/examples-utils';
import FieldGeosuggest from '../src';

export default function Basic() {
  const defaultForm = useDefaultForm();
  return (
    <Form {...defaultForm}>
      <FieldGeosuggest
        {...inputDefaultProps}
        rules={{
          required: { value: true, message: 'Required field' },
          maxLength: { value: 50, message: 'Max length is 10' },
        }}
        label="Enter a fruit"
        geolocationEnabled={false}
        // geocoderType={['(cities)']}
        countryRestricted="it"
        // valueGetter={(suggestion) => {
        //   console.log(suggestion);
        //   return suggestion.structured_formatting.main_text;
        // }}
      />
    </Form>
  );
}
