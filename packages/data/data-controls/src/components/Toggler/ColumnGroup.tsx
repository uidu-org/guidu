import { CheckboxStateless } from '@uidu/checkbox';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { FormattedMessage } from 'react-intl';

export default function ColumnGroup({
  columnGroupObj,
  columns,
  checkedColumnsCount,
  gridColumnApi,
  isGroupChecked,
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="list-group list-group-flush mb-3">
      <li className="list-group-item px-3 px-xl-4 border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-truncate flex-grow-1 text-muted text-uppercase small">
            {columnGroupObj.name} ({checkedColumnsCount}/{columns.length})
          </div>
          <div className="small">
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                gridColumnApi.setColumnsVisible(
                  columns.map(c => c.colId),
                  !isGroupChecked,
                );
              }}
            >
              {isGroupChecked ? (
                <FormattedMessage
                  defaultMessage="Deselect all"
                  id="data_controls.toggler.deselect_all"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Select all"
                  id="data_controls.toggler.select_all"
                />
              )}
            </a>{' '}
            &middot;{' '}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              Toggle group
            </a>
          </div>
        </div>
      </li>
      <AnimateHeight
        height={isOpen ? 'auto' : 0}
        // onAnimationStart={({ newHeight }) => console.log(newHeight)}
        // onAnimationEnd={() => {
        //   this.slider.current.mySlider.updateAutoHeight(300, false);
        //   // this.slider.current.mySlider.updateAutoHeight(500);
        //   console.log('TODO: focus password field');
        // }}
      >
        {columns.map((columnDef, index) => (
          <a
            href="#"
            key={columnDef.colId}
            className="list-group-item list-group-item-action px-3 px-xl-4 border-0 py-2"
            onClick={e => {
              e.preventDefault();
              gridColumnApi.setColumnVisible(columnDef.colId, !!columnDef.hide);
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <span className="mr-1">
                <CheckboxStateless checked={!columnDef.hide} />
              </span>
              <div className="text-truncate flex-grow-1">
                {/* {columnDef.headerComponentParams && (
                  <span
                    style={{
                      width: 22,
                      display: 'inline-block',
                      textAlign: 'center',
                      opacity: 0.4,
                    }}
                    className="mr-2"
                  >
                    {columnDef.headerComponentParams.menuIcon}
                  </span>
                )} */}
                {columnDef.headerName}
              </div>
            </div>
          </a>
        ))}
      </AnimateHeight>
    </div>
  );
}
