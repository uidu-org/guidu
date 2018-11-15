// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Banner from '../src';

const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;

const WarningBanner = ({ isOpen = true }: { isOpen: boolean }) => (
  <Banner icon={Icon} isOpen={isOpen} appearance="warning">
    This is an warning banner
  </Banner>
);

const ButtonWrapper = styled.div`
  padding-bottom: ${p => (p.isOpen ? 8 : 0)}px;
  transition: padding 0.25s ease-in-out;
  will-change: padding;
`;

export default class ToggleBanner extends Component<{}, { isOpen: boolean }> {
  state = { isOpen: false };

  toggleBanner = () => this.setState(state => ({ isOpen: !state.isOpen }));

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <ButtonWrapper isOpen={isOpen}>
          <Button appearance="primary" onClick={this.toggleBanner}>
            {isOpen ? 'Hide' : 'Show'} banner
          </Button>
        </ButtonWrapper>
        <WarningBanner isOpen={isOpen} />
      </div>
    );
  }
}
