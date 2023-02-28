import { FileIdentifier } from '@uidu/media-core';
import React from 'react';
import styled from 'styled-components';

function ImageProxyRenderer({ file }: { file: FileIdentifier }) {
  if (!file) return null;

  return (
    <Container id="image-renderer">
      {file.url && <Img id="image-img" src={file.url} />}
    </Container>
  );
}

export default ImageProxyRenderer;

ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Img = styled.img`
  max-width: 95%;
  max-height: 95%;
`;
