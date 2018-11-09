import React from 'react';
import { AkCustomDrawer } from '@atlaskit/navigation';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DefaultNav from './navigations/Default';
import { AtlaskitIcon } from './index';

var GroupDrawer = function GroupDrawer(_ref) {
  var closeDrawer = _ref.closeDrawer,
      isOpen = _ref.isOpen,
      pathname = _ref.pathname;
  return React.createElement(AkCustomDrawer, {
    backIcon: React.createElement(ArrowLeftIcon, {
      label: "go back"
    }),
    isOpen: isOpen,
    key: "groups",
    onBackButton: closeDrawer,
    primaryIcon: React.createElement(AtlaskitIcon, {
      monochrome: true
    })
  }, React.createElement(DefaultNav, {
    onClick: closeDrawer,
    pathname: pathname
  }));
};

export default GroupDrawer;