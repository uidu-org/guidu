// @flow

import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext } from '../../index';

type FooProps = {
  alwaysRequired: string,
  optional?: string,
  requiredButHasDefault: string,
};
class Foo extends Component<FooProps> {
  static defaultProps = {
    requiredButHasDefault: 'default Yo',
  };
  render() {
    return null;
  }
}

/**
 * Foo
 */
<Foo alwaysRequired="always" />;

// $ExpectError - missing alwaysRequired
<Foo />;
// $ExpectError - requiredButHasDefault wrong type
<Foo alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<Foo alwaysRequired="always" optional={5} />;

/**
 * FooWithAnalyticsEvents
 */
const FooWithAnalyticsEvents = withAnalyticsEvents()(Foo);

<FooWithAnalyticsEvents alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithAnalyticsEvents />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithAnalyticsEvents alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithAnalyticsEvents alwaysRequired="always" optional={5} />;

/**
 * FooWithAnalyticsContext
 */
const FooWithAnalyticsContext = withAnalyticsContext()(Foo);

<FooWithAnalyticsContext alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithAnalyticsContext />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithAnalyticsContext alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithAnalyticsContext alwaysRequired="always" optional={5} />;

/**
 * FooWithAnalyticsEventsAndContext
 */
const FooWithAnalyticsEventsAndContext = withAnalyticsContext()(
  withAnalyticsEvents()(Foo),
);

<FooWithAnalyticsEventsAndContext alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithAnalyticsEventsAndContext />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithAnalyticsEventsAndContext
  alwaysRequired="always"
  requiredButHasDefault={5}
/>;
// $ExpectError - optional wrong type
<FooWithAnalyticsEventsAndContext alwaysRequired="always" optional={5} />;
