import * as exenv from 'exenv';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import MediaPicker from './MediaPicker';

export function PopupImpl({
  uploadParams, // tenant
  proxyReactContext,
}) {
  const container = document.body;
  // private container?: HTMLElement;
  // private tenantUploadParams;
  // private proxyReactContext?;
  // private useForgePlugins?: boolean;
  // private open: boolean;

  // constructor({
  //   container = exenv.canUseDOM ? document.body : undefined,
  //   uploadParams, // tenant
  //   proxyReactContext,
  //   singleSelect,
  //   plugins,
  //   useForgePlugins = false,
  // }) {
  //   // super();
  //   this.proxyReactContext = proxyReactContext;
  //   this.useForgePlugins = useForgePlugins;
  //   this.open = false;
  //   this.container = container;
  // }

  const show = async () => {
    const popup = renderPopup();
    document.body.append(popup);
  };

  const teardown = () => {
    if (!container) {
      return;
    }

    try {
      unmountComponentAtNode(container);
      container.remove();
    } catch (error) {}
  };

  const on = (name, fn) => {
    console.log(name, fn);
  };

  const hide = () => {
    const el = document.getElementById('uppy-uploader');
    document.body.removeChild(el);
  };

  const setUploadParams = () => {
    // this.tenantUploadParams = {
    //   ...uploadParams,
    // };
  };

  // public emitClosed(): void {
  //   this.emit('closed', undefined);
  // }

  const component = () => (
    <MediaPicker
      proxyReactContext={proxyReactContext}
      uploadParams={uploadParams}
      onComplete={console.log}
      open
    />
  );

  const renderPopup = () => {
    if (!exenv.canUseDOM) {
      return null;
    }
    const container = document.createElement('div');
    container.id = 'uppy-uploader';

    render(
      <MediaPicker
        proxyReactContext={proxyReactContext}
        uploadParams={uploadParams}
        onComplete={console.log}
        open
      />,
      container,
    );
    return container;
  };

  return { show, hide, component };
}
