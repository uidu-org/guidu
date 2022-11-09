import Icon from '@atlaskit/icon';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { CustomItem, CustomItemComponentProps } from '../src';
import Slack from './icons/slack';

const StyledCustomComponent = styled.a<{ isDisabled: boolean }>`
  ${tw`relative overflow-hidden [user-select:none]`}
  ${({ isDisabled }) => {
    if (isDisabled) {
      return tw``;
    }
    return tw`before:(content absolute inset-y-0 left-0 w-1 bg-primary -translate-x-px) hover:before:translate-x-0`;
  }})}
`;

const CustomComponent: React.FC<
  CustomItemComponentProps & {
    href: string;
  }
> = ({ children, href, ...props }) => {
  return (
    <StyledCustomComponent href={href} {...props}>
      {children}
    </StyledCustomComponent>
  );
};

export default () => (
  <div onClick={(e) => e.preventDefault()}>
    <CustomItem href="/navigation-system" component={CustomComponent}>
      Navigation System
    </CustomItem>
    <CustomItem
      href="/navigation-system-1"
      isSelected
      component={CustomComponent}
    >
      Navigation System
    </CustomItem>
    <CustomItem
      href="/navigation-system-2"
      isDisabled
      component={CustomComponent}
    >
      Navigation System
    </CustomItem>
    <CustomItem
      href="/navigation-system-3"
      component={CustomComponent}
      iconBefore={<Icon glyph={Slack} label="" />}
    >
      Navigation System
    </CustomItem>
    <CustomItem
      href="/navigation-system-4"
      component={CustomComponent}
      iconBefore={<Icon glyph={Slack} label="" />}
      description="Next-gen software project"
    >
      Navigation System
    </CustomItem>
  </div>
);
