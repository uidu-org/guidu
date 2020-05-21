import { Form } from '@uidu/form';
import React, { Component } from 'react';
import FieldImageUploader from '..';
import { localUploadOptions } from '../../../media/media-core/src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';

export default class Avatar extends Component<any, any> {
  render() {
    return (
      <Form {...formDefaultProps}>
        <div style={{ width: 140, height: 140, borderRadius: 140 }}>
          <FieldImageUploader
            {...inputDefaultProps}
            ratio="1by1"
            borderRadius={140}
            toolbar={() => null}
            onChange={console.log}
            // onBlur={this.onBlur}
            // onFocus={this.onFocus}
            label={null}
            uploadOptions={localUploadOptions({
              url: 'https://uidufundraising.uidu.local:8443/upload',
            })}
          />
        </div>
      </Form>
    );
  }
}
