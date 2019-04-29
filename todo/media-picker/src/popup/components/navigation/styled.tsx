import styled from 'styled-components';
import Button from '@uidu/button';
import { colors } from '@uidu/theme';

export const FolderViewerNavigation = styled.div`
  display: flex;
  justify-content: space-between;

  /* Ensure header has height */
  min-height: 60px;
  padding: 15px 13px;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: ${colors.N0};
`;
FolderViewerNavigation.displayName = 'FolderViewerNavigation';

export const ControlsWrapper = styled.div``;

export const Controls = styled.div`
  height: 30px;
  display: flex;
`;

export const ControlButton = styled(Button)`
  margin-right: 5px;
`;

export const BreadCrumbs = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface BreadCrumbLinkLabelProps {
  isLast: boolean;
}

export const BreadCrumbLinkLabel = styled.span<BreadCrumbLinkLabelProps>`
  &:hover {
    text-decoration: ${(props: BreadCrumbLinkLabelProps) =>
      props.isLast ? 'none' : 'underline'};
  }
`;

export const BreadCrumbLinkSeparator = styled.span<BreadCrumbLinkLabelProps>`
  color: ${colors.N500};
  display: ${(props: BreadCrumbLinkLabelProps) =>
    props.isLast ? 'none' : 'inline'};
  margin: 0 4px;
  text-decoration: none;
`;

export const BreadCrumbLink = styled.span<BreadCrumbLinkLabelProps>`
  color: ${(props: BreadCrumbLinkLabelProps) =>
    props.isLast ? colors.N900 : colors.N500};
  cursor: ${(props: BreadCrumbLinkLabelProps) =>
    props.isLast ? 'default' : 'pointer'};
  font-size: ${(props: BreadCrumbLinkLabelProps) =>
    props.isLast ? '20px' : '14px'};
`;

export const AccountItemButton = styled(Button)``;

// Dropdown is NOT intentionally extended by this component to allow HACK style below to work
export const AccountDropdownWrapper = styled.div`
  /* TODO: remove this when the ak-dropdown-menu package supports custom item types */
  span[role='presentation'] > span > span:first-child {
    display: none;
  }
`;
