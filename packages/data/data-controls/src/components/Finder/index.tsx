import React, { Component } from 'react';
import { Search } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { FinderProps } from './types';

const Wrapper = styled.div`
  position: relative;
  margin-right: 0.25rem;
`;

const Icon = styled.div`
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  /* line-height: 2.375rem; */
  text-align: center;
  pointer-events: none;
  color: #aaa;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFieldText = styled.input`
  padding-left: 2.375rem;
  box-shadow: none;
`;

export default class Finder extends Component<FinderProps> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onChange } = this.props;
    return (
      <Wrapper>
        <Icon>
          <Search size={16} strokeWidth={2} />
        </Icon>
        <FormattedMessage
          id="guidu.data_controls.finder.placeholder"
          defaultMessage="Search..."
        >
          {(placeholder: string) => (
            <>
              <StyledFieldText
                ref={this.input}
                className="form-control form-control-sm w-auto mr-2"
                type="search"
                name=""
                placeholder={placeholder}
                onChange={onChange}
              />
            </>
          )}
        </FormattedMessage>
      </Wrapper>
    );
  }
}
