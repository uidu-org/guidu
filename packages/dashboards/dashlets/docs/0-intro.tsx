import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import dashlets from '..';

console.log(dashlets);

export default md`
  ### Dashlets
  <p class="lead">Dashlets for building dashboards</p>

  Dashlets are dashboard components used to represent and analyze data.
  Dashlets are imagined either as single analytics dashlets (AnalyticsDashlets), that can be edited and filtered according to its type or layout elements (LayoutDashlets), used for arranging dashlets and design dashboards.
  It's a super powerful tool.

  <div class="my-5"></div>

  #### AnalyticsDashlets
  These dashlets represent and manipulate data, when needed.

  ${(
    <IntlProvider>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {dashlets.map(({ id, icon: Icon, name, description, color }) => (
            <tr>
              <td className="text-nowrap">
                <code>{id}</code>
              </td>
              <td className="text-nowrap">
                <div className="d-flex align-items-center">
                  <span className="mr-2 d-flex">
                    <Icon size={16} color={color} />
                  </span>
                  {name}
                </div>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </IntlProvider>
  )}

  <div class="my-5"></div>

  #### LayoutDashlets
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
