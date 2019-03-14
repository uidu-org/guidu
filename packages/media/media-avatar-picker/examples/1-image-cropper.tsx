/* tslint:disable:variable-name no-console */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import ImageCropper from '../src/image-cropper';
import { tallImage } from '@uidu/media-test-helpers';

const naturalWidth = 5360;

const onImageSize = (width: number, height: number) =>
  console.log('onImageSize', width, height);
const onRemoveImage = () => console.log('onRemoveImage');
const onImageError = (errorMessage: string) =>
  console.log('onImageError', errorMessage);

export default () => (
  <IntlProvider locale="en">
    <div>
      <div>
        <h1>default</h1>
        <ImageCropper
          imageSource={tallImage}
          imageWidth={naturalWidth}
          scale={0.08}
          top={-80}
          left={-80}
          onDragStarted={() => console.log('DragStarted')}
          onImageSize={onImageSize}
          onRemoveImage={onRemoveImage}
          onImageError={onImageError}
        />
      </div>
      <div>
        <h1>when image width is not set</h1>
        <ImageCropper
          imageSource={tallImage}
          scale={0.14}
          top={-50}
          left={-115}
          onImageSize={onImageSize}
          onRemoveImage={onRemoveImage}
          onImageError={onImageError}
        />
      </div>
      <div>
        <h1>with custom container size</h1>
        <ImageCropper
          imageSource={tallImage}
          imageWidth={naturalWidth}
          scale={0.14}
          top={-50}
          left={-115}
          containerSize={400}
          onImageSize={onImageSize}
          onRemoveImage={onRemoveImage}
          onImageError={onImageError}
        />
      </div>
      <div>
        <h1>with circular mask</h1>
        <ImageCropper
          imageSource={tallImage}
          imageWidth={naturalWidth}
          scale={0.08}
          top={-70}
          left={-90}
          isCircularMask={true}
          onImageSize={onImageSize}
          onRemoveImage={onRemoveImage}
          onImageError={onImageError}
        />
      </div>
    </div>
  </IntlProvider>
);
