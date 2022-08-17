import { colors, layers } from '@uidu/theme';
import React from 'react';
import { Search as SearchIcon } from 'react-feather';
import { components } from 'react-select';

// ==============================
// Styled Components
// ==============================

type MenuProps = {
  maxWidth: number;
  minWidth: number;
  children?: React.ReactNode;
  style?: any;
};

export function MenuDialog({ maxWidth, minWidth, ...props }: MenuProps) {
  const shadow = colors.N40A;
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        maxWidth,
        minWidth,
        zIndex: layers.layer(),
      }}
      {...props}
    />
  );
}

// ==============================
// Custom Components
// ==============================

function DropdownIndicator() {
  return (
    <div style={{ marginRight: 2, textAlign: 'center', width: 32 }}>
      <SearchIcon />
    </div>
  );
}

function Control({ innerRef, innerProps, ...props }: any) {
  return (
    <div ref={innerRef} style={{ padding: '8px 8px 4px' }}>
      <components.Control {...props} innerProps={innerProps} />
    </div>
  );
}

export function DummyControl(props: any) {
  return (
    <div
      style={{
        border: 0,
        clip: 'rect(1px, 1px, 1px, 1px)',
        height: 1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: 1,
      }}
    >
      <components.Control {...props} />
    </div>
  );
}
// NOTE `props` intentionally omitted from `Fragment`

function Menu({ key, children, innerProps, ...props }) {
  return <div {...innerProps}>{children}</div>;
}
export const defaultComponents = { Control, DropdownIndicator, Menu };
