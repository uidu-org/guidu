import React from 'react';
import { AnalyticsName } from '../internal/analytics';
import filterActions from '../internal/filterActions';
import { CardElevationWrapper } from '../styled/Card';
import ErrorMessage from './ErrorMessage';
import LoadingState from './LoadingState';
import ProfileCard from './ProfileCard';

export default class ProfileCardResourced extends React.PureComponent<{}> {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this.state = {
      visible: false,
      isLoading: undefined,
      hasError: false,
      error: null,
      data: null,
    };
    this.callAnalytics = (id, options = {}) => {
      const { analytics } = this.props;
      if (analytics) {
        analytics(id, options);
      }
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
    this.filterActions = () =>
      filterActions(this.props.actions, this.state.data);
  }
  componentDidMount() {
    this._isMounted = true;
    this.clientFetchProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    const { userId, cloudId } = this.props;
    const { hasError } = this.state;
    if (userId !== prevProps.userId || cloudId !== prevProps.cloudId) {
      this.setState(
        {
          isLoading: undefined,
        },
        this.clientFetchProfile,
      );
    }
    if (hasError !== prevState.hasError && hasError) {
      this.callAnalytics(AnalyticsName.PROFILE_CARD_RESOURCED_ERROR);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
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
  render() {
    const { isLoading, hasError, error, data } = this.state;
    const { analytics, customElevation } = this.props;
    const isFetchingOrNotStartToFetchYet =
      isLoading === true || isLoading === undefined;
    if (isFetchingOrNotStartToFetchYet) {
      return React.createElement(
        CardElevationWrapper,
        { customElevation: customElevation },
        React.createElement(LoadingState, null),
      );
    } else if (hasError) {
      return React.createElement(
        CardElevationWrapper,
        { customElevation: customElevation },
        React.createElement(ErrorMessage, {
          errorType: error,
          reload: this.clientFetchProfile,
        }),
      );
    }
    const newProps = {
      hasError,
      errorType: error,
      clientFetchProfile: this.clientFetchProfile,
      analytics,
      ...data,
    };
    return React.createElement(
      CardElevationWrapper,
      { customElevation: customElevation },
      React.createElement(
        ProfileCard,
        Object.assign({}, newProps, {
          actions: this.filterActions(),
          customElevation: 'none',
        }),
      ),
    );
  }
}
ProfileCardResourced.defaultProps = {
  actions: [],
  customElevation: 'e200',
};
//# sourceMappingURL=ProfileCardResourced.js.map
