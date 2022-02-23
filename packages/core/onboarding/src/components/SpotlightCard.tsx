import { ThemeProp } from '@uidu/theme/components';
import React, { ComponentType, ReactNode, Ref } from 'react';
import { Actions } from '../types';
import Card, { CardTokens } from './Card';

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

function SpotlightCard({
  width = 400,
  isFlat = false,
  components = {},
  theme = (themeFn: () => any) => themeFn(),
  actions,
  actionsBeforeElement,
  children,
  heading,
  headingAfterElement,
  image,
  innerRef,
  className,
}: Props) {
  return (
    <Card
      ref={innerRef}
      heading={heading}
      headingAfterElement={headingAfterElement}
      actions={actions}
      actionsBeforeElement={actionsBeforeElement}
      components={components}
      image={image}
      className={className}
      tw="shadow"
      theme={(parent) => {
        const { container, ...others } = parent({});
        return theme!(
          () => ({
            ...others,
            container: {
              background: 'rgb(var(--body-primary-bg))',
              color: 'rgb(var(--body-primary-color))',
              width: `${Math.min(Math.max(width!, 160), 600)}px`,
              ...container,
            },
          }),
          {},
        );
      }}
    >
      {children}
    </Card>
  );
}

export default React.forwardRef<HTMLElement, Props>((props, ref) => (
  <SpotlightCard {...props} innerRef={ref} />
));
