import { faGripVertical, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FieldText from '@uidu/field-text';
import FieldToggle from '@uidu/field-toggle';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

export default class SingleSelectForm extends PureComponent<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      options: [{}],
    };
  }

  render() {
    const { options } = this.state;

    return (
      <>
        <div className="form-group">
          <FieldToggle name="withColor" label="With colors" />
          <FieldToggle name="sortAlphabetically" label="Sort alphabetically" />
        </div>
        <div className="form-group">
          <label htmlFor="">
            <FormattedMessage
              id="field.singleSelect.form.options"
              defaultMessage="Options"
            />
          </label>
          {options.map((option, index) => (
            <div className="d-flex align-items-center mb-2">
              <div className="mx-3">
                <FontAwesomeIcon icon={faGripVertical} />
              </div>
              <div className="flex-grow-1">
                <FormattedMessage
                  id="field.singleSelect.form.option.name"
                  defaultMessage="Insert option name"
                >
                  {placeholder => (
                    <FieldText
                      name={`options[${index}][name]`}
                      layout="elementOnly"
                      placeholder={placeholder}
                      className="form-control-sm"
                      autoFocus
                      required
                    />
                  )}
                </FormattedMessage>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-simple"
                onClick={() =>
                  this.setState(prevState => ({
                    options: [
                      ...prevState.options.slice(0, index),
                      ...prevState.options.slice(index + 1),
                    ],
                  }))
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-light btn-sm btn-block mt-3"
            onClick={() =>
              this.setState(prevState => ({
                options: [...prevState.options, {}],
              }))
            }
          >
            Add option
          </button>
        </div>
      </>
    );
  }
}
