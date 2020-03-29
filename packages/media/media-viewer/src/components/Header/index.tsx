import Avatar, { AvatarItem } from '@uidu/avatar';
import Button from '@uidu/button';
import { ShellHeader } from '@uidu/shell';
import { colors } from '@uidu/theme';
import React from 'react';
import { X } from 'react-feather';

export default function Header({ currentView, onClose }) {
  const { author, caption, createdAt } = currentView;
  const createdDate = new Date(createdAt).toLocaleDateString();
  return (
    <ShellHeader className="px-3 pr-xl-4 bg-white border-bottom justify-content-between">
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          minWidth: 0,
        }}
      >
        <AvatarItem
          avatar={<Avatar src={author.avatar} />}
          primaryText={author.name}
          secondaryText={
            <>
              <span>{createdDate}</span>
              {caption ? <span> &mdash; {caption}</span> : null}
            </>
          }
        />
      </div>
      <div className="d-flex align-items-center">
        {onClose && (
          <Button
            onClick={onClose}
            style={{
              borderLeft: `1px solid ${colors.N10}`,
              paddingLeft: 10,
            }}
          >
            <X />
          </Button>
        )}
      </div>
    </ShellHeader>
  );
}
