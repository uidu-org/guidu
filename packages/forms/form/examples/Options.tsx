/* eslint-env node, browser */

import * as React from 'react';
import Form from '../src';
import { CheckboxGroup } from '../../checkbox/src';
import { RadioGroup } from '../../radio/src';

interface Props {
  disabledChoice: boolean;
  layoutChoice: 'horizontal' | 'vertical' | 'elementOnly';
  showing: boolean;
  validateBeforeSubmitChoice: boolean;
  validatePristineChoice: boolean;
  onChangeOption: (name: string, value) => void;
  onToggle: () => void;
}

const Options = ({
  disabledChoice,
  layoutChoice,
  onChangeOption,
  onToggle,
  showing,
  validateBeforeSubmitChoice,
  validatePristineChoice,
}: Props): JSX.Element => {
  const optionsForm = (
    <Form>
      <RadioGroup
        name="layout"
        label="Layout"
        value={layoutChoice}
        options={[
          { id: 'horizontal', name: 'horizontal' },
          { id: 'vertical', name: 'vertical' },
          { id: 'elementOnly', name: 'elementOnly' },
        ]}
        onChange={onChangeOption}
      />
      <CheckboxGroup
        name="validationOptions"
        options={[
          { id: 'validatePristine', name: 'validatePristine' },
          { id: 'validateBeforeSubmit', name: 'validateBeforeSubmit' },
        ]}
        value={[
          validatePristineChoice ? 'validatePristine' : '',
          validateBeforeSubmitChoice ? 'validateBeforeSubmit' : '',
        ]}
        label="Validation options"
        onChange={onChangeOption}
      />
      <CheckboxGroup
        name="elementOptions"
        options={[{ id: 'disabled', name: 'disabled' }]}
        value={[disabledChoice ? 'disabled' : '']}
        label="Element options"
        onChange={onChangeOption}
      />
    </Form>
  );

  return (
    <div className="card bg-light">
      <div className="card-header">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onToggle}
        >
          {showing ? 'Hide options' : 'Show options'}
        </button>
      </div>
      {showing ? <div className="card-body">{optionsForm}</div> : null}
    </div>
  );
};

export default Options;
