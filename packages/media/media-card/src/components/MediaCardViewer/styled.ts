import styled from 'styled-components';

export const Overlay = styled.div<{ kind: string }>`
  background-color: #fff;
  border-radius: 0.1rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0; /* ${({ kind }) => (kind === 'image' ? 0 : '25%')}; */
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  transition: opacity 100ms ease-in;
  will-change: opacity;
`;

export const OverlayFilename = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  font-size: 80%;

  img {
    width: 100%;
  }
`;

export default styled.div`
  width: 100%;
  /* height: 100%; */
  /* padding-top: 75%; */

  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;
