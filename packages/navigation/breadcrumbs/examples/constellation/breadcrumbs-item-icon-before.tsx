import React from 'react';

import { FaceSmileIcon } from '@heroicons/react/24/solid';
import Breadcrumbs, { BreadcrumbsItem } from '../../src';

const TestIcon = <FaceSmileIcon label="Test icon" size="small" />;

export default function Example() {
  return (
    <Breadcrumbs>
      <BreadcrumbsItem iconBefore={TestIcon} text="Atlassian" />
    </Breadcrumbs>
  );
}
