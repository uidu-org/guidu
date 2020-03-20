import { Wrapper } from '@uidu/field-base';
import React from 'react';
import styled from 'styled-components';

const RadioGridWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: visible;
  /* width: 250px; */
  /* margin-left: 120px; */
  table {
    table-layout: fixed;
  }

  td,
  th {
    /* padding: 5px 20px; */
    width: 100px;
  }

  th:first-child {
    /* position: fixed; */
    width: 340px;
  }
`;

export default function RadioGrid({
  layout,
  options,
  questions,
  help,
  showErrors,
  errorMessages,
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

  const renderQuestion = question => (
    <tr key={question.id}>
      <th scope="row">{question.name}</th>
      {options.map(radio => {
        const checked =
          propValue && propValue[question.id] === radio.id.toString();
        const id = [question.id, radio.id].join('-');
        return (
          <td className="text-center" key={id}>
            <div className="form-check">
              <input
                id={id}
                className="form-check-input position-static"
                defaultChecked={checked}
                type="radio"
                value={radio.id}
                onChange={e => handleChange(e, question)}
                // disabled={disabled}
              />
            </div>
          </td>
        );
      })}
    </tr>
  );

  const renderElement = (options, questions) => (
    <table className="table table-hover">
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
      <tbody>{questions.map(renderQuestion)}</tbody>
    </table>
  );

  const element = renderElement(options, questions);

  return (
    <Wrapper {...rest}>
      <RadioGridWrapper>{element}</RadioGridWrapper>
    </Wrapper>
  );
}
