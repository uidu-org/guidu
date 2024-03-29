import { BreadcrumbsItem, BreadcrumbsStateless } from '@uidu/breadcrumbs';
import React from 'react';
import PageHeader from '../src';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Some project" key="Some project" />
    <BreadcrumbsItem text="Parent page" key="Parent page" />
  </BreadcrumbsStateless>
);

export default () => (
  <PageHeader breadcrumbs={breadcrumbs} tw="border-b">
    Title describing the content
  </PageHeader>
);
