import Drawer from '@uidu/drawer';
import { ShellBody, ShellHeader } from '@uidu/shell';
import { ToggleStateless } from '@uidu/toggle';
import React, { Component } from 'react';
import { EyeOff } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';

export default class Toggler extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    const { fields, onSortEnd, onToggle, api } = this.props;
    const hiddenCount = fields.filter(f => f.hide).length;

    const content = (
      <>
        <ShellHeader>Sorters</ShellHeader>
        <ShellBody scrollable>
          <div>
            {fields
              .filter(f => f.type !== 'primary' && f.type !== 'cover')
              .filter(f => !f.pinned)
              .map(field => (
                <div
                  key={field.colId}
                  onClick={e => {
                    onToggle(field.colId, !!field.hide);
                  }}
                  className="d-flex align-items-center py-1"
                >
                  <ToggleStateless
                    isChecked={!field.hide}
                    className="mr-2"
                    size="xsmall"
                  />
                  <div style={{ maxWidth: 160 }} className="text-truncate">
                    {field.headerComponentParams &&
                    field.headerComponentParams.menuIcon ? (
                      <small className="mr-2">
                        {field.headerComponentParams.menuIcon}
                      </small>
                    ) : null}
                    {field.headerName}
                  </div>
                </div>
              ))}
          </div>
        </ShellBody>
      </>
    );

    return (
      <>
        <Trigger
          activeBg="#d0f0fd"
          active={!!hiddenCount}
          className="btn mr-2"
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <EyeOff strokeWidth={2} size={14} className="mr-2" />
          <span style={{ textTransform: 'initial' }}>
            <FormattedMessage
              id="guidu.data_controls.sorter.label"
              defaultMessage={`{hiddenCount, plural,
                  =0 {Hide fields}
                  one {1 field hidden}
                  other {# fields hidden}
                }`}
              values={{ hiddenCount }}
            />
          </span>
        </Trigger>
        <Drawer
          isOpen={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          origin="right"
          size="medium"
        >
          {content}
        </Drawer>
      </>
    );
  }
}
