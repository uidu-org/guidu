// @flow

import React, { Fragment } from 'react';
import Form from '@uidu/form';
import { cities } from './common/data';
import Select from '../src';

type ValidationState = 'default' | 'error' | 'success';
const errorMsg = 'This field is required.';

const validate = value => {
  if (!value) {
    return 'EMPTY';
  }
  return undefined;
};

const getValidationState = (error, valid): ValidationState => {
  if (!error && !valid) {
    return 'default';
  } else if (valid === true) {
    return 'success';
  }
  return 'error';
};

const ValidationExample = () => (
  <Form onSubmit={data => console.log(data)}>
    {({ formProps }) => (
      <form {...formProps}>
        <Field label="Failed Select" name="fail-city" validate={validate}>
          {({ fieldProps, error, meta: { valid } }) => (
            <Fragment>
              <Select
                {...fieldProps}
                options={cities}
                placeholder="Choose a City"
                validationState={getValidationState(error, valid)}
              />
              {error === 'EMPTY' && <ErrorMessage>{errorMsg}</ErrorMessage>}
            </Fragment>
          )}
        </Field>
        <hr style={{ border: 0, margin: '1em 0' }} />
        <Field
          label="Successful Select"
          helperText="This select is successful"
          id="success"
          name="success-city"
          defaultValue={cities[0]}
          validate={validate}
        >
          {({ fieldProps, error, meta: { valid } }) => (
            <Select
              {...fieldProps}
              options={cities}
              placeholder="Choose a City"
              validationState={getValidationState(error, valid)}
            />
          )}
        </Field>
      </form>
    )}
  </Form>
);

export default ValidationExample;
