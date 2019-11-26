import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { PureComponent } from 'react';
import { CheckCircle } from 'react-feather';
import { FormattedMessage } from 'react-intl';

export type ResizerProps = {
  onResize: (rowHeight: number) => void;
  rowHeight: number;
};

export default class Resizer extends PureComponent<ResizerProps> {
  render() {
    const { onResize, rowHeight } = this.props;

    return (
      <DropdownItemGroup>
        <DropdownItem
          onClick={e => {
            e.preventDefault();
            onResize(48);
          }}
          {...(rowHeight === 48
            ? {
                elemBefore: <CheckCircle size={14} className="text-success" />,
              }
            : null)}
        >
          <FormattedMessage
            id="guidu.data_controls.resizer.compact"
            defaultMessage="Compact"
          />
        </DropdownItem>
        <DropdownItem
          onClick={e => {
            e.preventDefault();
            onResize(64);
          }}
          {...(rowHeight === 64
            ? {
                elemBefore: <CheckCircle size={14} className="text-success" />,
              }
            : null)}
        >
          <FormattedMessage
            id="guidu.data_controls.resizer.default"
            defaultMessage="Default"
          />
        </DropdownItem>
        <DropdownItem
          onClick={e => {
            e.preventDefault();
            onResize(72);
          }}
          {...(rowHeight === 72
            ? {
                elemBefore: <CheckCircle size={14} className="text-success" />,
              }
            : null)}
        >
          <FormattedMessage
            id="guidu.data_controls.resizer.normal"
            defaultMessage="Normal"
          />
        </DropdownItem>
        <DropdownItem
          onClick={e => {
            e.preventDefault();
            onResize(80);
          }}
          {...(rowHeight === 80
            ? {
                elemBefore: <CheckCircle size={14} className="text-success" />,
              }
            : null)}
        >
          <FormattedMessage
            id="guidu.data_controls.resizer.extra"
            defaultMessage="Extra"
          />
        </DropdownItem>
      </DropdownItemGroup>
    );
  }
}
