import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import BoardIcon from '@atlaskit/icon/glyph/board';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ShipIcon from '@atlaskit/icon/glyph/ship';
import GoToItem from '../GoToItem';
import PresentationalItem from '../../presentational/Item';
export var iconMap = {
  ArrowRightIcon: ArrowRightIcon,
  BacklogIcon: BacklogIcon,
  BoardIcon: BoardIcon,
  DashboardIcon: DashboardIcon,
  GraphLineIcon: GraphLineIcon,
  FolderIcon: FolderIcon,
  IssuesIcon: IssuesIcon,
  ShipIcon: ShipIcon
};

var ConnectedItem =
/*#__PURE__*/
function (_Component) {
  _inherits(ConnectedItem, _Component);

  function ConnectedItem() {
    _classCallCheck(this, ConnectedItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectedItem).apply(this, arguments));
  }

  _createClass(ConnectedItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          beforeProp = _this$props.before,
          icon = _this$props.icon,
          rest = _objectWithoutProperties(_this$props, ["before", "icon"]);

      var before = beforeProp;

      if (!before && typeof icon === 'string' && iconMap[icon]) {
        before = iconMap[icon];
      }

      var props = _objectSpread({}, rest, {
        before: before
      });

      return props.goTo ? React.createElement(GoToItem, props) : React.createElement(PresentationalItem, props);
    }
  }]);

  return ConnectedItem;
}(Component);

export { ConnectedItem as default };