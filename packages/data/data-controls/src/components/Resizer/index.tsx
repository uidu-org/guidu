import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { CheckCircle, Maximize2 } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';

export default class Resizer extends Component<any> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onResize, rowHeight } = this.props;
    console.log(this.props);
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={false}>
            <Maximize2 strokeWidth={2} size={14} />
          </Trigger>
        }
        position="bottom left"
      >
        <DropdownItemGroup>
          <DropdownItem
            onClick={e => {
              e.preventDefault();
              onResize(36);
            }}
            {...(rowHeight === 36
              ? {
                  elemBefore: (
                    <CheckCircle size={14} className="text-success" />
                  ),
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
              onResize(48);
            }}
            {...(rowHeight === 48
              ? {
                  elemBefore: (
                    <CheckCircle size={14} className="text-success" />
                  ),
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
              onResize(60);
            }}
            {...(rowHeight === 60
              ? {
                  elemBefore: (
                    <CheckCircle size={14} className="text-success" />
                  ),
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
              onResize(72);
            }}
            {...(rowHeight === 72
              ? {
                  elemBefore: (
                    <CheckCircle size={14} className="text-success" />
                  ),
                }
              : null)}
          >
            <FormattedMessage
              id="guidu.data_controls.resizer.extra"
              defaultMessage="Extra"
            />
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    );
  }
}
