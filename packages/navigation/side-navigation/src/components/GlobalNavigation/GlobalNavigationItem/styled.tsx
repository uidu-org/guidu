import styled from 'styled-components';

export const StyledGlobalItemButton = styled.button<{ activeColor?: string }>`
  -webkit-appearance: none;
  color: currentColor;
  background-color: transparent;
  fill: currentColor;
  align-items: center;
  cursor: pointer;
  display: flex;
  line-height: 1;
  width: 36px;
  height: 36px;
  justify-content: center;
  margin-top: 0px;
  text-align: center;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 50%;
  padding: 0px;
  outline: none;

  &:hover,
  &:focus,
  &.active {
    outline: none;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0px auto;
  background: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 50%;
  position: relative;
  padding: 0px;
  outline: none;
`;
