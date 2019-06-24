import React from 'react';
import { Play } from 'react-feather';

export default ({ poster, onClick }) => (
  <div
    role="img"
    style={{
      backgroundColor: '#eee',
      backgroundImage: `url(${poster})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      boxSizing: 'border-box',
      backgroundPosition: 'center',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      position: 'absolute',
    }}
  >
    <button
      onClick={onClick}
      type="button"
      style={{
        background: 0,
        border: 0,
        color: 'white',
        cursor: 'pointer',
        padding: 0,
        height: 64,
        left: '50%',
        marginLeft: -32,
        marginTop: -32,
        opacity: 0.66,
        outline: 0,
        position: 'absolute',
        top: '50%',
        transition: 'opacity 200ms',
        width: 64,

        // ':hover': { opacity: 1 },
      }}
    >
      <Play />
    </button>
  </div>
);
