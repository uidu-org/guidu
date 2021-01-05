import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { CustomItemComponentProps } from '../types';
import CustomItem from './custom-item';

const RouterLink = (props: CustomItemComponentProps) => <Link {...props} />;

export default function RouterItem({ ...rest }) {
  return <CustomItem component={RouterLink} {...rest} />;
}
