import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

  Breadcrumbs are used for nested navigation, with each item acting as a link.
  There is a stateful default export that handles expansion of the collapse
  view, and passes other props on to the stateless export.

  Breadcrumbs or BreadcrumbsStateless are used as the wrapper component.
  BreadcrumbsItem is the rendering componet for each individual item in the
  list.

  ## Usage

  ${code`import Breadcrumbs, { BreadcrumbsItem } from '@uidu/breadcrumbs';`}

  or

  ${code`import { BreadcrumbsStateless, BreadcrumbsItem } from '@uidu/breadcrumbs';`}

  A BreadcrumbsStateless component with no items will not be rendered.

  ${(
    <Example
      packageName="@uidu/breadcrumbs"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/breadcrumbs"
      Component={require('../examples/8-expand').default}
      title="With Expand"
      source={require('!!raw-loader!../examples/8-expand')}
    />
  )}

  ${(
    <Props
      heading="Breadcrumbs Props"
      props={require('!!extract-react-types-loader!../src/components/Breadcrumbs')}
    />
  )}

  ${(
    <Props
      heading="BreadcrumbsStateless Props"
      props={require('!!extract-react-types-loader!../src/components/BreadcrumbsStateless')}
    />
  )}

  ${(
    <Props
      heading="BreadcrumbsItem Props"
      props={require('!!extract-react-types-loader!../src/components/BreadcrumbsItem')}
    />
  )}

`;
