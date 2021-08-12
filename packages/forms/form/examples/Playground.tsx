import { localUploadOptions } from '@uidu/media-core';
import * as React from 'react';
import { Calendar } from 'react-feather';
import Checkbox, { CheckboxGroup } from '../../checkbox/src';
import FieldColorPicker from '../../field-color-picker/src';
import FieldCounter from '../../field-counter/src';
import FieldDateRange from '../../field-date-range/src';
import FieldDate from '../../field-date/src';
import FieldDownshift, {
  DownshiftCheckbox,
  DownshiftRadio,
} from '../../field-downshift/src';
import FieldFileUploader from '../../field-file-uploader/src';
import FieldGeosuggest from '../../field-geosuggest/src';
import FieldImageUploader from '../../field-image-uploader/src';
import FieldMentions from '../../field-mentions/src';
import FieldMonth from '../../field-month/src';
import FieldNumber from '../../field-number/src';
import FieldPassword from '../../field-password/src';
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
  validatePristineChoice: boolean;
}

const Playground: React.FunctionComponent<Props> = ({
  disabledChoice,
  layoutChoice,
  sectionLayoutChoice,
  validateBeforeSubmitChoice,
  validatePristineChoice,
}) => {
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
    { id: '', name: 'Please select…' },
    ...selectOptions,
  ];

  return (
    <Form
      handleSubmit={submitForm}
      layout={layoutChoice}
      className="custom-classname-is-rendered"
      validateBeforeSubmit={validateBeforeSubmitChoice}
      validatePristine={validatePristineChoice}
      // disabled={disabledChoice}
      ref={formRef}
      footerRenderer={(props) => (
        <FormSubmit {...props} canSubmit label="Submit" />
      )}
    >
      <FormSection
        name="FieldText types"
        description={
          <p className="text-muted">This is a fieldset description</p>
        }
        icon={Calendar}
        layout={sectionLayoutChoice}
        isFirst
      >
        <FieldText name="secret" value="I'm hidden!" type="hidden" />
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
          validations="isEmail"
          validationErrors={{
            isEmail: 'This doesn’t look like a valid email address.',
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
          validations="equals:#000000"
          validationError="You can have any color, as long as it's black."
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
        />
        <FieldDateRange
          name="date"
          value=""
          label="Date"
          type="date"
          placeholder="This is a date input."
          required
        />
        <FieldCounter name="counter" label="Counter" />
        <FieldNumber name="number" label="Number" />
        <FieldGeosuggest name="geosuggest" label="Geosuggest" />
        <FieldImageUploader
          uploadOptions={localUploadOptions({
            url: 'https://uidufundraising.uidu.local:8443/upload',
          })}
          name="image-uploader"
          label="Image"
        />
        <FieldFileUploader
          uploadOptions={localUploadOptions({
            url: 'https://uidufundraising.uidu.local:8443/upload',
          })}
          name="file-uploader"
          label="File"
        />
        <FieldMentions
          name="mentions"
          label="Mentions"
          items={[{ trigger: '@', data: [] }]}
        />
        <FieldMonth name="month" label="Months" />
        <FieldTime name="time" label="Time" />
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
          validations="minLength:10"
          validationErrors={{
            minLength: 'Please provide at least 10 characters.',
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
          options={singleSelectOptions}
        />
        <Select
          name="select2"
          value={['a', 'c']}
          label="Select (multiple)"
          help="Here, “Option A” and “Option C” are initially selected."
          options={selectOptions}
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
          type="inline"
          label="Checkbox group (inline)"
          options={radioOptions}
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
          type="inline"
          label="Radio group (inline)"
          help="This is a required radio group."
          options={radioOptions}
        />
        <RadioGroup
          name="radioGrp3"
          type="inline"
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
          rowClassName="yellow"
          help="You can modify the class name for the row."
        />
        <FieldText
          name="cssWrapperTweaks"
          value=""
          label="Label and element wrapper"
          type="text"
          placeholder="Label is ‘col-sm-5’, element-wrapper is ‘col-sm-7’"
          labelClassName={[{ 'col-sm-3': false }, 'col-sm-5']}
          elementWrapperClassName={[{ 'col-sm-9': false }, 'col-sm-7']}
          help="The label and element-wrapper classes can be changed."
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
          addonBefore={<span className="input-group-text">@</span>}
        />
        <FieldText
          name="addon-after"
          value=""
          label="Add-on after"
          type="text"
          addonAfter={<span className="input-group-text">@example.com</span>}
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
};

export default Playground;
