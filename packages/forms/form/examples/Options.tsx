/* eslint-env node, browser */

import { ScrollableContainer, ShellBody, ShellHeader } from '@uidu/shell';
import * as React from 'react';
import { CheckboxGroup } from '../../checkbox/src';
import { RadioGroup } from '../../radio/src';
import Form from '../src';

interface Props {
  disabledChoice: boolean;
  sectionLayoutChoice: 'horizontal' | 'vertical' | 'elementOnly';
  layoutChoice: 'horizontal' | 'vertical' | 'elementOnly';
  showing: boolean;
  validateBeforeSubmitChoice: boolean;
  validatePristineChoice: boolean;
  onChangeOption: (name: string, value) => void;
  onToggle: () => void;
}

const Options = ({
  disabledChoice,
  sectionLayoutChoice,
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
      <RadioGroup
        name="sectionLayout"
        label="Section Layout"
        value={sectionLayoutChoice}
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
    <>
      <ShellHeader className="border-bottom px-4 d-flex align-items-center">
        <h5 className="m-0">Options</h5>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary ml-auto"
          onClick={onToggle}
        >
          {showing ? 'Hide options' : 'Show options'}
        </button>
      </ShellHeader>
      <ShellBody>
        <ScrollableContainer>
          {showing ? <div className="card-body">{optionsForm}</div> : null}
        </ScrollableContainer>
      </ShellBody>
    </>
  );
};

export default Options;
