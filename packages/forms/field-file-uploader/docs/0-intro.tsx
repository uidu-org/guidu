import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field File Uploader
  <p class="lead">Upload files with uppy and formsy</p>

  Component originally tied to rails active-storage uploads, renders an uppy.io dashboard and lets users select files to upload.

  ${code`import FieldFileUploader from '@uidu/field-file-uploader';`}

  ${(
    <Example
      packageName="@uidu/field-file-uploader"
      Component={require('../examples/Basic').default}
      title="Basic exposed options select"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="FieldFileUploader Props"
      props={require('!!extract-react-types-loader!../src/components/FieldFileUploader')}
    />
  )}
`;
