import React from 'react';
import { ArrowLeft, Menu } from 'react-feather';
import { Header, Resizer } from '../styled';

export default function({ isCollapsed, ...rest }) {
  return (
    <Resizer>
      <Header className="position-relative hoverable">
        <button
          className={`btn d-flex align-items-center justify-content-center position-absolute bg-white rounded-circle border${
            isCollapsed ? '' : ' d-hover'
          }`}
          style={{
            left: '50%',
            width: '24px',
            height: '24px',
            padding: '0',
          }}
          {...rest}
        >
          {isCollapsed ? <Menu size={14} /> : <ArrowLeft size={14} />}
        </button>
      </Header>
    </Resizer>
  );
}
