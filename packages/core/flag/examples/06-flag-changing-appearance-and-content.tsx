import Form from '@uidu/form';
import { RadioGroup } from '@uidu/radio';
import Spinner from '@uidu/spinner';
import { colors, gridSize } from '@uidu/theme';
import React, { Component } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from 'react-feather';
import styled from 'styled-components';
import Flag, { FlagGroup } from '../src';
import { AppearanceArray, AppearanceTypes } from '../src/types';

const boldAppearanceNames = AppearanceArray.filter(val => val !== 'normal');
const boldAppearanceItems = boldAppearanceNames.map(val => ({
  name: val,
  id: val,
  label: val,
  defaultSelected: val === boldAppearanceNames[0],
}));

// We wrap the Spinner in a div the same height as a standard Icon, to avoid the flag height
// jumping when Flag.appearance is changed.
const SpinnerContainer = styled.div`
  height: ${gridSize() * 3}px;
  width: ${gridSize() * 3}px;
`;

type State = {
  appearance: AppearanceTypes;
};

export default class ConnectionDemo extends Component<any, State> {
  createdFlagCount = 0;

  // eslint-disable-line react/sort-comp
  state = {
    appearance: boldAppearanceNames[0],
  };

  getTitle = (): string => {
    switch (this.state.appearance) {
      case 'error':
        return 'We are having issues';
      case 'info':
        return 'Connecting...';
      case 'success':
        return 'Connected';
      case 'warning':
        return 'Trying again...';
      default:
        return '';
    }
  };

  getIcon = () => {
    switch (this.state.appearance) {
      case 'error':
        return <AlertCircle fill={colors.R400} />;
      case 'info':
        return (
          <SpinnerContainer>
            <Spinner size="small" invertColor />
          </SpinnerContainer>
        );
      case 'success':
        return <CheckCircle fill={colors.G400} />;
      case 'warning':
        return <AlertTriangle fill={colors.Y200} />;
      default:
        return <CheckCircle fill={colors.G400} />;
    }
  };

  getDescription = () => {
    if (this.state.appearance === 'error') {
      return 'We cannot log in at the moment, please try again soon.';
    }
    return undefined;
  };

  getActions = () => {
    if (this.state.appearance === 'warning') {
      return [{ content: 'Good luck!', onClick: () => {} }];
    }
    return undefined;
  };

  render() {
    return (
      <div>
        <FlagGroup>
          <Flag
            appearance={this.state.appearance}
            icon={this.getIcon()}
            title={this.getTitle()}
            description={this.getDescription()}
            actions={this.getActions()}
            id="fake-flag"
          />
        </FlagGroup>
        <p>This story shows the transition between various flag appearances.</p>
        <Form
          handleSubmit={async model => console.log(model)}
          footerRenderer={() => null}
        >
          <RadioGroup
            name="appearance"
            options={boldAppearanceItems}
            label="Pick your new flag appearance:"
            onChange={(name, value) => {
              console.log(value);
              this.setState({ appearance: value });
            }}
          />
        </Form>
      </div>
    );
  }
}
