import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import React, { Component, MouseEventHandler } from 'react';
import { ChevronDown, ChevronUp, X } from 'react-feather';
import { DEFAULT_APPEARANCE } from '../../constants';
import { flagFocusRingColor } from '../../theme';
import { FlagProps } from '../../types';
import pkg from '../../version.json';
import Expander from '../Expander';
import Actions from '../FlagActions';
import Container, {
  Content,
  Description,
  DismissButton,
  Header,
  Icon,
  Title,
} from './styledFlag';

interface State {
  isExpanded: boolean;
}

class Flag extends Component<FlagProps, State> {
  static defaultProps = {
    actions: [],
    appearance: DEFAULT_APPEARANCE,
    isDismissAllowed: false,
  };

  state = { isExpanded: false };

  UNSAFE_componentWillReceiveProps(nextProps: FlagProps) {
    const { actions, description } = nextProps;
    if (
      this.isBold() &&
      this.state.isExpanded &&
      !description &&
      (!actions || !actions.length)
    ) {
      this.toggleExpand();
    }
  }

  dismissFlag = () => {
    if (this.props.isDismissAllowed && this.props.onDismissed) {
      this.props.onDismissed(this.props.id);
    }
  };

  isBold = () => this.props.appearance !== DEFAULT_APPEARANCE;

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderToggleOrDismissButton = () => {
    const { appearance, description, actions, isDismissAllowed, onDismissed } =
      this.props;
    const isBold = this.isBold();
    if (
      !isDismissAllowed ||
      (!isBold && !onDismissed) ||
      (isBold && !description && (!actions || !actions.length))
    ) {
      return null;
    }

    const ChevronIcon = this.state.isExpanded ? ChevronUp : ChevronDown;
    const ButtonIcon = isBold ? ChevronIcon : X;
    const buttonLabel = isBold ? 'Toggle flag body' : 'Dismiss flag';
    const buttonAction = isBold ? this.toggleExpand : this.dismissFlag;
    const size = ButtonIcon === ChevronIcon ? 18 : 18;

    return (
      <DismissButton
        appearance={appearance}
        aria-expanded={this.state.isExpanded}
        focusRingColor={flagFocusRingColor(this.props)}
        onClick={buttonAction}
        type="button"
      >
        <ButtonIcon size={size} />
      </DismissButton>
    );
  };

  renderBody = () => {
    const { actions, appearance, description, linkComponent, testId } =
      this.props;
    const isExpanded = !this.isBold() || this.state.isExpanded;

    return (
      <Expander isExpanded={isExpanded}>
        {description && (
          <Description appearance={appearance}>{description}</Description>
        )}
        <Actions
          actions={actions}
          appearance={appearance}
          linkComponent={linkComponent}
          data-testid={testId}
        />
      </Expander>
    );
  };

  // We prevent default on mouse down to avoid focus ring when the flag is clicked,
  // while still allowing it to be focused with the keyboard.
  handleMouseDown: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      appearance,
      icon,
      title,
      onMouseOver,
      onFocus,
      onMouseOut,
      onBlur,
      testId,
    } = this.props;
    const autoDismissProps = { onMouseOver, onFocus, onMouseOut, onBlur };
    const OptionalDismissButton = this.renderToggleOrDismissButton;
    const Body = this.renderBody;
    return (
      <Container
        appearance={appearance}
        role="alert"
        tabIndex={0}
        onMouseDown={this.handleMouseDown}
        data-testid={testId}
        {...autoDismissProps}
      >
        <Header>
          <Icon>{icon}</Icon>
          <Title appearance={appearance}>{title}</Title>
          <OptionalDismissButton />
        </Header>
        <Content>
          <Body />
        </Content>
      </Container>
    );
  }
}

export { Flag as FlagWithoutAnalytics };
const createAndFireEventOnUidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'flag',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnUidu({
      action: 'blurred',
      actionSubject: 'flag',

      attributes: {
        componentName: 'flag',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onDismissed: createAndFireEventOnUidu({
      action: 'dismissed',
      actionSubject: 'flag',

      attributes: {
        componentName: 'flag',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnUidu({
      action: 'focused',
      actionSubject: 'flag',

      attributes: {
        componentName: 'flag',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(Flag),
);
