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
      <ShellSidebar tw="border-r" style={{ width: '25%' }}>
        <ShellBody>
          <ScrollableContainer>
            <div tw="py-4">
              <MenuGroup>
                <Section>
                  {fields.map((field) => (
                    <ButtonItem
                      key={field.kind}
                      onClick={() => setCurrentField(field)}
                      iconBefore={
                        <span
                          tw="flex justify-center items-center rounded flex-shrink-0"
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
        <ShellHeader tw="px-4 border-b">{currentField.name}</ShellHeader>
        <ShellBody>
          <ScrollableContainer>
            <div tw="my-5 mx-auto max-w-5xl">
              <div tw="border rounded mb-4">
                <div tw="p-4 border-b border-opacity-40">
                  <div tw="text-lg">Cell renderer</div>
                  <p tw="text-sm">
                    This is how this field is rendered in dataviews
                  </p>
                </div>
                <div tw="p-4">
                  {Cell ? (
                    <Cell
                      value={
                        currentField.mocks ? currentField.mocks.value : 'foo'
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
              <div tw="border rounded mb-4">
                <div tw="p-4 border-b border-opacity-40">
                  <div tw="text-lg">Filter Form</div>
                  <p tw="text-sm">
                    This form shows up when one wants to filter for this field
                  </p>
                </div>
                <div tw="p-4">
                  {Filter ? (
                    <Form {...formDefaultProps}>
                      <div tw="mb-4">
                        <Filter options={currentField.mocks?.options} />
                      </div>
                    </Form>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
              <div tw="border rounded mb-4">
                <div tw="p-4 border-b border-opacity-40">
                  <div tw="text-lg">Settings Mode</div>
                  <p tw="text-sm">
                    This is shown for additional field settings, such as
                    formatting preferences
                  </p>
                </div>
                <div tw="p-4"></div>
              </div>
              <div tw="border rounded mb-4">
                <div tw="p-4 border-b border-opacity-40">
                  <div tw="text-lg">Fill Field Form</div>
                  <p tw="text-sm">
                    This is shown when one wants to fill field value (It's the
                    corresponding question)
                  </p>
                </div>
                <div tw="p-4"></div>
              </div>
              <div tw="border rounded mb-4">
                <div tw="p-4 border-b border-opacity-40">Edit Field Form</div>
                <div tw="p-4">
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
          </ScrollableContainer>
        </ShellBody>
      </ShellMain>
    </IntlProvider>
  );
}
