"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _LayoutEvent = require("../../presentational/LayoutManager/LayoutEvent");

var SortableContext =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SortableContext, _Component);

  function SortableContext() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SortableContext);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SortableContext)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onDragStart = function (_ref, emit) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          start = _ref2[0],
          provided = _ref2[1];

      emit();

      if (_this.props.onDragStart) {
        _this.props.onDragStart(start, provided);
      }
    };

    _this.onDragEnd = function (_ref3, emit) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          result = _ref4[0],
          provided = _ref4[1];

      emit();

      if (_this.props.onDragEnd) {
        _this.props.onDragEnd(result, provided);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(SortableContext, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          onDragUpdate = _this$props.onDragUpdate;
      return _react.default.createElement(_LayoutEvent.LayoutEventEmitter, null, function (_ref5) {
        var emitItemDragStart = _ref5.emitItemDragStart,
            emitItemDragEnd = _ref5.emitItemDragEnd;
        return _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
          onDragUpdate: onDragUpdate,
          onDragStart: function onDragStart() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _this2.onDragStart(args, emitItemDragStart);
          },
          onDragEnd: function onDragEnd() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return _this2.onDragEnd(args, emitItemDragEnd);
          }
        }, children);
      });
    }
  }]);
  return SortableContext;
}(_react.Component);

exports.default = SortableContext;
module.exports = exports.default;