import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Button from '@uidu/button';
import {
  akEditorSwoopCubicBezier,
  ExpandLayoutWrapper,
  expandMessages,
} from '@uidu/editor-common';
import { colors } from '@uidu/theme';
import Tooltip from '@uidu/tooltip';
import React, { useCallback } from 'react';
import { IntlShape } from 'react-intl';
import { expandClassNames } from './class-names';

interface ExpandIconButtonProps {
  allowInteractiveExpand: boolean;
  expanded: boolean;
  intl?: IntlShape;
}

interface ExpandIconButtonWithLabelProps extends ExpandIconButtonProps {
  label: string;
}

const withTooltip = (WrapperComponent: React.ElementType) => {
  return class WithSortableColumn extends React.Component<
    ExpandIconButtonWithLabelProps
  > {
    constructor(props: ExpandIconButtonWithLabelProps) {
      super(props);
    }

    render() {
      const { label } = this.props;

      return (
        <Tooltip content={label} position="top" tag={ExpandLayoutWrapper}>
          <WrapperComponent {...this.props} />
        </Tooltip>
      );
    }
  };
};

const CustomButton = (props: ExpandIconButtonWithLabelProps) => {
  const { label, allowInteractiveExpand } = props;
  const useTheme = useCallback(
    (currentTheme: any, themeProps: any) => {
      const { buttonStyles, ...rest } = currentTheme(themeProps);
      return {
        buttonStyles: {
          ...buttonStyles,
          height: '100%',
          '& svg': {
            transform: props.expanded
              ? 'transform: rotate(90deg);'
              : 'tranform: rotate(0deg);',
            transition: `transform 0.2s ${akEditorSwoopCubicBezier};`,
          },
        },
        ...rest,
      };
    },
    [props],
  );

  return (
    <Button
      appearance="subtle"
      className={expandClassNames.iconContainer}
      iconBefore={<ChevronRightIcon label={label} primaryColor={colors.N80A} />}
      shouldFitContainer
      theme={useTheme}
      isDisabled={!allowInteractiveExpand}
    ></Button>
  );
};

const ButtonWithTooltip = withTooltip(CustomButton);
const ButtonWithoutTooltip = CustomButton;

export const ExpandIconButton = (props: ExpandIconButtonProps) => {
  const { expanded, intl } = props;
  const message = expanded
    ? expandMessages.collapseNode
    : expandMessages.expandNode;
  const label = (intl && intl.formatMessage(message)) || message.defaultMessage;

  if (props.allowInteractiveExpand) {
    return <ButtonWithTooltip label={label} {...props} />;
  }

  return (
    <ExpandLayoutWrapper>
      <ButtonWithoutTooltip label={label} {...props} />
    </ExpandLayoutWrapper>
  );
};
