// @flow
import styled from 'styled-components';
import { themed, colors } from '@uidu/theme';
import { getWidth, paddingUnitless } from './constants';

const iconPadding = `${paddingUnitless / 2}px`;

const getPadding = ({ isChecked }) =>
  isChecked
    ? `
    padding-left: ${iconPadding};
    padding-right: 0;
  `
    : `
    padding-left: 0;
    padding-right: ${iconPadding};
  `;

// the Icon sizes are 16/24/32/48 so we have to force-scale the icons down to 20px this way
const iconSizing = ({ size }) =>
  size === 'large' ? `> span { height: 20px; width: 20px; }` : '';

const getIconColor = ({ isChecked }) =>
  isChecked
    ? themed({ light: 'inherit', dark: colors.DN30 })
    : themed({ light: 'inherit', dark: colors.DN600 });

export default styled.div`
  display: flex;
  max-width: ${props => getWidth(props) / 2}px;
  align-items: center;
  ${getPadding};
  color: ${getIconColor};
  ${iconSizing};
`;
