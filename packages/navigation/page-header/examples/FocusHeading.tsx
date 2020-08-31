import { BreadcrumbsItem, BreadcrumbsStateless } from '@uidu/breadcrumbs';
import Button from '@uidu/button';
import React, { useState } from 'react';
import PageHeader from '../src';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Some project" key="Some project" />
    <BreadcrumbsItem text="Parent page" key="Parent page" />
  </BreadcrumbsStateless>
);

const MyPageHeader = () => {
  const [ref, setRef] = useState<HTMLElement>();

  const onClick = () => {
    if (ref) {
      ref.focus();
    }
  };

  const innerRef = (element: HTMLElement) => {
    setRef(element);
  };

  return (
    <div>
      <Button onClick={onClick}>Focus on heading</Button>
      <PageHeader breadcrumbs={breadcrumbs} innerRef={innerRef}>
        Title describing the content
      </PageHeader>
    </div>
  );
};

export default () => <MyPageHeader />;
