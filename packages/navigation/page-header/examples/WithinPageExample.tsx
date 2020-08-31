import { BreadcrumbsItem, BreadcrumbsStateless } from '@uidu/breadcrumbs';
import Button, { ButtonGroup } from '@uidu/button';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import Select from '@uidu/select';
import Shell, { ShellMain } from '@uidu/shell';
import React from 'react';
import PageHeader from '../src';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Some project" key="Some project" />
    <BreadcrumbsItem text="Parent page" key="Parent page" />
  </BreadcrumbsStateless>
);
const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Primary Action</Button>
    <Button>Default</Button>
    <Button>...</Button>
  </ButtonGroup>
);
const barContent = (
  <Form>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 200px' }}>
        <FieldText name="test" placeholder="Filter" aria-label="Filter" />
      </div>
      <div style={{ flex: '0 0 200px', marginLeft: 8 }}>
        <Select
          name="test1"
          placeholder="Choose an option"
          aria-label="Choose an option"
        />
      </div>
    </div>
  </Form>
);

export default () => (
  <Shell>
    <ShellMain>
      <PageHeader
        breadcrumbs={breadcrumbs}
        actions={actionsContent}
        bottomBar={barContent}
      >
        Title for a Page Header within a page
      </PageHeader>
    </ShellMain>
  </Shell>
);
