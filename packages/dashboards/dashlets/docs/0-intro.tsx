import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Dashlets
  Dashlets are dashboard components used to represent and analyze data.
  Dashlets are imagined either as single analytics dashlets (AnalyticsDashlets), that can be edited and filtered according to its type or layout elements (LayoutDashlets), used for arranging dashlets and design dashboards.
  It's a super powerful tool.

  ## AnalyticsDashlets
  These dashlets represent and manipulate data, when needed.

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
          <td>Timeline</td>
          <td>This a subset of XY charts with time into X axis.</td>
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

  ## LayoutDashlets
  With the help of these dashlets you can build amazing dashboards.

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
          <td>DashletGroup</td>
          <td>Creates a group (card) containing other dashlets</td>
        </tr>
        <tr>
          <td>HorizontalRule</td>
          <td>Adds an hr tag dashlet</td>
        </tr>
        <tr>
          <td>Spacer</td>
          <td>Empty component to insert spacing</td>
        </tr>
        <tr>
          <td>Text</td>
          <td>Adds an editable text dashlet</td>
        </tr>
        <tr>
          <td>VerticalRule</td>
          <td>Adds a vertical hr tag dashlet</td>
        </tr>
      </tbody>
    </table>
  )}

  ## Usage

  ${code`import Dashlets, { List, Pie, XYChart } from '@uidu/dashlets';`}

  ${(
    <Example
      packageName="@uidu/dashlets"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  You can pass \`data\` attribute to use same components without built-in manipulators. Each dashlet has different data requirements.

  ${(
    <Example
      packageName="@uidu/dashlets"
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
