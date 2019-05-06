import styled from 'styled-components';
import { StyledNavigationItem, StyledNavigationLink } from '../NavigationItem/styled';

export const StyledNavigationIconItem = styled(StyledNavigationItem)``;

export const StyledNavigationIconItemIcon = styled.div`
align-items: center;
  display: flex;
  margin-bottom: 0.5rem;

  svg {
    width: 20px;
    height: 20px;
  }
  `;

export const StyledNavigationIconLink = styled(StyledNavigationLink)`
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
`;

export const StyledNavigationText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 65%;
  text-transform: uppercase;
  text-align: center;
      padding: 0 0.2rem;
`;
