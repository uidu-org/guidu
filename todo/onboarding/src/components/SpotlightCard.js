// @flow

import { colors, type ThemeProp } from '@atlaskit/theme';
import React, { type Node, type ComponentType } from 'react';
import { ThemeProvider } from 'styled-components';
import Card, { type CardTokens } from './Card';
import { getSpotlightTheme } from './theme';
import type { ActionsType } from '../types';

type Props = {
  /** Buttons to render in the footer */
  actions?: ActionsType,
  /** An optional element rendered to the left of the footer actions */
  actionsBeforeElement?: Node,
  /** The content of the card */
  children?: Node,
  /** The container elements rendered by the component */
  components?: {
    Header?: ComponentType<any>,
    Footer?: ComponentType<any>,
  },
  /** The heading to be rendered above the body */
  heading?: Node,
  /** An optional element rendered to the right of the heading */
  headingAfterElement?: Node,
  /** The image src to render above the heading */
  image?: string | Node,
  /** Removes elevation styles if set */
  isFlat: boolean,
  /** the theme of the card */
  theme: ThemeProp<CardTokens>,
  /** width of the card in pixels */
  width: number,
  innerRef?: Function,
};

class SpotlightCard extends React.Component<Props> {
  static defaultProps: $Shape<Props> = {
    width: 400,
    isFlat: false,
    components: {},
    theme: x => x(),
  };
  render() {
    const {
      actions,
      actionsBeforeElement,
      children,
      components,
      isFlat,
      heading,
      headingAfterElement,
      image,
      innerRef,
      theme,
      width,
    } = this.props;
    return (
      <ThemeProvider theme={getSpotlightTheme}>
        <Card
          ref={innerRef}
          heading={heading}
          headingAfterElement={headingAfterElement}
          actions={actions}
          actionsBeforeElement={actionsBeforeElement}
          components={components}
          image={image}
          theme={parent => {
            const { container, ...others } = parent();
            return theme(() => ({
              ...others,
              container: {
                background: colors.P300,
                color: colors.N0,
                width: `${Math.min(Math.max(width, 160), 600)}px`,
                boxShadow: isFlat
                  ? undefined
                  : `0 4px 8px -2px ${colors.N50A}, 0 0 1px ${colors.N60A}`, // AK-5598
                ...container,
              },
            }));
          }}
        >
          {children}
        </Card>
      </ThemeProvider>
    );
  }
}

// $FlowFixMe - flow doesn't know about forwardRef
export default React.forwardRef((props: Props, ref) => (
  <SpotlightCard {...props} innerRef={ref} />
));
