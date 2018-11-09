// @flow
import React, { type ComponentType } from 'react';
import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Card, CardBody, CardHeader, Tooltip } from 'reactstrap';
import { tomorrow } from 'react-syntax-highlighter/dist/styles/prism';
import { Code } from 'react-feather';
import ErrorBoundary from './ErrorBoundary';
import replaceSrc from './replaceSrc';

type Props = {
  Component: ComponentType<any>,
  language: string,
  source: string,
  title: string,
  packageName: string,
};

type State = {
  isSourceVisible: boolean,
  isHover: boolean,
};

export default class Example extends React.Component<Props, State> {
  static defaultProps = {
    language: 'javascript',
  };

  state = {
    isSourceVisible: false,
    isHover: false,
  };

  toggleSource = () => {
    this.setState({ isSourceVisible: !this.state.isSourceVisible });
  };

  onError = (error: Error, info: any) => {
    console.error(error);
    console.error(info);
  };

  render() {
    const { Component, source, language, title, packageName } = this.props;
    const { isHover, isSourceVisible } = this.state;
    const toggleLabel = isSourceVisible
      ? 'Hide Code Snippet'
      : 'Show Code Snippet';

    const state = isHover ? 'hover' : 'normal';
    const mode = isSourceVisible ? 'open' : 'closed';

    return (
      <Wrapper className="card shadow border-0 mb-4" state={state} mode={mode}>
        <CardHeader>
          <Toggle
            ref={c => {
              this.toggleElement = c;
            }}
            onClick={this.toggleSource}
            onMouseOver={() => this.setState({ isHover: true })}
            onMouseOut={() => this.setState({ isHover: false })}
            title={toggleLabel}
            mode={mode}
          >
            <ToggleTitle mode={mode}>{title}</ToggleTitle>
            <Code id="UncontrolledTooltipExample" label={toggleLabel} />
            <Tooltip
              isOpen={state === 'hover'}
              placement="left"
              target="UncontrolledTooltipExample"
            >
              {toggleLabel}
            </Tooltip>
          </Toggle>
        </CardHeader>
        {isSourceVisible && (
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            customStyle={{ marginTop: 0, padding: '1rem' }}
          >
            {packageName ? replaceSrc(source, packageName) : source}
          </SyntaxHighlighter>
        )}
        <CardBody>
          <Showcase>
            <ErrorBoundary onError={this.onError}>
              <Component />
            </ErrorBoundary>
          </Showcase>
        </CardBody>
      </Wrapper>
    );
  }
}

const TRANSITION_DURATION = '200ms';

const exampleBackgroundColor = {
  open: themed('state', {
    normal: { light: colors.N30, dark: colors.N700 },
    hover: { light: colors.N40, dark: colors.N600 },
  }),
  closed: themed('state', {
    normal: { light: colors.N20, dark: colors.DN50 },
    hover: { light: colors.N40, dark: colors.DN60 },
  }),
};
const toggleColor = themed('mode', {
  closed: { light: colors.N600, dark: colors.DN100 },
  open: { light: colors.N600, dark: colors.DN100 },
});

const Wrapper = styled(Card)`
  color: ${toggleColor};
  margin-top: 20px;
  transition: background-color ${TRANSITION_DURATION};
`;

export const Toggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: color ${TRANSITION_DURATION}, fill ${TRANSITION_DURATION};
`;

// NOTE: use of important necessary to override element targeted headings
export const ToggleTitle = styled.h4`
  color: ${toggleColor} !important;
  margin: 0;
`;

const Showcase = styled.div`
  // background-color: ${colors.background};
  // border-radius: 3px;
  // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`;
