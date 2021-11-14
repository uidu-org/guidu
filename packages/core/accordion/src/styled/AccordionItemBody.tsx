import { AccordionItemPanel } from 'react-accessible-accordion';
import styled from 'styled-components';

export default styled(AccordionItemPanel)`
  padding: 1rem;
  display: block;
  animation: fadein 0.35s ease-in;

  &[hidden] {
    display: none;
    opacity: 0;
    animation: fadein 0.35s ease-in;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;
