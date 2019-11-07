import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';
import { FormattedMessage } from 'react-intl';

export default class PickField extends Component<any, any> {
  static defaultProps = {
    isDefaultOpen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { columnDefs, list, onClick, label, isDefaultOpen } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <div
          className={`list-group-item px-3 px-xl-4 text-muted ${
            isDefaultOpen ? '' : 'list-group-item-action'
          }`}
          onClick={() => this.setState({ isOpen: true })}
        >
          {label} <ChevronDown size={16} />
        </div>
        {(isDefaultOpen || isOpen) &&
          columnDefs
            .filter(f => list.map(s => s.colId.colId).indexOf(f.colId) < 0)
            .map(columnDef => (
              <a
                href="#"
                className={`list-group-item list-group-item-action px-3 px-xl-4 d-flex align-items-center${
                  columnDef.hide ? ' disabled' : ''
                }`}
                key={columnDef.colId}
                onClick={e => {
                  e.preventDefault();
                  this.setState({ isOpen: false }, () => onClick(columnDef));
                }}
                {...(columnDef.hide ? { 'aria-disabled': true } : {})}
              >
                {columnDef.headerComponentParams && (
                  <span
                    style={{ width: 22, display: 'inline-block' }}
                    className="mr-2"
                  >
                    {columnDef.headerComponentParams.menuIcon}
                  </span>
                )}
                <div className="text-truncate flex-grow-1">
                  {columnDef.headerName}
                </div>
                {columnDef.hide && (
                  <span className="ml-auto small text-muted">
                    <FormattedMessage
                      defaultMessage="Hidden"
                      id="guidu.data-controls.pickField.hidden"
                    />
                  </span>
                )}
              </a>
            ))}
      </>
    );
  }
}
