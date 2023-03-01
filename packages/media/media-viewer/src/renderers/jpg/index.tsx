import React from 'react';
import ImageProxyRenderer from '../image';
import { DocRendererProps } from '../types';

function JPGRenderer(props: DocRendererProps) {
  return <ImageProxyRenderer {...props} />;
}

JPGRenderer.fileTypes = ['jpg', 'jpeg', 'image/jpg', 'image/jpeg'];
JPGRenderer.weight = 0;

export default JPGRenderer;
