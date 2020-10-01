import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ItemCover from './ItemCover';
import ItemField from './ItemField';
import ItemHeader from './ItemHeader';

const ItemWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ItemFields = styled.dl`
  margin-bottom: 0;
`;

export default class Item extends PureComponent<any> {
  render() {
    const {
      item,
      columnDefs,
      primary,
      cover,
      avatar,
      sorters,
      filterModel,
      tableInstance,
    } = this.props;

    if (!item) {
      return null;
    }

    const visibleColumns = columnDefs.filter(
      (column) =>
        column.viewType !== 'cover' &&
        column.viewType !== 'primary' &&
        column.viewType !== 'avatar' &&
        column.viewType !== 'addField',
    );

    return (
      <>
        <ItemCover cover={cover} avatar={avatar} item={item} />
        <ItemWrapper>
          <ItemHeader primary={primary} item={item} />
          {visibleColumns.length > 0 && (
            <ItemFields>
              {visibleColumns.map((column) => (
                <ItemField
                  column={column}
                  sorters={sorters}
                  filterModel={filterModel}
                  item={item}
                  key={`${item.id}-${column.field}-name`}
                />
              ))}
            </ItemFields>
          )}
        </ItemWrapper>
      </>
    );
  }
}
