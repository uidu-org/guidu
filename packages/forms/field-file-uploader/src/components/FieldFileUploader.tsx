import { ComponentHOC, Wrapper } from '@uidu/field-base';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import React, { PureComponent } from 'react';
import { FieldFileUploaderProps } from '../types';

class FieldFileUploader extends PureComponent<FieldFileUploaderProps> {
  static defaultProps = {
    options: {
      debug: true,
      allowMultipleUploads: true,
      restrictions: {
        maxNumberOfFiles: null,
        minNumberOfFiles: null,
        maxFileSize: null,
        allowedFileTypes: null,
      },
      autoProceed: true,
    },
  };

  private uppy;

  constructor(props) {
    super(props);

    this.uppy = Uppy(props.options);

    this.uppy.use(XHRUpload, {
      formData: true,
      endpoint:
        'https://uidufundraising.uidu.local:8443/rails/active_storage/direct_uploads',
      withCredentials: true,
    });

    this.uppy.on('complete', result => {
      this.onChange(
        result.successful.map(file => ({
          signed_id: file.response.body.signed_id,
          filename: file.response.body.filename,
        })),
      );
    });
  }

  onChange = results => {
    const { onSetValue, onChange, name } = this.props;
    onSetValue(results);
    onChange(name, results);
  };

  render() {
    const { options, ...otherProps } = this.props;
    return (
      <Wrapper {...this.props}>
        <Dashboard
          uppy={this.uppy}
          height={350}
          locale={{
            strings: {
              // Text to show on the droppable area.
              // `%{browse}` is replaced with a link that opens the system file selection dialog.
              dropPaste: 'Drop here or %{browse}',
              // Used as the label for the link that opens the system file selection dialog.
              browse: 'browse',
            },
          }}
          {...otherProps}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldFileUploader);
