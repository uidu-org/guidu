import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
Pagination is helpful when you do not want to bloat your page by showing all the data at once. In this case we expect user to
navigate through different pages of the component.

## Usage:

${code`
import Pagination from '@uidu/pagination';
`}

${(
  <Example
    packageName="@uidu/pagination"
    Component={require('../examples/01-basic').default}
    title="Basic Pagination"
    source={require('!!raw-loader!../examples/01-basic').default}
  />
)}

## Advance Usage

### Passing in the <Link> component from react-router

You can replace parts of the pagination UI by passing in custom components.

The following will render the pagination component by replacing the @uidu/button
component with the <Link> component from react-router.

${(
  <Example
    packageName="@uidu/pagination"
    Component={require('../examples/02-with-react-router').default}
    title="Usage with react router"
    source={require('!!raw-loader!../examples/02-with-react-router').default}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/Pagination')}
    heading="Pagination props"
  />
)}
`;
