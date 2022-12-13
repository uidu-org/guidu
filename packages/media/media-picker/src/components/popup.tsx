import * as exenv from 'exenv';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MediaPickerProps } from '../types';
import MediaPicker from './MediaPicker';

export function PopupImpl({
  uploadOptions,
  onComplete,
  ...rest
}: MediaPickerProps) {
  const renderPopup = () => {
    if (!exenv.canUseDOM) {
      return null;
    }
    const uppyContainer = document.createElement('div');
    uppyContainer.id = 'uppy-uploader';

    const root = createRoot(uppyContainer);

    root.render(
      <MediaPicker
        uploadOptions={uploadOptions}
        onComplete={onComplete}
        open
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />,
    );
    return uppyContainer;
  };

  const show = async () => {
    const popup = renderPopup();
    document.body.append(popup);
  };

  const hide = () => {
    const el = document.getElementById('uppy-uploader');
    document.body.removeChild(el);
  };

  return { show, hide };
}

export default PopupImpl;
