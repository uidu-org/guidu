import Popup from '@uidu/popup';
import React from 'react';
import filterActions from '../internal/filterActions';
import { CardElevationWrapper, CardTriggerWrapper } from '../styled/Card';
import LoadingState from './LoadingState';
import Profilecard from './ProfileCard';
import withOuterListeners from './withOuterListeners';

const CardElevationWrapperWithOuter = withOuterListeners(CardElevationWrapper);

export const DELAY_MS_SHOW = 800;
export const DELAY_MS_HIDE = 200;

class ProfilecardTrigger extends React.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this.showDelay = this.props.trigger === 'click' ? 0 : DELAY_MS_SHOW;
    this.hideDelay = this.props.trigger === 'click' ? 0 : DELAY_MS_HIDE;
    this.showTimer = 0;
    this.hideTimer = 0;
    this.hideProfilecard = () => {
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      this.hideTimer = window.setTimeout(() => {
        this.setState({ visible: false });
      }, this.hideDelay);
    };
    this.showProfilecard = () => {
      clearTimeout(this.hideTimer);
      clearTimeout(this.showTimer);
      this.showTimer = window.setTimeout(() => {
        if (!this.state.visible) {
          this.clientFetchProfile();
          this.setState({ visible: true });
        }
      }, this.showDelay);
    };
    this.containerListeners =
      this.props.trigger === 'hover'
        ? {
            onMouseEnter: this.showProfilecard,
            onMouseLeave: this.hideProfilecard,
          }
        : {
            onClick: this.showProfilecard,
          };
    this.layerListeners = {
      handleClickOutside: this.hideProfilecard,
      handleEscapeKeydown: this.hideProfilecard,
    };
    this.state = {
      visible: false,
      isLoading: undefined,
      hasError: false,
      error: null,
      data: null,
    };
    this.clientFetchProfile = () => {
      const { cloudId, userId } = this.props;
      const { isLoading } = this.state;
      if (isLoading === true) {
        // don't fetch data when fetching is in process
        return;
      }
      this.setState(
        {
          isLoading: true,
          hasError: false,
          data: null,
        },
        () => {
          this.props.resourceClient
            .getProfile(cloudId, userId)
            .then(
              (res) => this.handleClientSuccess(res),
              (err) => this.handleClientError(err),
            )
            .catch((err) => this.handleClientError(err));
        },
      );
    };
    this.setRef = (targetRef) => {
      this.targetRef = targetRef;
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentDidUpdate(prevProps) {
    const { userId, cloudId } = this.props;
    if (userId !== prevProps.userId || cloudId !== prevProps.cloudId) {
      this.setState(
        {
          isLoading: undefined,
        },
        this.clientFetchProfile,
      );
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
  }
  handleClientSuccess(res) {
    if (!this._isMounted) {
      return;
    }
    this.setState({
      isLoading: false,
      hasError: false,
      data: res,
    });
  }
  handleClientError(err) {
    if (!this._isMounted) {
      return;
    }
    this.setState({
      isLoading: false,
      hasError: true,
      error: err,
    });
  }
  filterActions() {
    return filterActions(this.props.actions, this.state.data);
  }
  renderProfileCard() {
    const newProps = {
      clientFetchProfile: this.clientFetchProfile,
      analytics: this.props.analytics,
      ...this.state.data,
    };
    return React.createElement(
      Profilecard,
      Object.assign({}, newProps, {
        actions: this.filterActions(),
        customElevation: 'none',
        hasError: this.state.hasError,
        errorType: this.state.error,
      }),
    );
  }

  renderWithPopper(element) {
    return React.createElement(
      Popup,
      { referenceElement: this.targetRef, placement: this.props.position },
      ({ ref, style }) =>
        React.createElement(
          CardElevationWrapperWithOuter,
          Object.assign(
            { style: style, innerRef: ref },
            this.containerListeners,
            this.layerListeners,
            { customElevation: this.props.customElevation },
          ),
          element,
        ),
    );
  }
  renderLoading() {
    const { isLoading, visible } = this.state;
    const isFetchingOrNotStartToFetchYet =
      isLoading === true || isLoading === undefined;
    return visible && isFetchingOrNotStartToFetchYet && this.targetRef
      ? this.renderWithPopper(React.createElement(LoadingState, null))
      : null;
  }

  renderProfileCardLoaded() {
    const { isLoading, visible } = this.state;
    return visible && isLoading === false && this.targetRef
      ? this.renderWithPopper(this.renderProfileCard())
      : null;
  }

  renderWithTrigger() {
    return (
      <>
        <CardTriggerWrapper {...this.containerListeners}>
          {this.props.children}
        </CardTriggerWrapper>
        {this.renderLoading()}
        {this.renderProfileCardLoaded()}
      </>
    );
  }

  render() {
    if (this.props.children) {
      return this.renderWithTrigger();
    } else {
      throw new Error(
        'Component "ProfileCardTrigger" must have "children" property',
      );
    }
  }
}

ProfilecardTrigger.defaultProps = {
  actions: [],
  trigger: 'hover',
  customElevation: 'e200',
};

export default ProfilecardTrigger;
