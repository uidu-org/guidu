// @flow

import React from 'react';

import GlobalNavigation from '../../index';

<GlobalNavigation />;

// $ExpectError productIcon should be component
<GlobalNavigation productIcon="foo" />;

// $ExpectError isCreateDrawerOpen should be boolean
<GlobalNavigation isCreateDrawerOpen="foo" />;
