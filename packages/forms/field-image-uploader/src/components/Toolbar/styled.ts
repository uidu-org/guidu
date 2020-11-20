import styled from 'styled-components';

const StyledToolbar = styled.div<{ isHovered: boolean }>`
  position: absolute;
  top: 50%;
  width: 50%;
  display: flex;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  justify-content: space-between;
  background: #fff;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  transition: opacity 300ms ease-in;
`;

export default StyledToolbar;
