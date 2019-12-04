import { valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';

export default class Item extends PureComponent<any> {
  render() {
    const { columnDefs, item, ...rest } = this.props;
    console.log(this.props);
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

    return (
      <div
        onClick={e => {
          e.preventDefault();
          // onItemClick(item.data);
        }}
        key={item.id}
      >
        <div className="">
          {/* <ItemHeader cover={cover} avatar={avatar} item={item} /> */}
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
              {columnDefs
                .filter(
                  column =>
                    !column.hide &&
                    column.type !== 'cover' &&
                    column.type !== 'primary' &&
                    column.type !== 'avatar',
                )
                .map(column => (
                  <>
                    <dt
                      className="small text-muted text-truncate mt-3"
                      key={`${item.id}-${column.field}-name`}
                    >
                      {column.headerComponentParams &&
                      column.headerComponentParams.menuIcon ? (
                        <span className="mr-2">
                          {column.headerComponentParams.menuIcon}
                        </span>
                      ) : null}
                      {column.headerName}
                    </dt>
                    <dd
                      className="mb-0 text-truncate"
                      key={`${item.id}-${column.field}-value`}
                    >
                      {valueRenderer(item, column)}
                    </dd>
                  </>
                ))}
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
