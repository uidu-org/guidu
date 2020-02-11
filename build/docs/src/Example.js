// @flow

import Tooltip from '@uidu/tooltip';
import React, { ComponentType, Fragment } from 'react';
import { Code } from 'react-feather';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled, { css } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import replaceSrc from './replaceSrc';

type Props = {
  Component: ComponentType<any>,
  language: string,
  source: string,
  title: string,
  packageName: string,
  overflowHidden: boolean,
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
export const ToggleTitle = styled.h6`
  margin: 0;
`;

const Showcase = styled.div`
  position: relative;
  ${({ overflowHidden }) =>
    overflowHidden
      ? css`
          overflow-x: hidden;
        `
      : null};
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
    const {
      Component,
      source,
      language,
      title,
      packageName,
      overflowHidden,
      fullWidth,
    } = this.props;
    const { isSourceVisible } = this.state;
    const toggleLabel = isSourceVisible ? (
      <span>Hide Code Snippet</span>
    ) : (
      <span>Show Code Snippet</span>
    );

    const mode = isSourceVisible ? 'open' : 'closed';

    return (
      <Fragment>
        <Tooltip position="mouse" content={toggleLabel}>
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
        <Wrapper className="border mb-5 card" mode={mode}>
          {isSourceVisible && (
            <SyntaxHighlighter
              language="javascript"
              style={prism}
              customStyle={{
                backgroundColor: '#f8f9fa',
                border: 0,
                marginTop: 0,
                marginBottom: 0,
                padding: '1.5rem',
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            >
              {packageName ? replaceSrc(source, packageName) : source}
            </SyntaxHighlighter>
          )}
          <div className={fullWidth ? '' : 'card-body'}>
            <Showcase overflowHidden={overflowHidden}>
              <ErrorBoundary onError={this.onError}>
                <Component />
              </ErrorBoundary>
            </Showcase>
          </div>
        </Wrapper>
      </Fragment>
    );
  }
}
