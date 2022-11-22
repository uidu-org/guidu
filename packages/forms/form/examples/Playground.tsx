import { yupResolver } from '@hookform/resolvers/yup';
import { StyledAddon, StyledLabel, StyledRow } from '@uidu/field-base';
import { localUploadOptions } from '@uidu/media-core';
import * as React from 'react';
import { Calendar } from 'react-feather';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import Checkbox, { CheckboxGroup } from '../../checkbox/src';
import FieldColorPicker from '../../field-color-picker/src';
import FieldCounter from '../../field-counter/src';
import FieldDate from '../../field-date/src';
import FieldDownshift, {
  DownshiftCheckbox,
  DownshiftRadio,
} from '../../field-downshift/src';
import FieldFileUploader from '../../field-file-uploader/src';
import FieldGeosuggest from '../../field-geosuggest/src';
import FieldImageUploader from '../../field-image-uploader/src';
import FieldMentions from '../../field-mentions/src';
import FieldNumber from '../../field-number/src';
import FieldPassword from '../../field-password/src';
import FieldPhone from '../../field-phone/src';
import FieldRange from '../../field-range/src';
import FieldText from '../../field-text/src';
import FieldTextarea from '../../field-textarea/src';
import FieldTime from '../../field-time/src';
import { RadioGroup } from '../../radio/src';
import Select from '../../select/src';
import Form, { FormSection, FormSubmit } from '../src';
import { LayoutChoice } from './App';

interface Props {
  disabledChoice: boolean;
  layoutChoice: LayoutChoice;
  sectionLayoutChoice: LayoutChoice;
  validateBeforeSubmitChoice: boolean;
}

