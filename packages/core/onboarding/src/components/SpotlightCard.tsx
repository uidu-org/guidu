import { Theme as ButtonTheme } from '@uidu/button';
import { N0, N50A, N60A, P300 } from '@uidu/theme';
import React, { ComponentType, ReactNode } from 'react';
import { ActionsType } from '../types';
import Card, { CardTokens } from './Card';
import { spotlightButtonTheme } from './theme';

type Props = {
  /** Buttons to render in the footer */
  actions?: ActionsType;
  /** An optional element rendered to the left of the footer actions */
  actionsBeforeElement?: ReactNode;
  /** The content of the card */
  children?: ReactNode;
  /** The container elements rendered by the component */
  components?: {
    Header?: ComponentType<any>;
    Footer?: ComponentType<any>;
  };
  /** The heading to be rendered above the body */
  heading?: ReactNode;
  /** An optional element rendered to the right of the heading */
  headingAfterElement?: ReactNode;
  /** The image src to render above the heading */
  image?: string | ReactNode;
  /** Removes elevation styles if set */
  isFlat: boolean;
  /** the theme of the card */
  theme: ThemeProp<CardTokens>;
  /** width of the card in pixels */
  width: number;
  innerRef?: Function;
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
      <ButtonTheme.Provider value={spotlightButtonTheme}>
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
                background: P300,
                color: N0,
                width: `${Math.min(Math.max(width, 160), 600)}px`,
                boxShadow: isFlat
                  ? undefined
                  : `0 4px 8px -2px ${N50A}, 0 0 1px ${N60A}`, // AK-5598
                ...container,
              },
            }));
          }}
        >
          {children}
        </Card>
      </ButtonTheme.Provider>
    );
  }
}

// $FlowFixMe - flow doesn't know about forwardRef
export default React.forwardRef((props: Props, ref) => (
  <SpotlightCard {...props} innerRef={ref} />
));
