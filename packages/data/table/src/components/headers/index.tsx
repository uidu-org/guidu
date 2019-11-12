import React, { PureComponent } from 'react';

export default class CustomHeader extends PureComponent<any> {
  render() {
    const { enableMenu, displayName, menuIcon } = this.props;
    console.log(this.props);

    return (
      <div
        className="ag-header-component d-flex align-items-center justify-content-center flex-grow-1"
        style={{ minWidth: 0 }}
      >
        <div className="customHeaderLabel flex-grow-1 text-truncate">
          {menuIcon && (
            <span className="mr-2" style={{ opacity: 0.5 }}>
              {menuIcon}
            </span>
          )}
          {displayName}
        </div>
        {/* {!!enableMenu ? (
          <InlineDialog
            // isMenuFixed
            isOpen
            content={<div>Funziona ora?</div>}
            placement="bottom"
          >
            <button className="btn p-1">
              <ChevronDown size={16} />
            </button>
          </InlineDialog>
        ) : (
          <Lock size={14} />
        )} */}
      </div>
    );
  }
}
