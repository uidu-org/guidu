// @flow
import React, { Component } from 'react';
import {
  ThemeProvider,
  withTheme,
  type ThemeProviderProps,
} from 'styled-components';

import { defaultGridColumns } from './internal/vars';
import Grid from './internal/GridElement';

type Props = {
  children?: any,
  spacing?: 'cosy' | 'comfortable' | 'compact',
  layout?: 'fixed' | 'fluid',
} & ThemeProviderProps;

export default withTheme(
  class AkGrid extends Component<Props, void> {
    static defaultProps = {
      spacing: 'cosy',
      layout: 'fixed',
    };

    getTheme = props => ({
      columns:
        props.theme && props.theme.columns
          ? props.theme.columns
          : defaultGridColumns,
      spacing:
        props.theme && props.theme.spacing
          ? props.theme.spacing
          : props.spacing,
      isNestedGrid:
        props.theme && props.theme.isNestedGrid
          ? props.theme.isNestedGrid
          : false,
    });

    render() {
      return (
        <ThemeProvider theme={this.getTheme(this.props)}>
          <Grid spacing={this.props.spacing} layout={this.props.layout}>
            {this.props.children}
          </Grid>
        </ThemeProvider>
      );
    }
  },
);
