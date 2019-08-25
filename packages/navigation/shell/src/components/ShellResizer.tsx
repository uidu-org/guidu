import React from 'react';
import { ArrowLeft, Menu } from 'react-feather';
import { Header, Resizer } from '../styled';

export default function({ isCollapsed, onClick, ...rest }) {
  return (
    <Resizer className="hoverable" onClick={onClick}>
      <Header className="position-relative">
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
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          onMouseDown={e => e.stopPropagation()}
          {...rest}
        >
          {isCollapsed ? <Menu size={14} /> : <ArrowLeft size={14} />}
        </button>
      </Header>
    </Resizer>
  );
}
