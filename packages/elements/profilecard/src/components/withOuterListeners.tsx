import React from 'react';
import ReactDOM from 'react-dom';

export default function withOuterListeners(Component) {
  return class WithOuterListeners extends React.PureComponent {
    constructor() {
      super(...arguments);
      this.handleClick = (evt) => {
        const { handleClickOutside } = this.props;
        if (handleClickOutside) {
          const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
          if (
            !domNode ||
            (evt.target instanceof Node && !domNode.contains(evt.target))
          ) {
            handleClickOutside();
          }
        }
      };
      this.handleKeydown = (evt) => {
        const { handleEscapeKeydown } = this.props;
        if (handleEscapeKeydown && evt.code === 'Escape') {
          handleEscapeKeydown();
        }
      };
    }
    componentDidMount() {
      if (this.props.handleClickOutside) {
        document.addEventListener('click', this.handleClick, false);
      }
      if (this.props.handleEscapeKeydown) {
        document.addEventListener('keydown', this.handleKeydown, false);
      }
    }
    componentWillUnmount() {
      if (this.props.handleClickOutside) {
        document.removeEventListener('click', this.handleClick, false);
      }
      if (this.props.handleEscapeKeydown) {
        document.removeEventListener('keydown', this.handleKeydown, false);
      }
    }
    render() {
      return React.createElement(Component, Object.assign({}, this.props));
    }
  };
}
//# sourceMappingURL=withOuterListeners.js.map
