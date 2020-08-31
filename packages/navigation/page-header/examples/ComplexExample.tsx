import { BreadcrumbsItem, BreadcrumbsStateless } from '@uidu/breadcrumbs';
import Button, { ButtonGroup } from '@uidu/button';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import Select from '@uidu/select';
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
          name="test2"
          placeholder="Choose an option"
          aria-label="Choose an option"
        />
      </div>
    </div>
  </Form>
);

export default () => (
  <PageHeader
    breadcrumbs={breadcrumbs}
    actions={actionsContent}
    bottomBar={barContent}
  >
    Title describing what the content should be, along with the context for
    which it applies — maybe also with some catchy words to draw attention
  </PageHeader>
);
