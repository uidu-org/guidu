import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { s3UploadOptions } from '../../../media/media-core/src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldImageUploader from '../src';

export default class Basic extends Component<any, any> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  onChange = (name, value) => {
    console.log(name, value);
    this.setState({
      eventResult: `onChange called with value`,
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
        <FieldImageUploader
          {...inputDefaultProps}
          ratio="16by9"
          onChange={this.onChange}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          label="Test"
          help="Drag 'n' drop some files here, or click to select files"
          uploadOptions={s3UploadOptions({
            url: 'https://uidu.dev',
            type: 'image',
          })}
        />

        <div
          className="mb-4"
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

        <FieldImageUploader
          {...inputDefaultProps}
          uploadOptions={s3UploadOptions({
            url: 'https://uidu.dev',
            type: 'image',
          })}
          ratio="16by9"
          value="https://images.unsplash.com/photo-1496016943515-7d33598c11e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
          defaultImageUrl="https://images.unsplash.com/photo-1496016943515-7d33598c11e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
          onChange={this.onChange}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          label="Test"
          help="Drag 'n' drop some files here, or click to select files"
          required
        />
      </Form>
    );
  }
}
