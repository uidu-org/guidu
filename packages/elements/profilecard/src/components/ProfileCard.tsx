import Avatar from '@uidu/avatar';
import Button from '@uidu/button';
import Lozenge from '@uidu/lozenge';
import Spinner from '@uidu/spinner';
import { N0 } from '@uidu/theme/colors';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AnalyticsName } from '../internal/analytics';
import relativeDate from '../internal/relative-date';
import messages from '../messages';
import {
  ActionButtonGroup,
  ActionsFlexSpacer,
  AppTitleLabel,
  CardContainer,
  CardContent,
  CardElevationWrapper,
  DetailsGroup,
  DisabledInfo,
  FullNameLabel,
  JobTitleLabel,
  LozengeWrapper,
  ProfileImage,
  SpinnerContainer,
} from '../styled/Card';
import ErrorMessage from './ErrorMessage';
import IconLabel from './IconLabel';

export default class Profilecard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.durationSince = (from) => {
      const fromParsed = from || 0;
      return fromParsed > 0 ? Date.now() - fromParsed : null;
    };

    this.callClientFetchProfile = (...args) => {
      if (this.props.clientFetchProfile) {
        this.props.clientFetchProfile(...args);
      }
    };

    this.callAnalytics = (id, options) => {
      if (this.props.analytics) {
        this.props.analytics(id, options);
      }
    };

    this.timeOpen = null;

    this.clientFetchProfile = (...args) => {
      this.callAnalytics(AnalyticsName.PROFILE_CARD_RELOAD, {});
      this.callClientFetchProfile(...args);
    };
  }
  componentDidMount() {
    this.timeOpen = Date.now();
    this.callAnalytics(AnalyticsName.PROFILE_CARD_VIEW, {});
  }

  renderErrorMessage() {
    return React.createElement(ErrorMessage, {
      reload: this.props.clientFetchProfile && this.clientFetchProfile,
      errorType: this.props.errorType,
    });
  }

  renderActionsButtons() {
    if (this.props.actions && this.props.actions.length === 0) {
      return null;
    }
    return React.createElement(
      ActionButtonGroup,
      null,
      this.props.actions &&
        this.props.actions.map((action, idx) =>
          React.createElement(
            Button,
            {
              appearance: idx === 0 ? 'default' : 'subtle',
              key: action.label,
              onClick: (...args) => {
                this.callAnalytics(AnalyticsName.PROFILE_CARD_CLICK, {
                  id: action.id || null,
                  duration: this.durationSince(this.timeOpen),
                });
                if (action.callback) {
                  args[0].preventDefault();
                  action.callback(...args);
                }
              },
              href: action.link,
            },
            action.label,
          ),
        ),
    );
  }
  renderCardDetailsDefault() {
    const { meta, location, email, timestring, companyName } = this.props;
    return React.createElement(
      DetailsGroup,
      null,
      this.renderFullNameAndPublicName(meta),
      meta && React.createElement(JobTitleLabel, null, meta),
      React.createElement(IconLabel, { icon: 'email' }, email),
      React.createElement(IconLabel, { icon: 'time' }, timestring),
      React.createElement(IconLabel, { icon: 'companyName' }, companyName),
      React.createElement(IconLabel, { icon: 'location' }, location),
    );
  }
  renderCardDetailsForDisabledAccount() {
    const { status, companyName, hasDisabledAccountLozenge } = this.props;
    return React.createElement(
      DetailsGroup,
      null,
      React.createElement(
        FullNameLabel,
        { noMeta: true, isDisabledAccount: true },
        this.getDisabledAccountName(),
      ),
      hasDisabledAccountLozenge &&
        React.createElement(
          LozengeWrapper,
          null,
          React.createElement(
            Lozenge,
            { appearance: 'default', isBold: true },
            status === 'inactive' &&
              React.createElement(
                FormattedMessage,
                Object.assign({}, messages.inactiveAccountMsg),
              ),
            status === 'closed' &&
              React.createElement(
                FormattedMessage,
                Object.assign({}, messages.closedAccountMsg),
              ),
          ),
        ),
      React.createElement(DisabledInfo, null, this.getDisabledAccountDesc()),
      status === 'inactive' &&
        React.createElement(IconLabel, { icon: 'companyName' }, companyName),
    );
  }
  getDisabledAccountName() {
    const { nickname, fullName, status } = this.props;
    if (status === 'inactive') {
      return fullName || nickname;
    } else if (status === 'closed') {
      return (
        nickname ||
        React.createElement(
          FormattedMessage,
          Object.assign({}, messages.disabledAccountDefaultName),
        )
      );
    }
    return null;
  }
  getDisabledAccountDesc() {
    const {
      status = 'closed',
      statusModifiedDate,
      disabledAccountMessage,
    } = this.props;
    const date = statusModifiedDate
      ? new Date(statusModifiedDate * 1000)
      : null;
    const relativeDateKey = relativeDate(date);
    // consumer does not want to use built-in message
    if (disabledAccountMessage) {
      return disabledAccountMessage;
    }
    let secondSentence = null;
    if (relativeDateKey) {
      secondSentence = React.createElement(
        FormattedMessage,
        // @ts-ignore
        Object.assign(
          {},
          messages[`${status}AccountDescMsgHasDate${relativeDateKey}`],
        ),
      );
    } else {
      secondSentence =
        // @ts-ignore
        React.createElement(
          FormattedMessage,
          Object.assign({}, messages[`${status}AccountDescMsgNoDate`]),
        );
    }
    return React.createElement(
      'p',
      null,
      React.createElement(
        FormattedMessage,
        Object.assign({}, messages.generalDescMsgForDisabledUser),
      ),
      ' ',
      secondSentence,
    );
  }
  renderFullNameAndPublicName(meta) {
    const { nickname, fullName } = this.props;
    if (!fullName && !nickname) {
      return null;
    }
    const displayName =
      fullName === nickname
        ? fullName
        : `${fullName}${nickname ? ` (${nickname}) ` : ''}`;
    return React.createElement(FullNameLabel, { noMeta: !meta }, displayName);
  }
  renderCardDetailsApp() {
    return React.createElement(
      DetailsGroup,
      null,
      this.renderFullNameAndPublicName(),
      React.createElement(AppTitleLabel, null, 'App'),
    );
  }
  renderCardDetails() {
    const { isBot, status } = this.props;
    if (isBot) {
      return this.renderCardDetailsApp();
    }
    if (status === 'inactive' || status === 'closed') {
      return this.renderCardDetailsForDisabledAccount();
    }
    return this.renderCardDetailsDefault();
  }
  render() {
    const { fullName, status, customElevation } = this.props;
    let cardContent = null;
    // @FIXME do closed users have empty fullName field?
    const canRender = fullName || status === 'closed';
    if (this.props.hasError) {
      this.callAnalytics(AnalyticsName.PROFILE_CARD_ERROR, {});
      cardContent = this.renderErrorMessage();
    } else if (this.props.isLoading) {
      cardContent = React.createElement(
        SpinnerContainer,
        null,
        React.createElement(Spinner, null),
      );
    } else if (canRender) {
      const isDisabledUser = status === 'inactive' || status === 'closed';
      const actions = this.renderActionsButtons();
      this.callAnalytics(AnalyticsName.PROFILE_CARD_LOADED, {
        duration: this.durationSince(this.timeOpen),
      });
      cardContent = React.createElement(
        CardContainer,
        { isDisabledUser: isDisabledUser },
        React.createElement(
          ProfileImage,
          null,
          React.createElement(Avatar, {
            size: 'xlarge',
            src:
              this.props.status !== 'closed' ? this.props.avatarUrl : undefined,
            borderColor: N0,
          }),
        ),
        React.createElement(
          CardContent,
          null,
          this.renderCardDetails(),
          actions
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(ActionsFlexSpacer, null),
                actions,
              )
            : null,
        ),
      );
    }
    return React.createElement(
      CardElevationWrapper,
      { customElevation: customElevation },
      cardContent,
    );
  }
}
Profilecard.defaultProps = {
  isLoading: false,
  hasError: false,
  errorType: null,
  status: 'active',
  isBot: false,
  isNotMentionable: false,
  actions: [],
  hasDisabledAccountLozenge: true,
  customElevation: 'e200',
  analytics: () => null,
  clientFetchProfile: () => null,
};
//# sourceMappingURL=ProfileCard.js.map
