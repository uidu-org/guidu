import { ShellHeader } from '@uidu/shell';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default class Toolbar extends PureComponent<any> {
  render() {
    const { localizer, label } = this.props;
    const { messages } = localizer;

    return (
      <ShellHeader className="justify-content-between py-3 h-auto">
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-sm d-flex align-items-center btn-light"
            onClick={(e) => {
              e.preventDefault();
              this.navigate('TODAY');
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
                this.navigate('PREV');
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="btn btn-sm d-flex align-items-center px-2"
              onClick={(e) => {
                e.preventDefault();
                this.navigate('NEXT');
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <span className="ml-3 text-muted">{label}</span>
        </div>
        <div className="d-flex align-items-center">
          {this.viewNamesGroup(messages)}
        </div>
      </ShellHeader>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  };

  view = (view) => {
    this.props.onView(view);
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return (
        <div
          className="btn-group"
          role="group"
          aria-label="Switch calendar view"
        >
          {viewNames.map((name) => (
            <button
              className={classNames('btn btn-sm', {
                'btn-light': view !== name,
                'btn-primary': view === name,
              })}
              type="button"
              key={name}
              onClick={(e) => {
                e.preventDefault();
                this.view(name);
              }}
            >
              {messages[name]}
            </button>
          ))}
        </div>
      );
    }

    return null;
  }
}
