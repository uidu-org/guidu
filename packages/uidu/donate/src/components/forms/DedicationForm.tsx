import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import Select from '@uidu/select';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const dedicationTypes = [
  {
    id: 'inHonorOf',
    name: (
      <FormattedMessage
        defaultMessage="In honor of"
        id="guidu.donate.dedicationKinds.inHonorOf"
      />
    ),
  },
  {
    id: 'inMemoryOf',
    name: (
      <FormattedMessage
        defaultMessage="In memory of"
        id="guidu.donate.dedicationKinds.inMemoryOf"
      />
    ),
  },
  {
    id: 'inspiredBy',
    name: (
      <FormattedMessage
        defaultMessage="Inspired by"
        id="guidu.donate.dedicationKinds.inspiredBy"
      />
    ),
  },
];

export default function DedicationForm({ dedication }) {
  return (
    <>
      <Select
        name="dedication[kind]"
        options={dedicationTypes}
        label={
          <FormattedMessage
            defaultMessage="Dedication kind"
            id="guidu.donate.dedication.kind"
          />
        }
        required
      />
      <FieldText
        name="dedication[name]"
        label={
          <FormattedMessage
            defaultMessage="Dedication name"
            id="guidu.donate.dedication.name"
          />
        }
        required
      />
      <FieldText
        type="email"
        name="dedication[email]"
        label={
          <FormattedMessage
            defaultMessage="Dedication email"
            id="guidu.donate.dedication.email"
          />
        }
      />
      <FieldTextarea
        name="dedication[message]"
        label={
          <FormattedMessage
            defaultMessage="Dedication message"
            id="guidu.donate.dedication.message"
          />
        }
      />
    </>
  );
}
