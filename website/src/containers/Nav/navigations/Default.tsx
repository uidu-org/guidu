import React from 'react';
import { Book, GitHub, Package } from 'react-feather';
import { NavLink as Link } from 'react-router-dom';

export default [
  {
    to: '/docs',
    text: 'Getting started',
    as: Link,
    type: 'NavigationItem',
    before: <Book size={20} />,
  },
  {
    to: '/packages',
    text: 'Packages',
    exact: true,
    as: Link,
    type: 'NavigationItem',
    before: <Package size={20} />,
  },
  {
    href: 'https://bitbucket.org/atlassian/atlaskit-mk-2',
    text: 'Repository',
    type: 'NavigationItem',
    before: <GitHub size={20} />,
    external: true,
  },
];
