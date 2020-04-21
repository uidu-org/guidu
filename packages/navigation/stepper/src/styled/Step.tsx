import { colors } from '@uidu/theme';
import styled from 'styled-components';

export const StyledStepNumber = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: ${colors.N30};
  border-radius: 4rem;
  color: ${colors.N0};
  font-weight: bold;
  height: 2rem;
  text-align: center;
  width: 2rem;
  transition: background-color 300ms linear;
`;

export const StyledStepHeader = styled.div`
  background-color: var(--body-bg);
  cursor: pointer;
  outline: none;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: none;
  }
`;

export const StyledStepBody = styled.div`
  font-size: 0;
  background-color: var(--body-bg);
  margin: 0;
  opacity: 0;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  position: relative;
  transition: font-size 0.25s, padding 0.25s, opacity 0.5s 0.25s;
`;

export default styled.div`
  position: relative;
  opacity: 0.4;

  &.disabled {
    pointer-events: none;

    .step-button {
      .step-number {
        background-color: ${colors.N30};
        transition: background-color 300ms linear;
      }

      .step-title {
        opacity: 0.3;
      }
    }
  }

  &.active {
    opacity: 1;
    .step-body {
      font-size: 1rem;
      opacity: 1;
      padding-bottom: 2rem;
      transition: font-size 0.25s, padding 0.25s, opacity 0.5s 0.25s;
    }
  }

  &::after {
    background-color: ${colors.N30};
    content: '';
    height: 100%;
    left: calc(2rem - 1px);
    position: absolute;
    top: 0px;
    width: 1px;
    z-index: -1;
  }
`;
