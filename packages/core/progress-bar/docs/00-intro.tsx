import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

  The progress bar is used to display progress of some process.

  Apart from default version it also has Success Progress Bar (gets green when value is 1) and Transparent Progress Bar to use on non-white backgrounds.

  ## Usage

  ${code`import ProgressBar, { SuccessProgressBar, TransparentProgressBar } from '@uidu/progress-bar';`}

  ${(
    <Example
      packageName="@uidu/progress-bar"
      Component={require('../examples/00-basic').default}
      source={require('!!raw-loader!../examples/00-basic')}
      title="Basic"
    />
  )}

  ${(
    <Example
      packageName="@uidu/progress-bar"
      Component={require('../examples/01-indeterminate').default}
      source={require('!!raw-loader!../examples/01-indeterminate')}
      title="Indeterminate"
    />
  )}

  ${(
    <Example
      packageName="@uidu/progress-bar"
      Component={require('../examples/02-success-progress-bar.tsx').default}
      source={require('!!raw-loader!../examples/02-success-progress-bar.tsx')}
      title="Success Progress Bar"
    />
  )}

  ${(
    <Example
      packageName="@uidu/progress-bar"
      Component={require('../examples/03-transparent-progress-bar').default}
      source={require('!!raw-loader!../examples/03-transparent-progress-bar')}
      title="Transparent Progress Bar"
    />
  )}

  ${(
    <Props
      heading="ProgressBar Props"
      props={require('!!extract-react-types-loader!../src/components/ProgressBar')}
    />
  )}
`;
