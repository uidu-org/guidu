/* tslint:disable:variable-name */
import styled from 'styled-components';
import { absolute, borderRadius, size } from '@uidu/media-ui';
import { colors, themed } from '@atlaskit/theme';
import { Root, cardShadow } from '../../styles';
import { getSelectedBorderStyle } from '../../styles/getSelectedBorderStyle';

export interface WrapperProps {
  disableOverlay?: boolean;
  selectable?: boolean;
  selected?: boolean;
  hasOnClick?: boolean;
  mediaType?: string;
}

const getShadowAttribute = (props: WrapperProps) => {
  const { disableOverlay } = props;
  return disableOverlay ? '' : cardShadow;
};

const getBackgroundColor = (props: WrapperProps) => {
  const { mediaType } = props;
  return `background: ${
    mediaType === 'image'
      ? 'transparent'
      : themed({ light: colors.N20, dark: colors.DN50 })(props)
  };`;
};

export const Wrapper = styled(Root)`
  ${getShadowAttribute}
  ${borderRadius}
  background: ${themed({ light: '#FFF', dark: colors.DN50 })};

  line-height: normal;
  position: relative;

  ${getSelectedBorderStyle}

  ${size()} .wrapper {
    ${borderRadius};
    ${getBackgroundColor};
    display: block;
    height: inherit;
    position: relative;

    .img-wrapper {
      position: relative;
      width: inherit;
      height: inherit;
      display: block;
      overflow: hidden;
      ${borderRadius}
    }
  }
`;

export const PlayIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  /* we want to override default icon size and hover state */
  &:hover > * {
    width: 64px;
    height: 64px;
  }

  > * {
    background: rgba(23, 43, 77, 0.7);
    width: 56px;
    height: 56px;
    border-radius: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
  }
`;

const bodyHeight = 26;

export const ProgressBarWrapper = styled.div`
  position: relative;
  height: inherit;
`;

export const Overlay = styled.div`
  ${absolute()} ${size()} border-radius: inherit;
  background-color: rgba(9, 30, 66, 0.5);
`;

export const Title = styled.div`
  ${absolute()} width: 100%;
  padding: 8px;
  color: ${colors.N0};
  font-size: 12px;
  line-height: 18px;
  word-wrap: break-word;
`;

export const Body = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  color: ${colors.N0};
`;

export const ProgressWrapper = styled.div`
  flex-grow: 1;

  /*
    force the height to always be 20px (the height of the cancel icon),
    so that the height of the progress bar doesn't jump when cards with
    and without a cancel icon are rendered side-by-side.
  */
  height: ${bodyHeight}px;

  /*
    vertically center the progress bar within the 20px, keeping the progress bar full width
  */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardActionsWrapper = styled.div`
  margin-left: 4px;
  /*
    button must appear above overlay
   */
  z-index: 2;
`;
