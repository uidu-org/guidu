import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';
import ControlCommon from './controls/control-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.elements = {};
  }

  handleChange = e => {
    const { value } = e.currentTarget;
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  //   <label class="custom-control custom-radio">
  //   <input id="radio1" name="radio" type="radio" class="custom-control-input">
  //   <span class="custom-control-indicator"></span>
  //   <span class="custom-control-description">Toggle this custom radio</span>
  // </label>

  renderElement = () => {
    const { options, id, value } = this.props;
    const controls = options.map(radio => {
      const checked = value === radio.id.toString();
      const disabled = radio.disabled || this.props.disabled;
      return (
        <div
          className="custom-control custom-radio"
          key={[id, radio.id].join('-')}
        >
          <input
            id={[id, radio.id].join('-')}
            className="custom-control-input"
            ref={input => {
              this.elements[radio.id] = input;
            }}
            checked={checked}
            type="radio"
            value={radio.id}
            onChange={this.handleChange}
            disabled={disabled}
          />
          <label
            htmlFor={[id, radio.id].join('-')}
            className="custom-control-label"
          >
            {radio.name}
          </label>
        </div>
      );
    });
    if (this.props.type === 'stacked') {
      return <div className="custom-controls-stacked">{controls}</div>;
    }
    return controls;
  };

  render() {
    const element = this.renderElement();

    if (this.props.layout === 'elementOnly') {
      return <div>{element}</div>;
    }

    return (
      <Row {...this.props} fakeLabel>
        {element}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

RadioGroup.propTypes = {
  ...ControlCommon.propTypes,
  ...ComponentCommon.propTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      name: PropTypes.string,
      id: PropTypes.node,
    }),
  ),
  type: PropTypes.oneOf(['inline', 'stacked']),
};

RadioGroup.defaultProps = {
  ...ComponentCommon.defaultProps,
  type: 'stacked',
  options: [],
};
