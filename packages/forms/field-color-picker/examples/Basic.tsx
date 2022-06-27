import Button from '@uidu/button';
import { Form } from '@uidu/form';
import { forwardRef, PureComponent, useImperativeHandle } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldColorPicker from '../src';
import { FieldColorPickerProps } from '../src/types';

function Trigger(props) {
  const { toggleDialog, value, consumerRef, forwardedRef, ...rest } = props;
  console.log(props);

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

export default class Basic extends PureComponent {
  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldColorPicker {...inputDefaultProps} />
        <FieldColorPicker
          {...inputDefaultProps}
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
            layout="elementOnly"
            trigger={TriggerRef}
            showInput={false}
          />
        </div>
      </Form>
    );
  }
}
