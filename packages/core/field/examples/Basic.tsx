import { Form } from '@uidu/form';
import React, { Component } from 'react';
import Field from '..';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Basic extends Component<any, any> {
  render() {
    return (
      <Form {...formDefaultProps}>
        <Field
          {...inputDefaultProps}
          kind="email"
          label="With email inputmode"
          name="forst"
        />
        <Field
          {...inputDefaultProps}
          kind="number"
          label="With change, blur & focus handlers"
          name="second"
        />
        <Field
          {...inputDefaultProps}
          kind="checkbox"
          label="With change, blur & focus handlers"
          name="third"
        />
        <Field
          {...inputDefaultProps}
          kind="singleSelect"
          label="With change, blur & focus handlers"
          options={[{ id: 'foo', name: 'bar' }]}
          name="forth"
        />
        <Field
          {...inputDefaultProps}
          kind="multipleSelect"
          label="With change, blur & focus handlers"
          options={[{ id: 'foo', name: 'bar' }]}
          name="fifth"
        />
      </Form>
    );
  }
}
