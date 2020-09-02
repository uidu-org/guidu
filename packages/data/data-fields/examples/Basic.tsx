import Form from '@uidu/form';
import React, { PureComponent } from 'react';
import {
  linkRecordField,
  multipleSelectField,
  singleSelectField,
  stringField,
} from '../src';
import { formDefaultProps } from '../../../forms/form/examples-utils';

const { form: LinkRecordForm } = linkRecordField;
const { form: SingleSelectForm } = singleSelectField;
const { form: MultipleSelectForm } = multipleSelectField;
const { form: StringForm } = stringField;

export default class Basic extends PureComponent {
  render() {
    return (
      <>
        <h6>
          {linkRecordField.icon} {linkRecordField.name}
        </h6>
        <p>{linkRecordField.description}</p>
        <Form {...formDefaultProps}>
          <LinkRecordForm
            onSave={console.log}
            options={[{ id: 1, name: 'Donations' }]}
          />
        </Form>
        <hr />
        <h6>
          {singleSelectField.icon} {singleSelectField.name}
        </h6>
        <p>{singleSelectField.description}</p>
        <Form {...formDefaultProps}>
          <SingleSelectForm onSave={console.log} />
        </Form>
        <hr />
        <h6>
          {multipleSelectField.icon} {multipleSelectField.name}
        </h6>
        <p>{multipleSelectField.description}</p>
        <Form {...formDefaultProps}>
          <MultipleSelectForm
            onSave={console.log}
            options={[
              { id: 1, color: 'black', name: 'text' },
              { id: 2, color: '#ccc', name: 'Test' },
            ]}
          />
        </Form>
        <hr />
        <h6>
          {stringField.icon} {stringField.name}
        </h6>
        <p>{stringField.description}</p>
        <Form
          footerRenderer={() => {}}
          handleSubmit={async (model) => console.log(model)}
        >
          <StringForm onSave={console.log} />
        </Form>
      </>
    );
  }
}
