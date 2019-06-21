// @flow

import React, { type ComponentType } from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Tooltip from '@uidu/tooltip';
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

const TRANSITION_DURATION = '200ms';

const Wrapper = styled.div`
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
export const ToggleTitle = styled.h5`
  margin: 0;
`;

const Showcase = styled.div`
  position: relative;
  overflow-x: hidden;
`;

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
    const { isSourceVisible } = this.state;
    const toggleLabel = isSourceVisible ? (
      <span>Hide Code Snippet</span>
    ) : (
      <span>Show Code Snippet</span>
    );

    const mode = isSourceVisible ? 'open' : 'closed';

    return (
      <Wrapper className="border mb-4 card" mode={mode}>
        <div className="card-header">
          <Tooltip placement="left" content={toggleLabel}>
            <Toggle
              ref={c => {
                this.toggleElement = c;
              }}
              onClick={this.toggleSource}
              title={toggleLabel}
              mode={mode}
            >
              <ToggleTitle mode={mode}>{title}</ToggleTitle>
              <Code id="UncontrolledTooltipExample" label={toggleLabel} />
            </Toggle>
          </Tooltip>
        </div>
        {isSourceVisible && (
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            customStyle={{ marginTop: 0, padding: '1rem' }}
          >
            {packageName ? replaceSrc(source, packageName) : source}
          </SyntaxHighlighter>
        )}
        <div className="card-body">
          <Showcase>
            <ErrorBoundary onError={this.onError}>
              <Component />
            </ErrorBoundary>
          </Showcase>
        </div>
      </Wrapper>
    );
  }
}
