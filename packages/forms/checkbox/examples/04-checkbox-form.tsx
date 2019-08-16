import Button from '@uidu/button';
import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';
import Checkbox, { CheckboxGroup } from '..';

const formTestUrl = '//httpbin.org/get';

export default class CheckboxGroupExample extends PureComponent<void> {
  render() {
    return (
      <div>
        <Form
          action={formTestUrl}
          // method="get"
          // style={{ backgroundColor: 'white' }}
          // target="submitFrame"
        >
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
          <p>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </p>
        </Form>
        <p>The data submitted by the form will appear below:</p>
        <iframe
          src=""
          title="Checkbox Resopnse Frame"
          id="submitFrame"
          name="submitFrame"
          style={{
            width: '95%',
            height: '300px',
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        />
      </div>
    );
  }
}
