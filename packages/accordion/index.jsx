import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ChevronRight, ChevronUp, ChevronDown } from 'react-feather';

import { Collapse } from 'reactstrap';

// import './index.scss';

export default class Accordion extends PureComponent {
  constructor(props) {
    super(props);
    const { active } = props;
    this.state = {
      collapse: !active,
    };
  }

  toggle = e => {
    const { collapse } = this.state;
    e.stopPropagation();
    this.setState({ collapse: !collapse });
  };

  render() {
    const { collapse } = this.state;
    const { header, main, layout } = this.props;

    return [
      <a
        tabIndex={-1}
        aria-expanded={!collapse}
        className="list-group-item d-flex align-items-center justify-content-between px-3 accordion-header text-medium"
        role="tab"
        onClick={this.toggle}
      >
        <div className="order-1 w-100">{header}</div>
        <div className={`order-${layout === 'right' ? '2' : '0'}`}>
          {collapse ? (
            layout === 'right' ? (
              <ChevronDown className="ml-2" />
            ) : (
              <ChevronRight className="mr-2" />
            )
          ) : layout === 'right' ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="mr-2" />
          )}
        </div>
      </a>,
      <Collapse isOpen={!collapse}>{main}</Collapse>,
    ];
  }
}

Accordion.propTypes = {
  active: PropTypes.bool,
  layout: PropTypes.oneOf(['left', 'right']),
  header: PropTypes.node.isRequired,
  main: PropTypes.node.isRequired,
};

Accordion.defaultProps = {
  active: false,
  layout: 'left',
};
