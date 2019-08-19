import { Form } from '@uidu/form';
import * as React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { teams, users } from '../examples-utils';
import FieldMentions from '../src';

export default class Basic extends React.Component<{}> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  onChange = (name, value) => {
    this.setState({
      eventResult: `onChange called with value: ${value}`,
    });
  };

  onBlur = () => {
    this.setState({
      eventResult: 'onBlur called from FieldBase above',
    });
  };

  onFocus = () => {
    this.setState({
      eventResult: 'onFocus called from FieldBase above',
    });
  };

  render() {
    return (
      <Form {...formDefaultProps}>
        <FieldMentions
          {...inputDefaultProps}
          type="tel"
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          label="With change, blur & focus handlers"
          items={[
            {
              type: 'Member',
              trigger: '@',
              data: users,
              // style: {
              //   ...mentionDefaultStyles,
              // },
              // renderSuggestion: renderContactSuggestion
            },
            {
              type: 'Team',
              trigger: '#',
              data: teams,
            },
          ]}
        />
        <div
          className="mb-5"
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
          }}
        >
          {this.state.eventResult}
        </div>
        <FieldMentions
          {...inputDefaultProps}
          value={{ value: 'Default value [John Doe](Member:johndoe)' }}
          floatLabel="With default value"
          items={[
            {
              type: 'Member',
              trigger: '@',
              data: users,
              // style: {
              //   ...mentionDefaultStyles,
              // },
              // renderSuggestion: renderContactSuggestion
            },
          ]}
        />
        <FieldMentions
          {...inputDefaultProps}
          type="tel"
          items={[
            {
              type: 'Member',
              trigger: '@',
              data: users,
              // style: {
              //   ...mentionDefaultStyles,
              // },
              // renderSuggestion: renderContactSuggestion
            },
          ]}
        />
      </Form>
    );
  }
}
