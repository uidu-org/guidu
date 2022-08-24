import { FieldExampleScaffold } from '@uidu/field-base/examples-utils';
import React from 'react';
import { defaultOptions } from '../../select/examples-utils';
import { RadioGrid } from '../src';

export default function Grid() {
  return (
    <FieldExampleScaffold
      component={RadioGrid}
      defaultValue={[]}
      isInline
      options={defaultOptions.slice(0, 5)}
      questions={[
        { id: 1, name: 'Test question' },
        {
          id: 2,
          name: 'Lei dice che è solo stanchezza, ma secondo me non può essere.. vediamo i prossimi giorni come sta',
        },
      ]}
    />
  );
}