function Playground({
  disabledChoice,
  layoutChoice,
  sectionLayoutChoice,
}: Props) {
  const formRef = React.createRef<Form>();

  const resetForm = (): void => {
    console.log('Reset called'); // eslint-disable-line no-console
    if (formRef.current !== null) {
      const { formsyForm } = formRef.current;
      if (formsyForm.current !== null) {
        formsyForm.current.reset();
      }
    }
  };

  const schema = object({
    // fieldableId: string().required(),
    // fieldableType: string().required(),
    text1: string().required(),
  });

  const submitForm = async (data) => {
    console.log(data); // eslint-disable-line no-console
  };

  const radioOptions = [
    { id: 'a', name: 'Option A' },
    { id: 'b', name: 'Option B' },
    { id: 'c', name: 'Option C' },
  ];

  const radioOptionsDisabled = [
    { id: 'a', name: 'Option A' },
    { id: 'b', name: 'Option B', disabled: true },
    { id: 'c', name: 'Option C' },
  ];

  const optionY = {
    value: 'y',
    name: 'Option Y (yellow css class)',
    className: 'yellow',
  };
  optionY['data-note'] = 'This is a data attribute.';

  const selectOptions = [
    { id: 'a', name: 'Option A' },
    { id: 'a', name: 'Option A (again)' },
    { id: 'b', name: 'Option B' },
    {
      id: 'c',
      name: 'Option C',
      title: 'This is a title attribute for Option C',
    },
    { id: 'd', name: 'Option D', disabled: true },
    optionY,
    { id: 'e1', name: 'Option E-1', group: 'Option group E' },
    { id: 'e2', name: 'Option E-2', group: 'Option group E' },
  ];

  const singleSelectOptions = [
    // { id: '', name: 'Please select…' },
    ...selectOptions,
  ];

  const form = useForm({ mode: 'all', resolver: yupResolver(schema) });

  return (
    <Form
      handleSubmit={submitForm}
      layout={layoutChoice}
      className="custom-classname-is-rendered"
      ref={formRef}
      form={form}
      footerRenderer={(props) => (
        <FormSubmit {...props} canSubmit label="Submit" />
      )}
    >
      <FieldText name="secret" value="I'm hidden!" type="hidden" />
      <FormSection
        name="FieldText types"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        icon={Calendar}
        layout={sectionLayoutChoice}
        isFirst
      >
        <FieldText
          name="text1"
          id="artisanCraftedBespokeId"
          value=""
          label="Text"
          type="text"
          placeholder="Here is a text input."
          help="This is a required text input."
        />
        <FieldText
          name="email"
          value=""
          label="Email"
          type="email"
          autoComplete="off"
          placeholder="This is an email input."
          help="This email field should not autocomplete."
          rules={{
            required: 'This is a required field.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'This is not a valid email address.',
            },
          }}
        />
        <FieldPassword
          name="password1"
          value=""
          label="Password"
          type="password"
          validations="minLength:8"
          validationError="Your password must be at least 8 characters long."
          placeholder="Choose a password"
        />
        <FieldText
          name="password2"
          value=""
          label="Confirm password"
          type="password"
          validations="equalsField:password1"
          validationErrors={{
            equalsField: 'Passwords must match.',
          }}
          placeholder="Retype password"
        />
        <FieldColorPicker
          type="color"
          name="colour1"
          label="Colour input"
          value="#000000"
          rules={{
            validate: {
              equals: (v) =>
                v === '#000000' ||
                "You can have any color, as long as it's black.",
            },
          }}
        />
        <FieldRange
          type="range"
          name="range1"
          label="Range input"
          min={0}
          max={10}
          step={2}
        />
        <FieldDate
          name="date"
          value=""
          label="Date"
          type="date"
          placeholder="This is a date input."
          rules={{
            required: { value: true, message: 'This is a required field.' },
          }}
        />
        {/* <FieldDateRange
          name="date"
          value=""
          label="Date"
          type="date"
          placeholder="This is a date input."
        /> */}
        <FieldCounter
          name="counter"
          label="Counter"
          rules={{
            required: { value: true, message: 'Required field' },
            max: { value: 5, message: 'No more than 5' },
          }}
        />
        <FieldNumber name="number" label="Number" />
        <FieldGeosuggest name="geosuggest" label="Geosuggest" />
        <FieldImageUploader
          uploadOptions={localUploadOptions({
            endpoint: 'https://uidufundraising.uidu.local:8443/upload',
          })}
          name="image-uploader"
          label="Image"
        />
        <FieldFileUploader
          uploadOptions={localUploadOptions({
            endpoint: 'https://uidufundraising.uidu.local:8443/upload',
          })}
          name="file-uploader"
          label="File"
        />
        <FieldMentions
          name="mentions"
          label="Mentions"
          items={[{ trigger: '@', data: [] }]}
        />
        <FieldPhone name="phone" label="Phone number" country="US" />
        <FieldTime
          name="time"
          label="Time"
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
        />
      </FormSection>
      <FormSection
        name="Textarea"
        description={<p>This is a description of this form section</p>}
        layout={sectionLayoutChoice}
      >
        <FieldTextarea
          rows={3}
          cols={40}
          name="txtArea1"
          label="Textarea"
          placeholder="This field requires 10 characters."
          help="This is some help text for the textarea."
          rules={{
            required: { value: true, message: 'This is a required field.' },
            minLength: {
              value: 10,
              message: 'This field requires 10 characters.',
            },
          }}
        />
      </FormSection>
      <FormSection
        name="Select"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        layout={sectionLayoutChoice}
      >
        <Select
          name="select1"
          label="Select"
          help="This is a required select element."
          placeholder="Please select…"
          options={singleSelectOptions}
          isClearable
          rules={{
            required: { value: true, message: 'This is a required field.' },
          }}
        />
        <Select
          name="select2"
          value={['a', 'c']}
          label="Select (multiple)"
          help="Here, “Option A” and “Option C” are initially selected."
          options={selectOptions}
          isClearable
          multiple
        />
        <FieldDownshift
          label="Downshift 1"
          name="downshit1"
          options={selectOptions}
          option={DownshiftRadio}
        />
        <FieldDownshift
          label="Downshift 2"
          name="downshit2"
          options={selectOptions}
          option={DownshiftCheckbox}
          multiple
        />
      </FormSection>
      <FormSection
        name="Checkboxes"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        layout={sectionLayoutChoice}
      >
        <Checkbox
          name="checkbox123"
          label="Checkbox"
          help="This is a required checkbox element."
        />
        <Checkbox
          name="checkbox1"
          value
          label="Checkbox (single)"
          valueLabel="Check me out"
        />
        <CheckboxGroup
          name="checkboxGrp1"
          value={['a', 'c']}
          label="Checkbox group (stacked)"
          help="Here, “Option A” and “Option C” are initially selected."
          options={radioOptions}
        />
        <CheckboxGroup
          name="checkboxGrp2"
          label="Checkbox group (inline)"
          options={radioOptions}
          isInline
        />
      </FormSection>
      <FormSection
        name="RadioGroup"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        layout={sectionLayoutChoice}
      >
        <RadioGroup
          name="radioGrp1"
          value="b"
          label="Radio group (stacked)"
          help="Here, “Option B” is initially selected."
          options={radioOptions}
        />
        <RadioGroup
          name="radioGrp2"
          label="Radio group (inline)"
          help="This is a required radio group."
          options={radioOptions}
          isInline
        />
        <RadioGroup
          name="radioGrp3"
          label="Radio group (disabled)"
          help="Here, “Option B” is disabled."
          options={radioOptionsDisabled}
        />
      </FormSection>
      <FormSection
        name="Layout tweaks"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        layout={sectionLayoutChoice}
      >
        <FieldText
          name="cssRowTweak"
          value=""
          label="This row is yellow"
          type="text"
          placeholder="the rowClassName property is ‘yellow’"
          overrides={{
            StyledRow: {
              component: (props) => <StyledRow tw="bg-yellow-200" {...props} />,
            },
          }}
          help="You can modify the class name for the row."
        />
        <FieldText
          name="cssWrapperTweaks"
          value=""
          label="Label and element wrapper"
          type="text"
          placeholder="Label is ‘col-sm-5’, element-wrapper is ‘col-sm-7’"
          overrides={{
            StyledLabel: {
              component: (props) => (
                <StyledLabel tw="bg-yellow-200" {...props} />
              ),
            },
            RequiredSymbol: {
              props: {
                symbol: ' - Required',
              },
            },
          }}
          labelClassName={[{ 'col-sm-3': false }, 'col-sm-5']}
          help="The label and element-wrapper classes can be changed."
          required
        />
        <FieldText
          name="cssFieldTextTweaks"
          value=""
          label="Form control"
          type="text"
          className="border border-primary"
          placeholder="‘border border-primary’ is set on this input control."
          help="The className prop is passed through to the form control."
        />
      </FormSection>
      <FormSection
        name="disabled"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        layout={sectionLayoutChoice}
      >
        <FieldText
          name="disabled"
          value="This field is always disabled."
          label="Disabled"
          type="text"
          disabled
          help="The disabled prop on this component is set to true."
        />
      </FormSection>
      <FormSection
        name="FieldText groups"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        layout={sectionLayoutChoice}
        isLast
      >
        <FieldText
          name="addon-before"
          value=""
          label="Add-on before"
          type="text"
          tw="pl-10"
          addonsBefore={[
            <StyledAddon>
              <span tw="absolute inset-y-0 left-0 flex items-center pointer-events-none w-5 h-5">
                @
              </span>
            </StyledAddon>,
          ]}
        />
        <FieldText
          name="addon-after"
          value=""
          label="Add-on after"
          type="text"
          addonsAfter={[
            <StyledAddon>
              <span className="input-group-text">@example.com</span>
            </StyledAddon>,
          ]}
        />
        <FieldText
          name="button-before"
          value=""
          label="Button before"
          type="text"
          buttonBefore={
            <button className="btn btn-secondary" type="button">
              Go!
            </button>
          }
        />
        <FieldText
          name="button-after"
          value=""
          label="Button after"
          type="text"
          buttonAfter={
            <button className="btn btn-secondary" type="button">
              Go!
            </button>
          }
        />
      </FormSection>
    </Form>
  );
}

export default Playground;
