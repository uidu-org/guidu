import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import Checkbox, { CheckboxGroup } from '..';
import { formDefaultProps } from '../../form/examples-utils';

export default class CheckboxGroupExample extends PureComponent<void> {
  render() {
    return (
      <div>
        <Form {...formDefaultProps}>
          <span>
            <Checkbox label="One" value="One" name="one" />
            <Checkbox label="Two" value="two" name="two" />
            <Checkbox label="Three" value="Three" name="three" />
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
