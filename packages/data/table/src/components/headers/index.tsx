import React, { PureComponent } from 'react';
import { ChevronDown } from 'react-feather';

export default class CustomHeader extends PureComponent<any> {
  private button: React.RefObject<HTMLButtonElement> = React.createRef();

  render() {
    const { enableMenu, displayName, menuIcon, showColumnMenu } = this.props;
    return (
      <div
        className="ag-header-component d-flex align-items-center justify-content-center flex-grow-1"
        style={{ minWidth: 0 }}
      >
        <div className="customHeaderLabel flex-grow-1 text-truncate">
          {menuIcon && (
            <span className="mr-2 text-muted" style={{ opacity: 0.4 }}>
              {menuIcon}
            </span>
          )}
          {displayName}
        </div>
        {!!enableMenu && (
          <button
            type="button"
            className="btn btn-sm p-1"
            ref={this.button}
            onClick={() => showColumnMenu(this.button.current)}
          >
            <ChevronDown size={12} />
          </button>
        )}
      </div>
    );
  }
}
