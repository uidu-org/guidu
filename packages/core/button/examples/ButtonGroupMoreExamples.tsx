import * as React from 'react';
import Button, { ButtonGroup } from '../src';

const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ padding: 8 }} {...props} />
);

export default () => (
  <Row>
    <Row>
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Row>
    <Row>
      <ButtonGroup>
        <Button appearance="primary">Alpha</Button>
        <Button appearance="default">Beta</Button>
        <Button appearance="warning">Delta</Button>
        <Button appearance="help">Delta</Button>
        <Button appearance="link">Delta</Button>
        <Button appearance="subtle-link">Gamma</Button>
      </ButtonGroup>
    </Row>
    <Row>
      <ButtonGroup appearance="subtle">
        <Button>Angular</Button>
        <Button>Ember</Button>
        <Button>React</Button>
      </ButtonGroup>
    </Row>
  </Row>
);
