/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Checkbox } from '@uidu/checkbox';
import { Form } from '@uidu/form';
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
  <div css={{ display: 'table' }} {...props} />
);
const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div css={{ display: 'table-row' }} {...props} />
);
const Cell = (props: React.HTMLProps<HTMLDivElement>) => (
  <div css={{ display: 'table-cell', padding: 4 }} {...props} />
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
      <Form handleSubmit={console.log}>
        <div className="form-group">
          <Checkbox
            value="showLoading"
            label="Show Loading State"
            onChange={(name, value) =>
              this.setState({
                showLoadingState: value,
              })
            }
            value={showLoadingState}
            name="show-loading"
          />
        </div>
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
      </Form>
    );
  }
}
