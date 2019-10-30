import Form from '@uidu/form';
import React, { PureComponent } from 'react';
import { singleSelectField, stringField } from '..';

const { form: SingleSelectForm } = singleSelectField;
const { form: StringForm } = stringField;

export default class Basic extends PureComponent {
  render() {
    return (
      <>
        <h6>
          {singleSelectField.icon} {singleSelectField.name}
        </h6>
        <p>{singleSelectField.description}</p>
        <Form
          footerRenderer={() => {}}
          handleSubmit={async model => console.log(model)}
        >
          <SingleSelectForm onSave={console.log} />
        </Form>
        <hr />
        <h6>
          {stringField.icon} {stringField.name}
        </h6>
        <p>{stringField.description}</p>
        <Form
          footerRenderer={() => {}}
          handleSubmit={async model => console.log(model)}
        >
          <StringForm onSave={console.log} />
        </Form>
      </>
    );
  }
}
