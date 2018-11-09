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

  renderQuestions = questions =>
    questions.map(question => (
      <div key={question.id} className="form-group row">
        <label htmlFor={question.id} className="col-sm-2 col-form-label">
          {question.label}
        </label>
        <div className="col-sm-10">
          <input
            onChange={e => this.handleChange(e, question)}
            type="text"
            className="form-control"
            id={question.id}
            value={question.value}
          />
        </div>
      </div>
    ));

  render() {
    const { layout, questions, help, showErrors, errorMessages } = this.props;

    const element = this.renderQuestions(questions);

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
