import Form from '@uidu/form';
import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { formDefaultProps } from '../../../forms/form/examples-utils';
import fields from '../src';

export default function Basic({}) {
  const [currentField, setCurrentField] = useState(fields[0]);
  const { form: AdditionalForm, Cell, valueFormatter, Filter } = currentField;

  console.log(currentField);

  return (
    <IntlProvider locale="en">
      <ShellSidebar className="border-right" style={{ width: '25%' }}>
        <ShellBody>
          <ScrollableContainer>
            <div className="py-4">
              <MenuGroup>
                <Section>
                  {fields.map((field) => (
                    <ButtonItem
                      key={field.kind}
                      onClick={() => setCurrentField(field)}
                      iconBefore={
                        <span
                          className="d-flex justify-content-center align-items-center rounded flex-shrink-0"
                          style={{
                            backgroundColor: field.color,
                            color: '#fff',
                            width: 28,
                            height: 28,
                          }}
                        >
                          {field.icon}
                        </span>
                      }
                      description={field.description}
                    >
                      {field.name}
                    </ButtonItem>
                  ))}
                </Section>
              </MenuGroup>
            </div>
          </ScrollableContainer>
        </ShellBody>
      </ShellSidebar>
      <ShellMain>
        <ShellHeader className="px-4 border-bottom">
          {currentField.name}
        </ShellHeader>
        <ShellBody>
          <ScrollableContainer>
            <div className="container my-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card mb-3">
                    <div className="card-header">
                      <div className="card-title mb-0">Cell renderer</div>
                      <p className="small text-muted mb-0">
                        This is how this field is rendered in dataviews
                      </p>
                    </div>
                    <div className="card-body">
                      {Cell ? (
                        <Cell
                          value={
                            currentField.mocks
                              ? currentField.mocks.value
                              : 'foo'
                          }
                          options={
                            currentField.mocks
                              ? currentField.mocks.options
                              : [{ id: 'foo', name: 'foo' }]
                          }
                        />
                      ) : valueFormatter ? (
                        valueFormatter('Foo')
                      ) : (
                        'Foo'
                      )}
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-header">
                      <div className="card-title mb-0">Filter Form</div>
                      <p className="small text-muted mb-0">
                        This form shows up when one wants to filter for this
                        field
                      </p>
                    </div>
                    <div className="card-body">
                      {Filter ? (
                        <Form {...formDefaultProps}>
                          <div className="form-group">
                            <Filter options={currentField.mocks?.options} />
                          </div>
                        </Form>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-header">
                      <div className="card-title mb-0">Settings Mode</div>
                      <p className="small text-muted mb-0">
                        This is shown for additional field settings, such as
                        formatting preferences
                      </p>
                    </div>
                    <div className="card-body"></div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-header">
                      <div className="card-title mb-0">Fill Field Form</div>
                      <p className="small text-muted mb-0">
                        This is shown when one wants to fill field value (It's
                        the corresponding question)
                      </p>
                    </div>
                    <div className="card-body"></div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-header">Edit Field Form</div>
                    <div className="card-body">
                      {AdditionalForm ? (
                        <Form {...formDefaultProps}>
                          <AdditionalForm />
                        </Form>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </ShellBody>
      </ShellMain>
    </IntlProvider>
  );
}
