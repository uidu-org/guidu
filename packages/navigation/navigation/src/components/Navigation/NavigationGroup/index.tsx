import AnimatedMenu from '@uidu/animated-menu';
import { ButtonItem, MenuGroup } from '@uidu/menu';
import React from 'react';
import ItemsRenderer from '../../ItemsRenderer';
import NavigationItem from '../NavigationItem';

function DefaultDropdown(props) {
  if (!props.items || props.items.length === 0) {
    return null;
  }
  return (
    <div style={{ width: '300px' }}>
      <MenuGroup>
        {(props.items || []).map((c) => (
          <ButtonItem key={c.text}>{c.text}</ButtonItem>
        ))}
      </MenuGroup>
    </div>
  );
}

export default function NavigationGroup({ items, animated, ...props }) {
  if (items.length === 0) {
    return null;
  }

  if (animated) {
    const navbarConfig = items.map(({ dropdown: Dropdown, ...rest }) => ({
      ...rest,
      component: NavigationItem,
      dropdown: Dropdown || DefaultDropdown || undefined,
    }));

    return (
      <AnimatedMenu
        className="d-flex"
        navbarConfig={navbarConfig}
        duration={300}
      />
    );
  }
  return (
    <>
      <ItemsRenderer items={items} {...props} />
    </>
  );
}
