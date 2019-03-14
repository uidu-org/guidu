import styled from 'styled-components';

export const Wrapper: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  display: flex;
`;

export const ImagePreview: React.ComponentClass<
  React.ImgHTMLAttributes<{}>
> = styled.img`
  width: 300px;
`;

export const PreviewWrapper: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  flex: 1;
`;

export const MetadataWrapper: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.pre`
  width: 400px;
  overflow: scroll;
  flex: 1;
`;

export const FileInput: any = styled.input`
  color: transparent;
`;
