import { AccordionItemButton } from 'react-accessible-accordion';
import styled from 'styled-components';

export default styled(AccordionItemButton)<{ reverse: string }>`
  ${'' /* background-color: #f4f4f4; */}
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: ${({ reverse }) =>
    reverse ? 'flex-start' : 'space-between'};
  padding: 1rem;
  width: 100%;
  text-align: left;
  border: none;

  &:hover {
    background-color: #f4f4f4;
  }

  * {
    margin-bottom: 0;
  }
`;
