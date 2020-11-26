import { ShellHeader } from '@uidu/shell';
import classNames from 'classnames';
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
        <div
          className="btn-group"
          role="group"
          aria-label="Switch calendar view"
        >
          {views.map((name) => (
            <button
              className={classNames('btn btn-sm', {
                'btn-light': view !== name,
                'btn-primary': view === name,
              })}
              type="button"
              key={name}
              onClick={(e) => {
                e.preventDefault();
                onView(name);
              }}
            >
              {messages[name]}
            </button>
          ))}
        </div>
      );
    }
  };

  return (
    <ShellHeader className="justify-content-between p-3 h-auto">
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-sm d-flex align-items-center btn-light"
          onClick={(e) => {
            e.preventDefault();
            navigate('TODAY');
          }}
        >
          {messages.today}
        </button>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-sm d-flex align-items-center px-2"
            onClick={(e) => {
              e.preventDefault();
              navigate('PREV');
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="btn btn-sm d-flex align-items-center px-2"
            onClick={(e) => {
              e.preventDefault();
              navigate('NEXT');
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <span className="ml-3 text-muted">{label}</span>
      </div>
      <div className="d-flex align-items-center">
        {viewNamesGroup(messages)}
      </div>
    </ShellHeader>
  );
}
