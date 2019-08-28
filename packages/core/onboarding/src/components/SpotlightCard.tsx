import { Theme as ButtonTheme } from '@uidu/button';
import { colors } from '@uidu/theme';
import React, { ComponentType, ReactNode, Ref } from 'react';
import { Actions } from '../types';
import Card, { CardTokens } from './Card';
import { spotlightButtonTheme } from './theme';

const { N0, N50A, N60A, P300 } = colors;

interface Props {
  /** Buttons to render in the footer */
  actions?: Actions;
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
  isFlat?: boolean;
  /** the theme of the card */
  theme?: ThemeProp<CardTokens, {}>;
  /** width of the card in pixels */
  width?: number;

  innerRef?: Ref<HTMLElement> | null;
}

class SpotlightCard extends React.Component<Props> {
  static defaultProps = {
    width: 400,
    isFlat: false,
    components: {},
    theme: (themeFn: () => any) => themeFn(),
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
            const { container, ...others } = parent({});
            return theme!(
              () => ({
                ...others,
                container: {
                  background: P300,
                  color: N0,
                  width: `${Math.min(Math.max(width!, 160), 600)}px`,
                  boxShadow: isFlat
                    ? undefined
                    : `0 4px 8px -2px ${N50A}, 0 0 1px ${N60A}`, // AK-5598
                  ...container,
                },
              }),
              {},
            );
          }}
        >
          {children}
        </Card>
      </ButtonTheme.Provider>
    );
  }
}

export default React.forwardRef<HTMLElement, Props>((props, ref) => (
  <SpotlightCard {...props} innerRef={ref} />
));
