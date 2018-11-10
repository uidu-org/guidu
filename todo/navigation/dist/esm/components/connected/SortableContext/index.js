import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { LayoutEventEmitter } from '../../presentational/LayoutManager/LayoutEvent';

var SortableContext =
/*#__PURE__*/
function (_Component) {
  _inherits(SortableContext, _Component);

  function SortableContext() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SortableContext);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SortableContext)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onDragStart = function (_ref, emit) {
      var _ref2 = _slicedToArray(_ref, 2),
          start = _ref2[0],
          provided = _ref2[1];

      emit();

      if (_this.props.onDragStart) {
        _this.props.onDragStart(start, provided);
      }
    };

    _this.onDragEnd = function (_ref3, emit) {
      var _ref4 = _slicedToArray(_ref3, 2),
          result = _ref4[0],
          provided = _ref4[1];

      emit();

      if (_this.props.onDragEnd) {
        _this.props.onDragEnd(result, provided);
      }
    };

    return _this;
  }

  _createClass(SortableContext, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          onDragUpdate = _this$props.onDragUpdate;
      return React.createElement(LayoutEventEmitter, null, function (_ref5) {
        var emitItemDragStart = _ref5.emitItemDragStart,
            emitItemDragEnd = _ref5.emitItemDragEnd;
        return React.createElement(DragDropContext, {
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
}(Component);

export { SortableContext as default };