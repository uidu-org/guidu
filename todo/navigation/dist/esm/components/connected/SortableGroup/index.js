import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Group from '../../presentational/Group';
var defaultStyles = {
  minHeight: 64,
  // Remove browser default button styles for rbdnd placeholder
  '& > button': {
    background: 'none',
    border: 'none',
    padding: 'none'
  }
}; // This will automatically be applied for us as part of react-beautiful-dnd v10

var applyDraggingStyles = function applyDraggingStyles(snapshot) {
  return {
    pointerEvents: snapshot.isDraggingOver ? 'none' : undefined
  };
};

var SortableGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(SortableGroup, _Component);

  function SortableGroup() {
    _classCallCheck(this, SortableGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(SortableGroup).apply(this, arguments));
  }

  _createClass(SortableGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          innerStyle = _this$props.innerStyle,
          groupProps = _objectWithoutProperties(_this$props, ["children", "innerStyle"]);

      return React.createElement(Droppable, {
        droppableId: groupProps.id
      }, function (droppableProvided, snapshot) {
        return React.createElement("div", _extends({
          ref: droppableProvided.innerRef,
          css: _objectSpread({}, defaultStyles, innerStyle, applyDraggingStyles(snapshot))
        }, droppableProvided.droppableProps), React.createElement(Group, groupProps, children, droppableProvided.placeholder));
      });
    }
  }]);

  return SortableGroup;
}(Component);

export { SortableGroup as default };