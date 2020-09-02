import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import Checkbox, { CheckboxGroup } from '../src';
import { formDefaultProps } from '../../form/examples-utils';

export default class CheckboxGroupExample extends PureComponent<void> {
  render() {
    return (
      <div>
        <Form {...formDefaultProps}>
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
                { name: 'Same Name - One', id: 'Same Name - One' },
                { name: 'Same Name - Two', id: 'Same Name - Two' },
                { name: 'Same Name - Three', id: 'Same Name - Three' },
              ]}
            />
          </span>
        </Form>
      </div>
    );
  }
}
