import Form from '@uidu/form';
import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { formDefaultProps } from '../../../forms/form/examples-utils';
import {
  appointmentField,
  multipleSelectField,
  singleSelectField,
  stringField,
} from '../src';

const { form: SingleSelectForm } = singleSelectField;
const { form: MultipleSelectForm } = multipleSelectField;
const { form: StringForm } = stringField;
const { form: AppointmentForm } = appointmentField;

export default class Basic extends PureComponent {
  render() {
    return (
      <IntlProvider locale="en">
        <div className="d-flex align-items-center mb-4">
          <span
            className="mr-3 d-flex justify-content-center align-items-center rounded flex-shrink-0"
            style={{
              backgroundColor: singleSelectField.color,
              color: '#fff',
              width: 28,
              height: 28,
            }}
          >
            {singleSelectField.icon}
          </span>
          <div className="">
            <p className="mb-0">{singleSelectField.name}</p>
            <p className="mb-0 text-muted small">
              {singleSelectField.description}
            </p>
          </div>
        </div>
        <Form {...formDefaultProps}>
          <SingleSelectForm onSave={console.log} />
        </Form>
        <hr />
        <div className="d-flex align-items-center mb-4">
          <span
            className="mr-3 d-flex justify-content-center align-items-center rounded flex-shrink-0"
            style={{
              backgroundColor: multipleSelectField.color,
              color: '#fff',
              width: 28,
              height: 28,
            }}
          >
            {multipleSelectField.icon}
          </span>
          <div className="">
            <p className="mb-0">{multipleSelectField.name}</p>
            <p className="mb-0 text-muted small">
              {multipleSelectField.description}
            </p>
          </div>
        </div>
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
        <div className="d-flex align-items-center mb-4">
          <span
            className="mr-3 d-flex justify-content-center align-items-center rounded flex-shrink-0"
            style={{
              backgroundColor: stringField.color,
              color: '#fff',
              width: 28,
              height: 28,
            }}
          >
            {stringField.icon}
          </span>
          <div className="">
            <p className="mb-0">{stringField.name}</p>
            <p className="mb-0 text-muted small">{stringField.description}</p>
          </div>
        </div>
        <Form
          footerRenderer={() => {}}
          handleSubmit={async (model) => console.log(model)}
        >
          <StringForm onSave={console.log} />
        </Form>
        <div className="d-flex align-items-center mb-4">
          <span
            className="mr-3 d-flex justify-content-center align-items-center rounded flex-shrink-0"
            style={{
              backgroundColor: appointmentField.color,
              color: '#fff',
              width: 28,
              height: 28,
            }}
          >
            {appointmentField.icon}
          </span>
          <div className="">
            <p className="mb-0">{appointmentField.name}</p>
            <p className="mb-0 text-muted small">
              {appointmentField.description}
            </p>
          </div>
        </div>
        <Form
          footerRenderer={() => {}}
          handleSubmit={async (model) => console.log(model)}
        >
          <AppointmentForm onSave={console.log} />
        </Form>
      </IntlProvider>
    );
  }
}
