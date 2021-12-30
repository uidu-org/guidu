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
              type="button"
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
    <ShellHeader tw="h-auto p-4 justify-between">
      <div tw="flex items-center space-x-3">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate('TODAY');
          }}
        >
          {messages.today}
        </Button>
        <ButtonGroup>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('PREV');
            }}
            iconBefore={<ChevronLeft size={16} />}
          />
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('NEXT');
            }}
            iconBefore={<ChevronRight size={16} />}
          />
        </ButtonGroup>
        <span tw="text-muted">{label}</span>
      </div>
      <div tw="flex items-center">{viewNamesGroup(messages)}</div>
    </ShellHeader>
  );
}
