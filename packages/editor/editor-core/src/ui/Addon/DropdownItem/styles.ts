import { colors } from '@uidu/theme';
import styled from 'styled-components';

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 32px 8px 12px;
  color: ${colors.N800};
  > span {
    display: flex;
    margin-right: 8px;
  }
  &:hover {
    background-color: ${colors.N20};
  }
`;
