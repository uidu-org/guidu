import React from 'react';
import { Link } from '../../components/WrappedLink';
import { toClass } from 'recompose';
import { AkSearchDrawer, AkNavigationItem, AkNavigationItemGroup } from '@atlaskit/navigation';
import { AkSearch } from '@atlaskit/quick-search';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { AtlaskitIcon } from './index';
var LinkComponent = toClass(function (_ref) {
  var href = _ref.href,
      children = _ref.children,
      onClick = _ref.onClick,
      className = _ref.className;
  return React.createElement(Link, {
    className: className,
    onClick: onClick,
    to: href
  }, children);
});

var NavItem = function NavItem(_ref2) {
  var dirId = _ref2.dirId,
      id = _ref2.id,
      closeDrawer = _ref2.closeDrawer;
  return React.createElement(AkNavigationItem, {
    onClick: closeDrawer,
    href: "/packages/".concat(dirId, "/").concat(id),
    linkComponent: LinkComponent,
    text: id
  });
};

var SearchDrawer = function SearchDrawer(_ref3) {
  var isOpen = _ref3.isOpen,
      closeDrawer = _ref3.closeDrawer,
      searchDrawerValue = _ref3.searchDrawerValue,
      updateSearchValue = _ref3.updateSearchValue,
      packages = _ref3.packages;
  return React.createElement(AkSearchDrawer, {
    backIcon: React.createElement(ArrowLeftIcon, {
      label: "go back"
    }),
    isOpen: isOpen,
    key: "search",
    onBackButton: closeDrawer,
    primaryIcon: React.createElement(AtlaskitIcon, {
      monochrome: true
    })
  }, React.createElement(AkSearch, {
    value: searchDrawerValue,
    onInput: updateSearchValue,
    onKeyDown: function onKeyDown() {}
  }, fs.getDirectories(packages.children).reduce(function (acc, dir) {
    var initialItems = fs.getDirectories(dir.children);
    var sanitizedValue = searchDrawerValue.toLowerCase();

    if (sanitizedValue.length > 0 && new RegExp("^".concat(sanitizedValue)).test(dir.id)) {
      return acc.concat(React.createElement(AkNavigationItemGroup, {
        title: dir.id,
        key: dir.id
      }, initialItems.map(function (_ref4) {
        var id = _ref4.id;
        return React.createElement(NavItem, {
          dirId: dir.id,
          id: id,
          key: id,
          closeDrawer: closeDrawer
        });
      })));
    }

    var Items = initialItems.reduce(function (innerAccumulator, _ref5) {
      var id = _ref5.id;
      // Remove the `-` from name because that is how they are displayed in search
      var pageName = id.replace(/-/g, ' ');

      if (pageName.includes(sanitizedValue)) {
        return innerAccumulator.concat(React.createElement(NavItem, {
          dirId: dir.id,
          id: id,
          closeDrawer: closeDrawer,
          key: id
        }));
      }

      return innerAccumulator;
    }, []);

    if (Items.length > 0) {
      return acc.concat(React.createElement(AkNavigationItemGroup, {
        title: dir.id,
        key: dir.id
      }, Items));
    }

    return acc;
  }, [])));
};

export default SearchDrawer;