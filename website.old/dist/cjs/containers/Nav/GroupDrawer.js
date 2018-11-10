"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _navigation = require("@atlaskit/navigation");

var _arrowLeft = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-left"));

var _Default = _interopRequireDefault(require("./navigations/Default"));

var _index = require("./index");

var GroupDrawer = function GroupDrawer(_ref) {
  var closeDrawer = _ref.closeDrawer,
      isOpen = _ref.isOpen,
      pathname = _ref.pathname;
  return _react.default.createElement(_navigation.AkCustomDrawer, {
    backIcon: _react.default.createElement(_arrowLeft.default, {
      label: "go back"
    }),
    isOpen: isOpen,
    key: "groups",
    onBackButton: closeDrawer,
    primaryIcon: _react.default.createElement(_index.AtlaskitIcon, {
      monochrome: true
    })
  }, _react.default.createElement(_Default.default, {
    onClick: closeDrawer,
    pathname: pathname
  }));
};

var _default = GroupDrawer;
exports.default = _default;
module.exports = exports.default;