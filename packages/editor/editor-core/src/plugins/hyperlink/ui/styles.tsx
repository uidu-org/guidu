import * as React from 'react';
import styled from 'styled-components';
import UiFloatingToolbar, {
  Props as UiFloatingToolbarProps,
} from '../../../ui/FloatingToolbar';
import UiSeparator from '../../../ui/Separator';
import UiToolbarButton, {
  Props as UiToolbarButtonProps,
} from '../../../ui/ToolbarButton';

// `line-height: 1` to fix extra 1px height from toolbar wrapper
export const FloatingToolbar = styled(
  UiFloatingToolbar
)<UiFloatingToolbarProps>`
  max-height: 350px;
  min-height: 32px;
  height: initial;
  & > div {
    line-height: 1;
  }
  & > div > button:last-child {
    margin-right: 0;
  }
  .normal& input {
    min-width: 244px;
    margin-right: 2px;
  }
  .recent-search& {
    padding: 8px 0 0;
    input {
      padding: 0 8px 8px;
    }
  }
`;

// `a&` because `Button` uses it and it produces a more specific selector `a.xyz`
export const ToolbarButton = (props: UiToolbarButtonProps) => (
  <UiToolbarButton
    {...props}
    theme={(currentTheme: any, themeProps: any) => {
      const { buttonStyles, ...rest } = currentTheme(themeProps);
      return {
        buttonStyles: {
          ...buttonStyles,
          padding: 0,
          width: '24px',
          margin: '0 2px',
          'a&': {
            width: '24px',
            margin: '0 2px',
          },
        },
        ...rest,
      };
    }}
  />
);

// Need fixed height because parent has height inherit and `height: 100%` doesn't work because of that
export const Separator = styled(UiSeparator)`
  margin: 2px 6px;
  height: 20px;
`;
