import styled from 'styled-components';

export const StyledGlobalItemButton = styled.button`
  -webkit-appearance: none;
  color: rgb(222, 235, 255);
  background-color: transparent;
  fill: rgb(7, 71, 166);
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  line-height: 1;
  width: 40px;
  height: 40px;
  -webkit-box-pack: center;
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
    background-color: rgba(9, 30, 66, 0.42);
  }
`;

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0px;
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
