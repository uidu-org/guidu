/* eslint-env node, browser */

import Button from '@uidu/button';
import { ScrollableContainer, ShellBody, ShellHeader } from '@uidu/shell';
import * as React from 'react';
import { useForm } from 'react-hook-form';
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

function Options({
  disabledChoice,
  sectionLayoutChoice,
  layoutChoice,
  onChangeOption,
  onToggle,
  showing,
}: Props): JSX.Element {
  const form = useForm({ mode: 'all' });
  const optionsForm = (
    <Form form={form}>
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
      {/* <CheckboxGroup
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
      /> */}
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
      <ShellHeader tw="border-b flex items-center px-8">
        <h5 className="m-0">Options</h5>
        <Button type="button" tw="ml-auto" onClick={onToggle}>
          {showing ? 'Hide options' : 'Show options'}
        </Button>
      </ShellHeader>
      <ShellBody>
        <ScrollableContainer shadowOnScroll={false}>
          {showing ? <div tw="py-4 px-8">{optionsForm}</div> : null}
        </ScrollableContainer>
      </ShellBody>
    </>
  );
}

export default Options;
