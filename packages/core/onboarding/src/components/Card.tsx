import Button from '@uidu/button';
import {
  borderRadius,
  createTheme,
  gridSize,
  layers,
  math,
  typography,
} from '@uidu/theme';
import { ThemeProp } from '@uidu/theme/components';
import React, { ComponentType, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { ActionItem, ActionItems } from '../styled/Dialog';
import { Actions } from '../types';

export interface CardTokens {
  container: Record<string, string | undefined>;
}

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
  /** The image to render above the heading. Can be a url or a Node. */
  image?: string | ReactNode;
  /** the theme of the card */
  theme?: ThemeProp<CardTokens, {}>;

  innerRef?: React.Ref<any>;
}

const Container = styled.div`
  ${({ theme }) => theme};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${math.multiply(gridSize, 2)}px ${math.multiply(gridSize, 2.5)}px;
`;

const Heading = styled.h4`
  ${typography.h600};
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

const Theme = createTheme<CardTokens, {}>(() => ({
  container: {
    borderRadius: `${borderRadius()}px`,
    zIndex: `${layers.spotlight() + 1}`,
  },
}));

const Card: FC<Props> = ({
  actions = [],
  actionsBeforeElement,
  children,
  components = {},
  image,
  heading,
  headingAfterElement,
  theme,
  innerRef,
  className,
}) => {
  const { Header = DefaultHeader, Footer = DefaultFooter } = components;

  return (
    <Theme.Provider value={theme}>
      <Theme.Consumer>
        {({ container }) => {
          return (
            <Container
              theme={container}
              ref={innerRef!}
              tw="overflow-auto [height:fit-content]"
              className={className}
            >
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

export default React.forwardRef<HTMLElement, Props>((props, ref) => (
  <Card {...props} innerRef={ref} />
));
