import styled from 'styled-components';

export const FakeGlobalItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  height: 40px;

  & * {
    &:hover {
      background-color: transparent;
    }
  }
`;

export const FakeItemWrapper = styled.div<any>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  position: relative;
  color: #f8f9fa;

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
    color: #f8f9fa;

    &:after {
      content: '';
      background: rgba(9, 30, 66, 0.42);
      /* width: 100%; */
      position: absolute;
      height: 100%;
      left: 8px;
      right: 8px;
      border-radius: 0.25rem;
      z-index: -1;
    }
  }
`;
