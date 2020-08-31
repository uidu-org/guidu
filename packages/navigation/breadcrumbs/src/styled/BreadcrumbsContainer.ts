import { N300 } from '@uidu/theme/colors';
import { themed } from '@uidu/theme/components';
import styled from 'styled-components';

const ThemeColor = themed({ light: N300, dark: N300 });

const BreadcrumbsContainer = styled.div`
  color: ${ThemeColor};
  display: flex;
  flex-wrap: wrap;
`;

BreadcrumbsContainer.displayName = 'BreadcrumbsContainer';

export default BreadcrumbsContainer;
