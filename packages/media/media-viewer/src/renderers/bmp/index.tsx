import React from 'react';
import ImageProxyRenderer from '../image';

function BMPRenderer(props) {
  return <ImageProxyRenderer {...props} />;
}

BMPRenderer.fileTypes = ['bmp', 'image/bmp'];
BMPRenderer.weight = 0;

export default BMPRenderer;
