import styled, { css } from 'styled-components';

export const StyledMainButton = styled.button`
  height: 48px;
  width: 48px;
  z-index: 9999;
  background-color: #666666;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  outline: none;
  padding: 0;
  -webkit-user-drag: none;
  font-weight: bold;
  color: #f1f1f1;
  font-size: 18px;

  > * {
    transition: ease-in-out transform 0.2s;
  }
`;

export const StyledActionWrapper = styled.li`
  display: block;
  position: absolute;
  top: 0;
  right: 1px;
  padding: 10px 0;
  margin: -10px 0;
  transition: ease-in-out transform 0.2s;

  > span {
    // opacity: 0;
    transition: ease-in-out opacity 0.2s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 8px;
    background: rgba(0, 0, 0, 0.75);
    padding: 4px 8px;
    border-radius: 3px;
    color: white;
    font-size: 13px;
    /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28); */

    &.right {
      right: 100%;
    }
  }

  &:nth-child(1) {
    transform: translateY(-60px) scale(0);
    transition-delay: 0.21s;

    &.top {
      transform: translateY(60px) scale(0);
    }
  }

  &:nth-child(2) {
    transform: translateY(-120px) scale(0);
    transition-delay: 0.18s;

    &.top {
      transform: translateY(120px) scale(0);
    }
  }

  &:nth-child(3) {
    transform: translateY(-180px) scale(0);
    transition-delay: 0.15s;

    &.top {
      transform: translateY(180px) scale(0);
    }
  }

  &:nth-child(4) {
    transform: translateY(-240px) scale(0);
    transition-delay: 0.12s;

    &.top {
      transform: translateY(240px) scale(0);
    }
  }

  &:nth-child(5) {
    transform: translateY(-300px) scale(0);
    transition-delay: 0.09s;

    &.top {
      transform: translateY(300px) scale(0);
    }
  }

  &:nth-child(6) {
    transform: translateY(-360px) scale(0);
    transition-delay: 0.03s;

    &.top {
      transform: translateY(360px) scale(0);
    }
  }
`;

export const StyledActions = styled.li`
  padding: 25px;
  margin: -25px;

  *:last-child {
    margin-bottom: 0;
  }
`;

export const StyledAction = styled.button`
  height: 40px;
  width: 40px;
  background-color: #aaaaaa;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  outline: none;
  padding: 0;
  -webkit-user-drag: none;
  font-weight: bold;
  color: #f1f1f1;
  margin-right: 2px;
  font-size: 1rem;
  z-index: 10000;
`;

export const StyledFab = styled.ul<{ isOpen: boolean }>`
  box-sizing: border-box;
  margin: 25px;
  position: fixed;
  white-space: nowrap;
  z-index: 9998;
  padding-left: 0;
  list-style: none;
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        ${StyledMainButton} {
          > * {
            transform-origin: center center;
            transform: rotate(135deg);
            transition: ease-in-out transform 0.2s;
          }

          > ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        }

        ${StyledActionWrapper} {
          &:hover {
            /* > span {
              transition: ease-in-out opacity 0.2s;
              opacity: 0.9;
            } */
          }

          &:nth-child(1) {
            transform: translateY(-60px) scale(1);
            transition-delay: 0.03s;

            &.top {
              transform: translateY(60px) scale(1);
            }
          }

          &:nth-child(2) {
            transform: translateY(-120px) scale(1);
            transition-delay: 0.09s;

            &.top {
              transform: translateY(120px) scale(1);
            }
          }

          &:nth-child(3) {
            transform: translateY(-180px) scale(1);
            transition-delay: 0.12s;

            &.top {
              transform: translateY(180px) scale(1);
            }
          }

          &:nth-child(4) {
            transform: translateY(-240px) scale(1);
            transition-delay: 0.15s;

            &.top {
              transform: translateY(240px) scale(1);
            }
          }

          &:nth-child(5) {
            transform: translateY(-300px) scale(1);
            transition-delay: 0.18s;

            &.top {
              transform: translateY(300px) scale(1);
            }
          }

          &:nth-child(6) {
            transform: translateY(-360px) scale(1);
            transition-delay: 0.21s;

            &.top {
              transform: translateY(360px) scale(1);
            }
          }
        }
      `;
    }
    return null;
  }}
`;
