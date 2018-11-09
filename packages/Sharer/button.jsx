import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SharerButton extends Component {
  isBrowser = () =>
    !(typeof document === 'undefined' || typeof window === 'undefined');

  constructUrl = () => {
    const { appId, message, url } = this.props;
    switch (this.props.provider) {
      case 'facebook':
        return `https://www.facebook.com/dialog/share?app_id=${encodeURIComponent(
          appId,
        )}&display=popup&caption=${encodeURIComponent(
          message,
        )}&mobile_iframe=true&href=${encodeURIComponent(
          url,
        )}&redirect_uri=${encodeURIComponent(url)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          message,
        )}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
          url,
        )}`;
      case 'google':
        return `https://plus.google.com/share?url=${encodeURIComponent(url)}`;
      default:
        return undefined;
    }
  };

  windowOpen = (url, name, height = 400, width = 550) => {
    const left =
      window.outerWidth / 2 +
      (window.screenX || window.screenLeft || 0) -
      width / 2;
    const top =
      window.outerHeight / 2 +
      (window.screenY || window.screenTop || 0) -
      height / 2;

    const config = {
      height,
      width,
      left,
      top,
      location: 'no',
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      centerscreen: 'yes',
      chrome: 'yes',
    };

    return window.open(
      url,
      name,
      Object.keys(config)
        .map(key => `${key}=${config[key]}`)
        .join(', '),
    );
  };

  click = e => {
    e.preventDefault();
    let url;
    if (this.isBrowser) {
      const result = this.constructUrl();
      if (typeof result === 'object') {
        url = result[0];
      } else {
        url = result;
      }
      this.windowOpen(url, 'foo');
    }
  };

  render() {
    return (
      <a
        tabIndex={0}
        role="button"
        onClick={this.click}
        className={this.props.className}
      >
        {this.props.children}
      </a>
    );
  }
}

SharerButton.propTypes = {
  provider: PropTypes.oneOf(['facebook', 'twitter', 'linkedin', 'google'])
    .isRequired,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  appId: PropTypes.number,
};

SharerButton.defaultProps = {
  appId: 341013092580493,
  className: 'btn',
};
