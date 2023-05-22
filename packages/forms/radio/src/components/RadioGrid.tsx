import { noop, useController, Wrapper } from '@uidu/field-base';
import React, { ChangeEvent } from 'react';
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
  options,
  questions,
  name,
  onSetValue,
  onChange = noop,
  value: propValue,
  ...rest
}) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue: propValue,
    onChange,
    ...rest,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>, question) => {
    const { value } = e.currentTarget;
    const newValue = {
      ...field.value,
      [question.id]: value,
    };
    field.onChange(newValue);
    onChange(name, newValue);
  };

  const renderQuestion = (question) => (
    <tr key={question.id}>
      <th scope="row">{question.name}</th>
      {options.map((radio) => {
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
                onChange={(e) => handleChange(e, question)}
                // disabled={disabled}
              />
            </div>
          </td>
        );
      })}
    </tr>
  );

  const renderElement = () => (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="border-top-0" />
          {options.map((o) => (
            <th key={o.id} scope="col" className="text-center border-top-0">
              {o.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{questions.map(renderQuestion)}</tbody>
    </table>
  );

  return (
    <Wrapper {...wrapperProps}>
      <RadioGridWrapper>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="border-top-0" />
              {options.map((o) => (
                <th key={o.id} scope="col" className="text-center border-top-0">
                  {o.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{questions.map(renderQuestion)}</tbody>
        </table>
      </RadioGridWrapper>
    </Wrapper>
  );
}
