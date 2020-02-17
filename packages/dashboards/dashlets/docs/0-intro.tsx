import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Dashlets
  Dashlets are dashboard components used to represent and analyze data. Dashlets are imagined as single analytics blocks, that can be edited and filtered according to its type.

  ${(
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Counter</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>Funnel</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>Map</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>List</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>Pie</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>Radial</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>Treemap</td>
          <td>Short description</td>
        </tr>
        <tr>
          <td>XY Chart</td>
          <td>
            Inspired by{' '}
            <a
              href="https://www.amcharts.com/docs/v4/chart-types/xy-chart/"
              target="_blank"
            >
              Amcharts
            </a>{' '}
            allows to create bar, line and area charts.
          </td>
        </tr>
      </tbody>
    </table>
  )}

  ## Usage

  ${code`import Stepper, { Step } from '@uidu/stepper';`}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  You can pass \`data\` attribute to use same components without built-in manipulators. Each block has different data requirements.

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/SingleDashlets').default}
      title="Single Dashlet"
      source={require('!!raw-loader!../examples/SingleDashlets').default}
    />
  )}

  ${(
    <Props
      heading="Dashlets"
      props={require('!!extract-react-types-loader!../src/components/Dashlets')}
    />
  )}
`;
