import Button from '@uidu/button';
import Form from '@uidu/form';
import React, { forwardRef, useImperativeHandle } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { useDefaultForm } from '../../form/examples-utils';
import FieldColorPicker from '../src';
import { FieldColorPickerProps } from '../src/types';

function Trigger(props) {
  const { toggleDialog, value, consumerRef, forwardedRef, ...rest } = props;

  useImperativeHandle(forwardedRef, () => consumerRef.current);

  return (
    <Button
      {...rest}
      ref={consumerRef}
      type="button"
      onClick={toggleDialog}
      tw="h-12 w-12"
      style={{
        backgroundColor: value,
      }}
    />
  );
}

const TriggerRef = forwardRef((props: FieldColorPickerProps, ref) => (
  <Trigger {...props} consumerRef={ref} />
));

export default function Basic() {
  const defaultForm = useDefaultForm();
  return (
    <Form {...defaultForm}>
      <FieldColorPicker {...inputDefaultProps} />
      <FieldColorPicker
        {...inputDefaultProps}
        name="foo1"
        value="#006688"
        // trigger={({ value, toggleDialog }) => (
        //   <div onClick={toggleDialog}>
        //     <p style={{ color: value }}>Ciaoone</p>
        //   </div>
        // )}
      />
      <div className="form-group">
        <FieldColorPicker
          {...inputDefaultProps}
          name="foo2"
          layout="elementOnly"
          trigger={TriggerRef}
          showInput={false}
        />
      </div>
      <FieldColorPicker
        {...inputDefaultProps}
        name="foo3"
        layout="elementOnly"
        tw="py-2"
      />
    </Form>
  );
}
