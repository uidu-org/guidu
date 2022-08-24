import { Form } from '@uidu/form';
import React from 'react';
import { useDefaultForm } from '../../form/examples-utils';
import Checkbox, { CheckboxGroup } from '../src';

export default function CheckboxGroupExample() {
  const defaultForm = useDefaultForm();
  return (
    <div>
      <Form {...defaultForm}>
        <span>
          <Checkbox label="One" name="one" />
          <Checkbox label="Two" name="two" value={true} />
          <Checkbox label="Three" name="three" />
        </span>

        <p>
          When checkboxes have the same name their values are grouped when
          submitted.
        </p>

        <span>
          <CheckboxGroup
            name="same-name"
            options={[
              { name: 'Same Name - One', id: 'first' },
              { name: 'Same Name - Two', id: 'second' },
              { name: 'Same Name - Three', id: 'third' },
            ]}
          />
        </span>
      </Form>
    </div>
  );
}
