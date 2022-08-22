import { Form } from '@uidu/form';
import React from 'react';
import { useDefaultForm } from '../../form/examples-utils';
import Checkbox from '../src/index';

type FieldValues = {
  parent: boolean;
  'child-1': boolean;
  'child-2': boolean;
};

const getCheckedChildrenCount = (checkedItems: FieldValues) => {
  const childItems = Object.keys(checkedItems).filter((i) => i !== 'parent');
  return childItems.reduce(
    (count, i) => (checkedItems[i] ? count + 1 : count),
    0,
  );
};

const getIsParentIndeterminate = (checkedItems: FieldValues) => {
  const checkedChildrenCount = getCheckedChildrenCount(checkedItems);
  return checkedChildrenCount > 0 && checkedChildrenCount < 2;
};

export default function IndeterminateExample() {
  const defaultForm = useDefaultForm<FieldValues>();
  const {
    form: { setValue, resetField, getValues },
  } = defaultForm;

  const onChange = (name: keyof FieldValues, value: boolean) => {
    if (name === 'parent') {
      setValue(name, value);
      setValue('child-1', value);
      setValue('child-2', value);
    } else {
      setValue(name, value);
      resetField('parent', {
        defaultValue: getCheckedChildrenCount(getValues()) > 0,
      });
    }
  };

  return (
    <Form {...defaultForm}>
      <p style={{ marginBottom: '8px' }}>
        An indeterminate checkbox can be used to show partially checked states.
        The parent checkbox below will be indeterminate until all its&#39;
        children are checked.
      </p>
      <Checkbox
        isIndeterminate={getIsParentIndeterminate(getValues())}
        onChange={onChange}
        layout="elementOnly"
        label="Parent Checkbox"
        id="parent"
        name="parent"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '24px',
        }}
      >
        <Checkbox
          onChange={onChange}
          layout="elementOnly"
          label="Child Checkbox 1"
          id="child-1"
          name="child-1"
        />
        <Checkbox
          onChange={onChange}
          layout="elementOnly"
          label="Child Checkbox 2"
          id="child-2"
          name="child-2"
        />
      </div>
    </Form>
  );
}
