// @flow
import React, { Component, type Node } from 'react';
import {
  ThemeProvider,
  withTheme,
  type ThemeProviderProps,
} from 'styled-components';

import { defaultGridColumns } from './internal/vars';
import GridColumn from './internal/GridColumnElement';

const defaultSpacing = 'cosy';

type Props = {
  medium?: number,
  children?: Node,
} & ThemeProviderProps;

export default withTheme(
  class AkGridColumn extends Component<Props, void> {
    static defaultProps = {
      medium: 0,
    };

    getTheme = props => ({
      columns:
        props.theme && props.theme.columns
          ? props.theme.columns
          : defaultGridColumns,
      spacing:
        props.theme && props.theme.spacing
          ? props.theme.spacing
          : defaultSpacing,
      isNestedGrid: false,
    });

    getNestedTheme = props => ({
      columns: props.medium,
      spacing:
        props.theme && props.theme.spacing
          ? props.theme.spacing
          : defaultSpacing,
      isNestedGrid: true,
    });

    render() {
      return (
        <ThemeProvider theme={this.getTheme(this.props)}>
          <GridColumn medium={this.props.medium}>
            <ThemeProvider theme={this.getNestedTheme(this.props)}>
              <div>{this.props.children}</div>
            </ThemeProvider>
          </GridColumn>
        </ThemeProvider>
      );
    }
  },
);
