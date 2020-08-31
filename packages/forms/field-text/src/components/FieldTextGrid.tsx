import { Wrapper } from '@uidu/field-base';
import React from 'react';

export default function FieldTextGrid({
  questions,
  name,
  onSetValue,
  onChange,
  value: propValue,
  ...rest
}) {
  const handleChange = (e, question) => {
    const { value } = e.currentTarget;
    const newValue = {
      ...propValue,
      [question.id]: value,
    };
    onSetValue(newValue);
    onChange(name, newValue);
  };

  const renderQuestions = () =>
    questions.map((question) => (
      <div key={question.id} className="form-group row">
        <label htmlFor={question.id} className="col-sm-3 col-form-label">
          {question.name}
        </label>
        <div className="col-sm-9">
          <input
            onChange={(e) => handleChange(e, question)}
            type="text"
            className="form-control"
            id={question.id}
            value={question.value}
          />
        </div>
      </div>
    ));

  return <Wrapper {...rest}>{renderQuestions()}</Wrapper>;
}
