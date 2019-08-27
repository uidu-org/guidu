import Button from '@uidu/button';
import {
  borderRadius,
  colors,
  createTheme,
  gridSize,
  layers,
  math,
} from '@uidu/theme';
import React, { ComponentType } from 'react';
import styled from 'styled-components';
import { ActionItem, ActionItems } from '../styled/Dialog';
import { ActionsType } from '../types';

export type CardTokens = {
  container: {
    [key: string]: string | void;
  };
};

type Props = {
  /** Buttons to render in the footer */
  actions?: ActionsType;
  /** An optional element rendered to the left of the footer actions */
  actionsBeforeElement?: React.ReactNode;
  /** The content of the card */
  children?: React.ReactNode;
  /** The container elements rendered by the component */
  components?: {
    Header?: ComponentType<any>;
    Footer?: ComponentType<any>;
  };
  /** The heading to be rendered above the body */
  heading?: React.ReactNode;
  /** An optional element rendered to the right of the heading */
  headingAfterElement?: React.ReactNode;
  /** The image to render above the heading. Can be a url or a Node. */
  image?: string | React.ReactNode;
  /** the theme of the card */
  theme?: any; // ** ThemeProps<CardTokens> */;
  innerRef?: React.RefObject<any>;
};

const Container = styled.div`
  ${({ theme }) => theme};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${math.multiply(gridSize, 2)}px ${math.multiply(gridSize, 2.5)}px;
`;

const Heading = styled.h4`
  ${colors.h600};
  color: inherit;
`;

const DefaultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: ${gridSize}px;
`;

const DefaultFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${gridSize}px;
`;

const Theme = createTheme(() => ({
  container: {
    overflow: 'auto',
    borderRadius: `${borderRadius()}px`,
    height: 'fit-content',
    zIndex: `${layers.spotlight() + 1}`,
  },
}));

const Card = ({
  actions = [],
  actionsBeforeElement,
  children,
  components = {},
  image,
  heading,
  headingAfterElement,
  theme,
  innerRef,
}: Props) => {
  const { Header = DefaultHeader, Footer = DefaultFooter } = components;

  return (
    <Theme.Provider value={theme}>
      <Theme.Consumer>
        {({ container }) => {
          return (
            <Container theme={container} ref={innerRef}>
              {typeof image === 'string' ? <img src={image} alt="" /> : image}
              <Body>
                {heading || headingAfterElement ? (
                  <Header>
                    <Heading>{heading}</Heading>
                    {/* Always need an element so space-between alignment works */}
                    {headingAfterElement || <span />}
                  </Header>
                ) : null}
                {children}
                {actions.length > 0 || actionsBeforeElement ? (
                  <Footer>
                    {/* Always need an element so space-between alignment works */}
                    {actionsBeforeElement || <span />}
                    <ActionItems>
                      {actions.map(({ text, key, ...rest }, idx) => {
                        return (
                          <ActionItem
                            key={
                              key ||
                              (typeof text === 'string' ? text : `${idx}`)
                            }
                          >
                            <Button {...rest}>{text}</Button>
                          </ActionItem>
                        );
                      })}
                    </ActionItems>
                  </Footer>
                ) : null}
              </Body>
            </Container>
          );
        }}
      </Theme.Consumer>
    </Theme.Provider>
  );
};

// $FlowFixMe - flow doesn't know about forwardRef
export default React.forwardRef((props: Props, ref: any) => (
  <Card {...props} innerRef={ref} />
));
