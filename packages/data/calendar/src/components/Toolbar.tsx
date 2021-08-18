import Button, { ButtonGroup } from '@uidu/button';
import { ShellHeader } from '@uidu/shell';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default function Toolbar({
  views,
  localizer: { messages },
  label,
  onNavigate,
  onView,
  view,
}) {
  const navigate = (action) => {
    onNavigate(action);
  };

  const viewNamesGroup = (messages) => {
    if (views.length > 1) {
      return (
        <ButtonGroup>
          {views.map((name) => (
            <Button
              appearance={view === name ? 'primary' : 'default'}
              key={name}
              onClick={(e) => {
                e.preventDefault();
                onView(name);
              }}
            >
              {messages[name]}
            </Button>
          ))}
        </ButtonGroup>
      );
    }
  };

  return (
    <ShellHeader tw="justify-between p-3 h-auto">
      <div tw="flex items-center space-x-4">
        <Button
          className="btn btn-sm d-flex align-items-center btn-light"
          onClick={(e) => {
            e.preventDefault();
            navigate('TODAY');
          }}
        >
          {messages.today}
        </Button>
        <ButtonGroup>
          <Button
            iconAfter={<ChevronLeft size={18} />}
            onClick={(e) => {
              e.preventDefault();
              navigate('PREV');
            }}
          />
          <Button
            iconAfter={<ChevronRight size={18} />}
            onClick={(e) => {
              e.preventDefault();
              navigate('NEXT');
            }}
          />
        </ButtonGroup>
        <span tw="ml-2 text-gray-400">{label}</span>
      </div>
      <div tw="flex items-center ml-auto">{viewNamesGroup(messages)}</div>
    </ShellHeader>
  );
}
