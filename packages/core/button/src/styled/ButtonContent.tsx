import * as React from 'react';
import { gridSize, math } from '@atlaskit/theme';
import { getLoadingStyle } from './utils';

const getAlignment = (p: Props) => (p.followsIcon ? 'baseline' : 'center');
const gridSizeDiv2 = math.divide(gridSize, 2);
const getMargin = (p: Props) =>
  p.spacing === 'none' ? 0 : `0 ${gridSizeDiv2(p)}px`;

type Props = {
  followsIcon: boolean;
  spacing: string;
  isLoading?: boolean;
};

const ButtonContent: React.StatelessComponent<Props> = props => {
  const style: React.CSSProperties = {
    alignItems: getAlignment(props),
    alignSelf: getAlignment(props),
    flex: '1 1 auto',
    margin: getMargin(props),
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...getLoadingStyle(props),
  };
  return <span style={style}>{props.children}</span>;
};

export default ButtonContent;
