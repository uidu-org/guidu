import * as React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { Checkbox } from '@uidu/checkbox';
import Button, { ButtonAppearances } from '../src';

const appearances: ButtonAppearances[] = [
  'default',
  'primary',
  'link',
  'subtle',
  'subtle-link',
  'warning',
  'danger',
  'help',
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

export default class ButtonAppearance extends React.Component<{}, State> {
  state = { showLoadingState: false };

  render() {
    const { showLoadingState } = this.state;

    return (
      <React.Fragment>
        <Form {...formDefaultProps}>
          <Checkbox
            name="showLoadingState"
            value="showLoading"
            label="Show Loading State"
            onChange={(name, value) =>
              this.setState({
                [name]: value,
              })
            }
          />
        </Form>
        <Table>
          {appearances.map(a => (
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
      </React.Fragment>
    );
  }
}
