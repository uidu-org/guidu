import React, { PureComponent } from 'react';

export default class DataCard extends PureComponent<any> {
  render() {
    const { columnDefs, item, tableInstance, ...rest } = this.props;
    // console.log(this.props);
    // const {
    //   items,
    //   columnDefs,
    //   gutterSize,
    //   onItemClick,
    //   primary,
    //   cover,
    //   avatar,
    // } = data;
    // const item = items[rowIndex] && items[rowIndex][columnIndex];
    const primary = null;

    if (!item) {
      return null;
    }

    const { prepareRow, rows } = tableInstance;
    const row = rows.find((r) => r.original.id === item.id);
    prepareRow(row);

    const visibleCells = row.cells.filter(
      (cell) =>
        cell.column.kind !== 'uid' &&
        cell.column.kind !== 'selection' &&
        cell.column.kind !== 'primary' &&
        !cell.column.isPrivate &&
        cell.column.kind !== 'addField',
    );

    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          // onItemClick({ data: item.data});
        }}
        key={item.id}
      >
        <div className="">
          {/* {primary && (
            <div
              className="card-header text-truncate border-bottom-0"
              style={{ fontWeight: 500 }}
            >
              {valueRenderer(item.data, primary)}
            </div>
          )} */}
          <div className={`${primary ? 'mt-n3' : ''} card-body pt-1`}>
            <dl className="mb-0">
              {visibleCells.map((cell) => {
                return (
                  <>
                    <dt
                      className="small text-muted text-truncate mt-3"
                      key={`${item.id}-${cell.column.id}-name`}
                    >
                      {cell.render('Header')}
                    </dt>
                    <dd
                      className="mb-0 text-truncate"
                      key={`${item.id}-${cell.column.id}-value`}
                    >
                      {cell.render('Cell', { ...cell.column.cellProps })}
                    </dd>
                  </>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
