import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { TimeZoneSelect } from '../src';
import timezones from '../src/data/timezones';

export default function TimeZoneExample() {
  return (
    <FieldExampleScaffold
      component={TimeZoneSelect}
      placeholder="Timezone"
      defaultValue={timezones[0].tzCode}
    />
  );
}
