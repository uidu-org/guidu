import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ScrollToTopOnMount extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.scrollElement !== nextProps.scrollElement) {
      nextProps.scrollElement.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

ScrollToTopOnMount.propTypes = {
  scrollElement: PropTypes.element,
};

ScrollToTopOnMount.defaultProps = {
  scrollElement: null,
};
