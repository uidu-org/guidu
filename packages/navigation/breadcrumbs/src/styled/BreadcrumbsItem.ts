import { fontSize, fontSizeSmall, gridSize } from '@uidu/theme/constants';
import styled from 'styled-components';

const height = (gridSize() * 3) / fontSize();

const BreadcrumbsItemElement = styled.div`
  display: flex;
  flex-direction: row;
  height: ${height}em;
  line-height: ${height}em;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
  font-size: ${fontSizeSmall()}px;
`;

BreadcrumbsItemElement.displayName = 'BreadcrumbsItemElement';

export default BreadcrumbsItemElement;
