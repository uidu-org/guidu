import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location, scrollElement } = this.props;
    if (location !== prevProps.location) {
      scrollElement.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  scrollElement: PropTypes.element,
  location: PropTypes.shape(PropTypes.obj).isRequired,
};

ScrollToTop.defaultProps = {
  scrollElement: window,
};
