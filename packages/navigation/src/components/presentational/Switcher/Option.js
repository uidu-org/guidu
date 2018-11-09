// @flow

import React, {
  PureComponent,
  type ComponentType,
  type Node,
  type Ref,
} from 'react';
import { colors, fontSize, gridSize as gridSizeFn } from '@atlaskit/theme';
import Avatar from '@atlaskit/avatar';
import { components } from '@atlaskit/select';

const gridSize = gridSizeFn();

const ContentWrapper = (props: *) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflowX: 'hidden',
    }}
    {...props}
  />
);
const TextWrapper = (props: *) => (
  <div
    css={{
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 16 / fontSize(),
    }}
    {...props}
  />
);
const SubTextWrapper = (props: *) => (
  <div
    css={{
      color: colors.N200,
      flex: '1 1 auto',
      fontSize: 12,
      lineHeight: 14 / 12,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
    {...props}
  />
);
const ElementWrapper = ({ is, ...props }: { is: 'before' | 'after' }) => {
  const direction = { before: 'marginRight', after: 'marginLeft' };
  const margin = direction[is];

  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexShrink: 0,
        [margin]: gridSize,
      }}
      {...props}
    />
  );
};

type PresentationProps = {
  isFocused: boolean,
  isSelected: boolean,
};
type DataType = {
  avatar?: string, // URL for the Avatar component
  component?: ComponentType<PresentationProps>,
  href?: string,
  subText?: string,
  target?: string, // NOTE: target will only be used if href is also set
  text: Node,
  to?: string, // href equivalent for ReactRouter.Link
};
type InnerProps = {
  'aria-selected': boolean,
  id: string,
  onClick: (*) => void,
  onMouseMove: (*) => void,
  onMouseOver: (*) => void,
  role: string,
  tabIndex: number,
};
type ItemProps = {
  innerRef: Ref<*>,
  data: DataType,
  innerProps: InnerProps,
  isFocused: boolean,
  isSelected: boolean,
  onClick?: (SyntheticEvent<MouseEvent>) => void,
  getStyles: Function,
  theme: Object,
  cx: Function,
};

export default class Option extends PureComponent<ItemProps> {
  render() {
    const {
      innerProps,
      innerRef,
      data: { avatar, subText, text },
    } = this.props;
    return (
      <div ref={innerRef} {...innerProps}>
        <components.Option {...this.props}>
          {!!avatar && (
            <ElementWrapper is="before">
              <Avatar
                borderColor="transparent"
                src={avatar}
                appearance="square"
              />
            </ElementWrapper>
          )}
          <ContentWrapper>
            <TextWrapper>{text}</TextWrapper>
            {!!subText && <SubTextWrapper>{subText}</SubTextWrapper>}
          </ContentWrapper>
        </components.Option>
      </div>
    );
  }
}
