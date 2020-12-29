import IconError from '@atlaskit/icon/glyph/cross-circle';
import AkButton from '@uidu/button';
import React from 'react';
import { ErrorText, ErrorTitle, ErrorWrapper } from '../styled/Error';

export default class ErrorMessage extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.renderNotFound = () =>
      React.createElement(
        ErrorTitle,
        null,
        'The user is no longer available for the site',
      );
    this.renderDefault = () =>
      React.createElement(
        ErrorTitle,
        null,
        'Oops, looks like we\u2019re having issues',
        React.createElement('br', null),
        this.props.reload
          ? React.createElement(
              ErrorText,
              null,
              'Try again and we\u2019ll give it another shot',
            )
          : null,
      );
    this.renderRetryButton = () =>
      this.props.reload
        ? React.createElement(
            AkButton,
            { appearance: 'link', onClick: this.props.reload },
            'Try again',
          )
        : null;
  }
  renderErrorContent() {
    const errorType = this.props.errorType || {
      reason: 'default',
    };
    switch (errorType.reason) {
      case 'NotFound':
        return this.renderNotFound();
      default:
        return this.renderDefault();
    }
  }
  render() {
    return React.createElement(
      ErrorWrapper,
      null,
      React.createElement(IconError, { label: 'icon error', size: 'xlarge' }),
      this.renderErrorContent(),
      this.renderRetryButton(),
    );
  }
}
ErrorMessage.defaultProps = {
  errorType: {
    reason: 'default',
  },
};
//# sourceMappingURL=ErrorMessage.js.map
