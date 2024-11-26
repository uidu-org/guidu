import { FaceSmileIcon } from '@heroicons/react/24/solid';
import React from 'react';

import Breadcrumbs, { BreadcrumbsItem } from '../../src';

const TestIcon = <FaceSmileIcon label="Test icon" size="small" />;

export default function Example() {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem iconAfter={TestIcon} text="Atlassian" />
    </Breadcrumbs>
  );
}
