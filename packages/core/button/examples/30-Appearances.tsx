import Checkbox from '@uidu/checkbox';
import Form, { useForm } from '@uidu/form';
import * as React from 'react';
import Button, { ButtonAppearances } from '../src';

const appearances: ButtonAppearances[] = [
  'default',
  'primary',
  'link',
  'subtle',
  'subtle-link',
  'warning',
  'danger',
];

const Table = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table' }} {...props} />
);
const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table-row' }} {...props} />
);
const Cell = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table-cell', padding: 4 }} {...props} />
);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export type State = {
  showLoadingState: boolean;
};

export default function ButtonAppearance() {
  const [showLoadingState, setShowLoadingState] = React.useState(null);
  const form = useForm({});

  return (
    <Form form={form} handleSubmit={console.log}>
      <div className="form-group">
        <Checkbox
          value="showLoading"
          label="Show Loading State"
          onChange={(name, value) => setShowLoadingState(value)}
          value={showLoadingState}
          name="show-loading"
        />
      </div>
      <Table>
        {appearances.map((a) => (
          <Row key={a}>
            <Cell>
              <Button isLoading={showLoadingState} appearance={a}>
                {capitalize(a)}
              </Button>
            </Cell>
            <Cell>
              <Button
                isLoading={showLoadingState}
                appearance={a}
                isDisabled={true}
              >
                Disabled
              </Button>
            </Cell>
            <Cell>
              <Button
                isLoading={showLoadingState}
                appearance={a}
                isSelected={true}
              >
                Selected
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>
    </Form>
  );
}
