import React, { Component } from 'react';
import trunc from 'trunc-html';

export default class Expandable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
      text: this.truncate(props.limit * 60),
    };
  }

  truncate = limit => trunc(this.props.text, limit);

  expand = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      expanded: true,
      text: this.truncate(1000),
    });
  };

  render() {
    const { text, expanded } = this.state;

    const { className, limit } = this.props;

    return (
      <div>
        <this.props.tag
          className={className}
          dangerouslySetInnerHTML={{ __html: text.html }}
        />
        {!expanded &&
          text.text.length >= limit * 60 - 2 && (
            <a href="#" onClick={this.expand}>
              {window.I18n.t('utils.actions.read_more')}
            </a>
          )}
      </div>
    );
  }
}

Expandable.defaultProps = {
  limit: 4,
  expanded: false,
  className: '',
  tag: 'p',
  showTitle: true,
};
