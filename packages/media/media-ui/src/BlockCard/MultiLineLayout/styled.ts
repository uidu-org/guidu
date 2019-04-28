import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 3px 8px;
  > * + * {
    margin-left: 8px;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  > * {
    /* hack to vertically center the spinner which is display: inline-block; */
    display: inline-flex;
  }
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  overflow: hidden;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;
