import { gridSize } from '@atlaskit/theme';
import styled from 'styled-components';

export const ColorPaletteWrapper = styled.div`
  padding: 0 ${gridSize()}px;
  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */
  display: flex;
  flex-wrap: wrap;
`;
