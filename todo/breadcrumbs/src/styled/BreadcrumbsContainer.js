// @flow
import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';

const ThemeColor = themed({ light: colors.N300, dark: colors.N300 });

const BreadcrumbsContainer = styled.div`
  color: ${ThemeColor};
  display: flex;
  flex-wrap: wrap;
`;

BreadcrumbsContainer.displayName = 'BreadcrumbsContainer';

export default BreadcrumbsContainer;
