import React from 'react';
import PropTypes from 'prop-types';
import {
  DateInput,
  Input,
  InputFile,
  InputGeosuggest,
  InputNumber,
  DateTimeInput,
  Checkbox,
  Select,
  Textarea,
} from '@uidu/inputs';
import shuffle from 'lodash/shuffle';

import { singleOptionRenderer, multipleOptionRenderer } from 'utils/forms';

export default function FormsQuestion({ question, index, answers }) {
  const {
    id,
    label,
    required,
    formQuestionId,
    placeholder,
    hint: help,
    options,
    kind,
    preferences,
  } = question;

  const sharedProps = {
    key: `form-question-id-${id}`,
    label,
    name: `form_response[answers_attributes][${index}][value]`,
    required,
    placeholder,
    help,
    kind,
  };

  let answer = false;
  if (answers.filter(a => a.formQuestionId === formQuestionId).length > 0) {
    answer = answers.filter(a => a.formQuestionId === formQuestionId)[0];
  }

  const getValue = () => (answer ? answer.value : false);

  const selectProps = {
    options: preferences && preferences.shuffle ? shuffle(options) : options,
    value: getValue() || '',
    exposed: preferences && preferences.compact,
    shuffle: preferences && preferences.shuffle,
  };

  if (!preferences || !preferences.compact) {
    selectProps.optionRenderer =
      kind === 'multiple_choice'
        ? multipleOptionRenderer
        : singleOptionRenderer;
  }

  const renderInput = () => {
    switch (kind) {
      case 'checkbox':
        return (
          <div className="my-3">
            <Checkbox
              {...sharedProps}
              value={getValue() || false}
              layout="elementOnly"
            />
          </div>
        );
      case 'multiple_choice':
        return <Select {...sharedProps} {...selectProps} multi />;
      case 'single_choice':
        return <Select {...sharedProps} {...selectProps} />;
      case 'date':
        return <DateInput {...sharedProps} value={getValue() || false} />;
      case 'geocoder':
        return <InputGeosuggest {...sharedProps} value={getValue() || ''} />;
      case 'file':
        return <InputFile {...sharedProps} value={getValue() || false} />;
      case 'long_text':
        return (
          <Textarea
            {...sharedProps}
            className="form-control form-control-autosize"
            value={getValue() || ''}
          />
        );
      case 'number':
        return <InputNumber {...sharedProps} value={getValue() || null} />;
      case 'short_text':
        return <Input {...sharedProps} type="text" value={getValue() || ''} />;
      case 'time':
        return (
          <DateTimeInput
            {...sharedProps}
            type="text"
            value={getValue() || '13:00'}
          />
        );
      case 'email':
      case 'url':
      case 'tel':
        return <Input {...sharedProps} type={kind} value={getValue() || ''} />;
      default:
        return null;
    }
  };

  return [
    answer && (
      <Input
        key={`form-answer-id-${answer.id}`}
        type="hidden"
        name={`form_response[answers_attributes][${index}][id]`}
        value={answer.id}
      />
    ),
    <Input
      key={`form-question-question-id-${formQuestionId}`}
      type="hidden"
      name={`form_response[answers_attributes][${index}][form_question_id]`}
      value={formQuestionId}
    />,
    <Input
      key={`form-question-question-kind-${kind}`}
      type="hidden"
      name={`form_response[answers_attributes][${index}][kind]`}
      value={kind}
    />,
    renderInput(),
  ];
}

FormsQuestion.propTypes = {
  question: PropTypes.shape({
    label: PropTypes.string,
    required: PropTypes.bool,
    formQuestionId: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    kind: PropTypes.string,
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.object),
};

FormsQuestion.defaultProps = {
  answers: [],
};
