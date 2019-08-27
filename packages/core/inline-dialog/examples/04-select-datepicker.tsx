import Button from '@uidu/button';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';
import InlineDialog from '../src';

interface State {
  isDialogOpen: boolean;
}

export default class SingleSelectDialog extends Component<{}, State> {
  state = {
    isDialogOpen: true,
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  dialogClosed = () => {
    this.setState(prevState => ({ isDialogOpen: !prevState.isDialogOpen }));
  };

  render() {
    const options = [
      {
        name: 'value 1',
        id: 1,
      },
      {
        name: 'value 2',
        id: 2,
      },
    ];

    const content = (
      <div style={{ width: '300px' }}>
        <Form>
          <Select options={options} name="example" />
        </Form>
      </div>
    );

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div>
          <InlineDialog
            content={content}
            isOpen={this.state.isDialogOpen}
            onClose={this.dialogClosed}
          >
            <Button
              onClick={this.openDialog}
              isDisabled={this.state.isDialogOpen}
            >
              Open Dialog
            </Button>
          </InlineDialog>
        </div>
      </div>
    );
  }
}
