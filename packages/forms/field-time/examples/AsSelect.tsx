import { FieldExampleScaffold } from '@uidu/field-base/examples-utils';
import React from 'react';
import { IntlProvider } from 'react-intl';
import FieldTime from '../src';

export default function Basic() {
  return (
    <IntlProvider defaultLocale="it">
      <FieldExampleScaffold
        component={FieldTime}
        defaultValue="10:00"
        asSelect
      />
    </IntlProvider>
  );
}
