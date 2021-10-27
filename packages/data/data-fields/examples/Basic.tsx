import Form from '@uidu/form';
import { MenuGroup, RouterItem, Section } from '@uidu/menu';
import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter, Route, Switch, useParams } from 'react-router-dom';
import { formDefaultProps } from '../../../forms/form/examples-utils';
import fields, { Field } from '../src';

function CurrentField({ fields }) {
  const { kind }: { kind: string } = useParams();
  const [mocks, setMocks] = useState(null);
  const [isLoadingMocks, setIsLoadingMocks] = useState(true);
  const currentField: Field = fields.find(
    ({ kind: fieldKind }) => fieldKind === kind,
  );
  const {
    form: AdditionalForm,
    Cell,
    Filter,
    Grouper,
    Summary,
    mocks: mocksPromise,
  } = currentField;

  const fetchMocks = useCallback(async () => {
    if (mocksPromise && mocksPromise.load) {
      return mocksPromise.load().then((response) => {
        console.log(response);
        setMocks(response.default);
        setIsLoadingMocks(false);
      });
    }
    setMocks(mocksPromise);
    return setIsLoadingMocks(false);
  }, [kind]);

  useEffect(() => {
    setIsLoadingMocks(true);
    fetchMocks();
  }, [fetchMocks]);

  if (isLoadingMocks) {
    return null;
  }

  console.log(mocks);

  return (
    <>
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
                    value={mocks ? mocks.value : null}
                    options={mocks ? mocks.options : []}
                  />
                ) : (
                  mocks?.value || 'Foo'
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
                      <Filter
                        columnDef={{
                          cellProps: { options: mocks?.options || [] },
                        }}
                      />
                    </div>
                  </Form>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            <div tw="border rounded mb-4">
              <div tw="p-4 border-b border-opacity-40">
                <div tw="text-lg">Grouper Form</div>
                <p tw="text-sm">
                  This form shows up when one wants to group by this field
                </p>
              </div>
              <div tw="p-4">
                {Grouper ? (
                  <Form {...formDefaultProps}>
                    <div tw="mb-4">
                      <Grouper
                        columnDef={{
                          cellProps: { options: mocks?.options || [] },
                        }}
                      />
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
              <div tw="p-4 border-b border-opacity-40">
                <div tw="text-lg">Summary</div>
                <p tw="text-sm">
                  This is shown when one wants a summary of the field values for
                  this field
                </p>
              </div>
              <div tw="p-4">
                {Summary ? (
                  <div tw="mb-4">
                    <Summary values={mocks?.values} />
                  </div>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            <div tw="border rounded mb-4">
              <div tw="p-4 border-b border-opacity-40">
                <div tw="text-lg">Edit field mode</div>
                <p tw="text-sm">
                  This is shown when one wants to edit field value
                </p>
              </div>
              <div tw="p-4"></div>
            </div>
          </div>
        </ScrollableContainer>
      </ShellBody>
    </>
  );
}

function Basic({}) {
  return (
    <>
      <style>
        {`
      .active {
        background-color: rgba(var(--brand-primary), .1);
      }
      `}
      </style>
      <IntlProvider locale="en">
        <ShellSidebar tw="border-r" style={{ width: '25%' }}>
          <ShellBody>
            <ScrollableContainer>
              <div tw="py-4">
                <MenuGroup>
                  <Section>
                    {fields.map((field) => (
                      <RouterItem
                        key={field.kind}
                        to={`/${field.kind}`}
                        activeClassName="active"
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
                      </RouterItem>
                    ))}
                  </Section>
                </MenuGroup>
              </div>
            </ScrollableContainer>
          </ShellBody>
        </ShellSidebar>
        <ShellMain>
          <Switch>
            <Route
              path="/:kind"
              exact
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <CurrentField fields={fields} key={Date.now()} />
                </Suspense>
              )}
            ></Route>
          </Switch>
        </ShellMain>
      </IntlProvider>
    </>
  );
}

export default function () {
  return (
    <HashRouter>
      <Route path="/">
        <Basic />
      </Route>
    </HashRouter>
  );
}
