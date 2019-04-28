import styled from 'styled-components';

export const IconPlaceholderWrapper = styled.div`
  position: absolute;
  left: 0;
`;

export const Icon = styled(IconPlaceholderWrapper)`
  top: 0.5px;
  & > img {
    width: 16px;
    height: 16px;
  }
`;

export const AKIconWrapper = styled(IconPlaceholderWrapper)`
  top: 0.5px;
  transform: scale(1.4);
`;
