import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';
import ControlCommon from './controls/control-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class RadioGrid extends Component {
  constructor(props) {
    super(props);
    this.elements = {};
  }

  handleChange = (e, question) => {
    const { value } = e.currentTarget;
    const newValue = {
      ...this.props.value,
      [question.id]: value,
    };
    this.props.onSetValue(newValue);
    this.props.onChange(this.props.name, newValue);
  };

  renderQuestion = question => (
    <tr key={question.id}>
      <td>{question.name}</td>
      {this.props.options.map(radio => {
        const checked =
          this.props.value &&
          this.props.value[question.id] === radio.id.toString();
        const id = [question.id, radio.id].join('-');
        return (
          <td className="text-center" key={id}>
            <div className="form-check">
              <input
                id={id}
                className="form-check-input position-static"
                ref={input => {
                  this.elements[radio.id] = input;
                }}
                checked={checked}
                type="radio"
                value={radio.id}
                onChange={e => this.handleChange(e, question)}
                // disabled={disabled}
              />
            </div>
          </td>
        );
      })}
    </tr>
  );

  renderElement = (options, questions) => (
    <table className="table table-hover table-responsive">
      <thead>
        <tr>
          <th className="border-top-0" />
          {options.map(o => (
            <th key={o.id} scope="col" className="text-center border-top-0">
              {o.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{questions.map(this.renderQuestion)}</tbody>
    </table>
  );

  render() {
    const {
      layout,
      options,
      questions,
      help,
      showErrors,
      errorMessages,
    } = this.props;

    const element = this.renderElement(options, questions);

    if (layout === 'elementOnly') {
      return <div>{element}</div>;
    }

    return (
      <Row {...this.props} fakeLabel>
        {element}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
    );
  }
}

RadioGrid.propTypes = {
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

RadioGrid.defaultProps = {
  ...ComponentCommon.defaultProps,
  type: 'stacked',
  options: [],
};
