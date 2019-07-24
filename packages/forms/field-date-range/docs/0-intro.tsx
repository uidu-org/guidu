import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Field Date Range
  FieldDateRange uses \`react-day-picker\` to choose a date with an overlay. Useful for recent dates in its default export, as it doesn't allow for months/year selection. Likewise all other field components, it's wired into formsy hoc component.

  ## Usage

  ${code`import FieldDate, { FieldDateStateless } from '@uidu/field-date';`}

  ${(
    <Example
      packageName="@uidu/field-date-range"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="FieldDateRange Props"
      props={require('!!extract-react-types-loader!../src/components/FieldDateRangeStateless')}
    />
  )}
  `;
