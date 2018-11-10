"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("@atlaskit/theme");

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _Item = _interopRequireDefault(require("../../presentational/Item"));

var getStyles = function getStyles(provided, _ref) {
  var isDragging = _ref.isDragging;
  return (0, _objectSpread2.default)({}, provided, {
    itemBase: (0, _objectSpread2.default)({}, provided.itemBase, {
      boxShadow: isDragging ? "".concat(_theme.colors.N60A, " 0px 4px 8px -2px, ").concat(_theme.colors.N60A, " 0px 0px 1px") : undefined,
      cursor: isDragging ? 'grabbing' : 'pointer'
    })
  });
};

var SortableItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SortableItem, _Component);

  function SortableItem() {
    (0, _classCallCheck2.default)(this, SortableItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SortableItem).apply(this, arguments));
  }

  (0, _createClass2.default)(SortableItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          itemProps = (0, _objectWithoutProperties2.default)(_this$props, ["index"]);
      return _react.default.createElement(_reactBeautifulDnd.Draggable, {
        draggableId: itemProps.id,
        index: index,
        disableInteractiveElementBlocking: true
      }, function (draggableProvided, draggableSnapshot) {
        var draggableProps = (0, _objectSpread2.default)({}, draggableProvided.draggableProps, draggableProvided.dragHandleProps); // disable onClick if the intention was drag

        var onClick = draggableSnapshot.isDragging ? undefined : itemProps.onClick;
        return _react.default.createElement(_Item.default, (0, _extends2.default)({
          draggableProps: draggableProps,
          innerRef: draggableProvided.innerRef,
          isDragging: draggableSnapshot.isDragging,
          styles: getStyles
        }, itemProps, {
          onClick: onClick
        }));
      });
    }
  }]);
  return SortableItem;
}(_react.Component);

exports.default = SortableItem;
module.exports = exports.default;