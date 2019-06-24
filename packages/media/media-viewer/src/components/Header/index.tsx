import { colors } from '@uidu/theme';
import React from 'react';

export default ({ currentView, modalProps }) => {
  console.log(currentView);
  const { author, caption, createdAt, likes } = currentView;
  if (modalProps) {
    const { onClose } = modalProps;
  }

  const createdDate = new Date(createdAt).toLocaleDateString();

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        color: colors.N80,
        display: 'flex ',
        flex: '0 0 auto',
        height: 54,
        justifyContent: 'space-between',

        // [smallDevice]: {
        //   paddingLeft: 10,
        //   paddingRight: 10,
        // },
        // [largeDevice]: {
        //   paddingLeft: 20,
        //   paddingRight: 20,
        // },
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex ', minWidth: 0 }}>
        <img
          style={{
            borderRadius: 3,
            flexShrink: 0,
            height: 32,
            marginRight: 8,
            width: 32,
          }}
          src={author.avatar}
        />
        <div style={{ fontSize: '0.85em', minWidth: 0 }}>
          <div style={{ color: colors.N100, fontWeight: 500 }}>
            {author.name}
          </div>
          <div
            style={{
              color: colors.N60,
              marginTop: '0.25em',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{createdDate}</span>
            {caption ? <span> &mdash; {caption}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
