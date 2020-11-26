import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import Select from '@uidu/select';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const dedicationTypes = [
  {
    id: 'inHonorOf',
    name: <FormattedMessage defaultMessage="In honor of" />,
  },
  {
    id: 'inMemoryOf',
    name: <FormattedMessage defaultMessage="In memory of" />,
  },
  {
    id: 'inspiredBy',
    name: <FormattedMessage defaultMessage="Inspired by" />,
  },
];

export default function DedicationForm({ dedication }) {
  return (
    <>
      <Select
        name="dedication[kind]"
        options={dedicationTypes}
        label={<FormattedMessage defaultMessage="Dedication kind" />}
        required
      />
      <FieldText
        name="dedication[name]"
        label={<FormattedMessage defaultMessage="Dedication name" />}
        required
      />
      <FieldText
        type="email"
        name="dedication[email]"
        label={<FormattedMessage defaultMessage="Dedication email" />}
      />
      <FieldTextarea
        name="dedication[message]"
        label={<FormattedMessage defaultMessage="Dedication message" />}
      />
    </>
  );
}
