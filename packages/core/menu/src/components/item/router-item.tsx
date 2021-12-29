import React from 'react';
import { NavLink as Link, NavLinkProps } from 'react-router-dom';
import { CustomItemComponentProps } from '../types';
import CustomItem from './custom-item';

type RouterItemProps = CustomItemComponentProps & NavLinkProps;

const RouterLink = (props: RouterItemProps) => <Link {...props} />;

export default function RouterItem({ ...rest }: RouterItemProps) {
  return <CustomItem component={RouterLink} {...rest} />;
}
