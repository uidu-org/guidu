import { Form } from '@uidu/form';
import React, { useRef, useState } from 'react';
import { formDefaultProps } from '../../form/examples-utils';

export const inputDefaultProps = {
  label: 'This is a form label',
  placeholder: 'This is a form placeholder',
  name: 'foo',
  onChange: console.log,
  // required: true,
  // help: <span className="text-primary">This is a node help</span>,
};

function FieldExampleBlock({ name, children }) {
  return (
    <div className="mb-4">
      <h5>{name}</h5>
      {children}
    </div>
  );
}

function FieldExampleEvents({ component: Component, defaultValue, ...rest }) {
  const [eventResults, setEventResults] = useState(
    'Click into and out of the input above to trigger onBlur & onFocus in the field',
  );

  const onChange = (name, value) => {
    setEventResults(`onChange called with value: ${value}`);
  };

  const onBlur = () => {
    setEventResults('onBlur called from FieldBase above');
  };

  const onFocus = () => {
    setEventResults('onFocus called from FieldBase above');
  };

  return (
    <Form {...formDefaultProps} footerRenderer={() => null}>
      <Component
        {...inputDefaultProps}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        label="With change, blur & focus handlers"
      />
      <div
        className="mb-3"
        style={{
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: '#ccc',
          padding: '0.5em',
          color: '#ccc',
        }}
      >
        {eventResults}
      </div>
    </Form>
  );
}

function FieldExampleAppearance({
  component: Component,
  defaultValue,
  ...rest
}) {
  return (
    <Form {...formDefaultProps} footerRenderer={() => null}>
      <Component
        {...inputDefaultProps}
        value={defaultValue}
        label="With default value"
      />
      <Component {...inputDefaultProps} disabled label="disabled" />
      <Component {...inputDefaultProps} required label="Required field" />
      <Component {...inputDefaultProps} isInvalid label="Invalid" />
      <Component
        {...inputDefaultProps}
        label="With help"
        help={<span className="text-primary">This is a node help</span>}
      />
      <Component
        {...inputDefaultProps}
        label={null}
        floatLabel="Test floating label"
      />
    </Form>
  );
}

export function FieldExampleRefs({ component: Component, ...rest }) {
  const ref = useRef(null);
  return (
    <Form {...formDefaultProps} footerRenderer={() => null}>
      <Component {...inputDefaultProps} componentRef={ref} />
      <div>
        <button
          onClick={e => {
            e.preventDefault();
            console.log(ref);
            ref.current.focus();
          }}
        >
          Focus component
        </button>
      </div>
    </Form>
  );
}

export function FieldExampleWithSubmit({ component: Component, ...rest }) {
  return (
    <Form {...formDefaultProps}>
      <Component {...inputDefaultProps} required />
    </Form>
  );
}

export function FieldExampleScaffold({ component, defaultValue, ...rest }) {
  return (
    <>
      <FieldExampleBlock name="With Event">
        <FieldExampleEvents component={component} {...rest} />
      </FieldExampleBlock>
      <FieldExampleBlock name="Appearance">
        <FieldExampleAppearance
          component={component}
          defaultValue={defaultValue}
          {...rest}
        />
      </FieldExampleBlock>
      <FieldExampleBlock name="Refs">
        <FieldExampleRefs component={component} />
      </FieldExampleBlock>
      <FieldExampleBlock name="With Submit">
        <FieldExampleWithSubmit component={component} />
      </FieldExampleBlock>
    </>
  );
}
