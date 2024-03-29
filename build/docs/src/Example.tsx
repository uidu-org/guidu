import Tooltip from '@uidu/tooltip';
import React, { ComponentType } from 'react';
import { Code } from 'react-feather';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import ErrorBoundary from './ErrorBoundary';
import replaceSrc from './replaceSrc';

type Props = {
  Component: ComponentType<any>;
  language: string;
  source: string;
  title?: string;
  packageName?: string;
  overflowHidden?: boolean;
  fullWidth?: boolean;
  style?: any;
};

type State = {
  isSourceVisible: boolean;
  isHover: boolean;
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
  color: #adb5bd;
`;

const Showcase = styled.div<{ overflowHidden: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
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

  toggleElement;

  toggleSource = () => {
    this.setState({
      isSourceVisible: !this.state.isSourceVisible,
    });
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
      style,
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
      <div tw="my-5">
        <Tooltip position="mouse" content={toggleLabel} delay={0}>
          <Toggle
            ref={(c) => {
              this.toggleElement = c;
            }}
            onClick={this.toggleSource}
          >
            <ToggleTitle>
              {title} <small>Example</small>
            </ToggleTitle>
            <Code id="UncontrolledTooltipExample" />
          </Toggle>
        </Tooltip>
        <Wrapper tw="border rounded">
          {isSourceVisible && (
            <SyntaxHighlighter
              language="javascript"
              style={tomorrow}
              customStyle={{
                border: 0,
                marginTop: 0,
                marginBottom: 0,
                padding: '1.5rem',
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
              }}
            >
              {packageName ? replaceSrc(source, packageName) : source}
            </SyntaxHighlighter>
          )}
          <div css={[!fullWidth && tw`p-5`]}>
            <Showcase overflowHidden={overflowHidden} style={style}>
              <ErrorBoundary onError={this.onError}>
                <Component />
              </ErrorBoundary>
            </Showcase>
          </div>
        </Wrapper>
      </div>
    );
  }
}
