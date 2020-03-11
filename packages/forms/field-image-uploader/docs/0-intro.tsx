import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field Image Uploader
  <p class="lead">Upload and crop a single image (cover or avatar)</p>

  ${code`import FieldImageUploader from '@uidu/field-image-uploader';`}

  ${(
    <Example
      packageName="@uidu/field-image-uploader"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-image-uploader"
      Component={require('../examples/Avatar').default}
      title="Avatar"
      source={require('!!raw-loader!../examples/Avatar').default}
    />
  )}

  ${(
    <Props
      heading="FieldImageUploader Props"
      props={require('!!extract-react-types-loader!../src/components/FieldImageUploader')}
    />
  )}
  `;
