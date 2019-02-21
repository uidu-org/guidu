function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Card, CardBody, CardHeader, Tooltip } from 'reactstrap';
import { tomorrow } from 'react-syntax-highlighter/dist/styles/prism';
import { Code } from 'react-feather';
import ErrorBoundary from './ErrorBoundary';
import replaceSrc from './replaceSrc';
const TRANSITION_DURATION = '200ms';
const Wrapper = styled(Card)`
  margin-top: 20px;
  transition: background-color ${TRANSITION_DURATION};
`;
export const Toggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: color ${TRANSITION_DURATION}, fill ${TRANSITION_DURATION};
`; // NOTE: use of important necessary to override element targeted headings

export const ToggleTitle = styled.h4`
  margin: 0;
`;
const Showcase = styled.div``;
export default class Example extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isSourceVisible: false,
      isHover: false
    });

    _defineProperty(this, "toggleSource", () => {
      this.setState({
        isSourceVisible: !this.state.isSourceVisible
      });
    });

    _defineProperty(this, "onError", (error, info) => {
      console.error(error);
      console.error(info);
    });
  }

  render() {
    const _this$props = this.props,
          Component = _this$props.Component,
          source = _this$props.source,
          language = _this$props.language,
          title = _this$props.title,
          packageName = _this$props.packageName;
    const _this$state = this.state,
          isHover = _this$state.isHover,
          isSourceVisible = _this$state.isSourceVisible;
    const toggleLabel = isSourceVisible ? 'Hide Code Snippet' : 'Show Code Snippet';
    const state = isHover ? 'hover' : 'normal';
    const mode = isSourceVisible ? 'open' : 'closed';
    return React.createElement(Wrapper, {
      className: "card shadow border-0 mb-4",
      state: state,
      mode: mode
    }, React.createElement(CardHeader, null, React.createElement(Toggle, {
      ref: c => {
        this.toggleElement = c;
      },
      onClick: this.toggleSource,
      onMouseOver: () => this.setState({
        isHover: true
      }),
      onMouseOut: () => this.setState({
        isHover: false
      }),
      title: toggleLabel,
      mode: mode
    }, React.createElement(ToggleTitle, {
      mode: mode
    }, title), React.createElement(Code, {
      id: "UncontrolledTooltipExample",
      label: toggleLabel
    }), React.createElement(Tooltip, {
      isOpen: state === 'hover',
      placement: "left",
      target: "UncontrolledTooltipExample"
    }, toggleLabel))), isSourceVisible && React.createElement(SyntaxHighlighter, {
      language: "javascript",
      style: tomorrow,
      customStyle: {
        marginTop: 0,
        padding: '1rem'
      }
    }, packageName ? replaceSrc(source, packageName) : source), React.createElement(CardBody, null, React.createElement(Showcase, null, React.createElement(ErrorBoundary, {
      onError: this.onError
    }, React.createElement(Component, null)))));
  }

}

_defineProperty(Example, "defaultProps", {
  language: 'javascript'
});