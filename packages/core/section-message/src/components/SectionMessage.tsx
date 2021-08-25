import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid';
import Button from '@uidu/button';
import React from 'react';
import { Appearance } from '../types';
import {
  Action,
  Actions,
  Container,
  ContentContainer,
  Description,
  IconWrapper,
  Title,
} from './styled';

interface ActionType {
  text: React.ReactNode;
  onClick?: () => void;
  href?: string;
  key: string;
}

interface Props {
  /* The appearance styling to use for the section message. */
  appearance?: Appearance;
  /*
    The main content of the section message. This accepts a react node, although
    we recommend that this should be a paragraph.
  */
  children: React.ReactNode;
  /*
    The heading of the section message.
  */
  title?: string;
  /*
    Actions to be taken from the section message. These accept an object which
    are applied to @uidu/button components. Middots are automatically added
    between the items. We generally recommend using no more than two actions.
  */
  actions?: Array<ActionType>;
  /*
    An Icon component to be rendered instead of the default icon for the component.
    This should only be an `@uidu/icon` icon. You can check out [this example](/packages/core/section-message/example/custom-icon)
    to see how to provide this icon.
  */
  icon?: React.ElementType;
  /*
    A custom link component. This prop is designed to allow a custom link
    component to be passed to the link button being rendered by actions. The
    intended use-case is for when a custom router component such as react router
    is being used within the application.

    This component will only be used if a href is passed to the action.

    All actions provided will automatically have the linkcomponent passed to them.
  */
  linkComponent?: React.ComponentType<any>;
}

export const baseIcons: { [key: Appearance]: React.FC<any> } = {
  info: () => <InformationCircleIcon tw="h-6 w-6 text-blue-500" />,
  warning: () => <ExclamationIcon tw="h-6 w-6 text-yellow-500" />,
  error: () => <XCircleIcon tw="h-6 w-6 text-red-500" />,
  confirmation: () => <CheckCircleIcon tw="h-6 w-6 text-green-500" />,
  change: () => <QuestionMarkCircleIcon tw="h-6 w-6 text-purple-500" />,
};

export default function SectionMessage({
  appearance = 'info',
  children,
  title,
  actions,
  icon,
  linkComponent,
  className,
}: Props) {
  const renderAction = (
    action: ActionType,
    linkComponent?: React.ComponentType<any>,
  ) => {
    const { href, key, onClick, text } = action;

    return (
      <Action key={key}>
        {onClick || href ? (
          <Button
            as="a"
            appearance="link"
            spacing="none"
            onClick={onClick}
            href={href}
            component={linkComponent}
          >
            {text}
          </Button>
        ) : (
          text
        )}
      </Action>
    );
  };

  const Icon = icon || baseIcons[appearance];

  return (
    <Container appearance={appearance} className={className}>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <ContentContainer>
        {title ? <Title>{title}</Title> : null}
        {children ? <Description>{children}</Description> : null}
        {actions && actions.length ? (
          <Actions>
            {actions.map((action) => renderAction(action, linkComponent))}
          </Actions>
        ) : null}
      </ContentContainer>
    </Container>
  );
}
