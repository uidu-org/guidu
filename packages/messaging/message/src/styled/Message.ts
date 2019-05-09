import styled from 'styled-components';

export const StyledMessageEmoji = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  span {
    vertical-align: text-bottom;
  }
`;

export default styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  zoom: 1;
  max-width: 85%;

  @media (max-width: 700px) {
    max-width: 85%;
    background: #f1f0f0;
    color: black;
    padding: 6px 12px;
    border-radius: 1.3em;
    width: fit-content;
  }

  &:hover {
    &::after {
      background: #f8f9fa;
      bottom: -5px;
      border-radius: 4px;
      content: '';
      left: -5px;
      position: absolute;
      right: -5px;
      top: -3px;
      z-index: -1;
    }
  }
`;
