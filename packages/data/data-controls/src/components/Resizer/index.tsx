import { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import React from 'react';
import { CheckCircle } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { ResizerProps } from './types';

export default function Resizer({ onResize, rowHeight }: ResizerProps) {
  return (
    <DropdownItemGroup>
      <DropdownItem
        onClick={(e) => {
          e.preventDefault();
          onResize(48);
        }}
        {...(rowHeight === 48
          ? {
              elemBefore: <CheckCircle size={14} className="text-success" />,
            }
          : null)}
      >
        <FormattedMessage defaultMessage="Compact" />
      </DropdownItem>
      <DropdownItem
        onClick={(e) => {
          e.preventDefault();
          onResize(64);
        }}
        {...(rowHeight === 64
          ? {
              elemBefore: <CheckCircle size={14} className="text-success" />,
            }
          : null)}
      >
        <FormattedMessage defaultMessage="Default" />
      </DropdownItem>
      <DropdownItem
        onClick={(e) => {
          e.preventDefault();
          onResize(72);
        }}
        {...(rowHeight === 72
          ? {
              elemBefore: <CheckCircle size={14} className="text-success" />,
            }
          : null)}
      >
        <FormattedMessage defaultMessage="Normal" />
      </DropdownItem>
      <DropdownItem
        onClick={(e) => {
          e.preventDefault();
          onResize(80);
        }}
        {...(rowHeight === 80
          ? {
              elemBefore: <CheckCircle size={14} className="text-success" />,
            }
          : null)}
      >
        <FormattedMessage defaultMessage="Extra" />
      </DropdownItem>
    </DropdownItemGroup>
  );
}
