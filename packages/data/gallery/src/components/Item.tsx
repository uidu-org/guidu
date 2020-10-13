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
    const { item, primary, row } = this.props;

    if (!item) {
      return null;
    }

    const visibleCells = row.cells.filter(
      (cell) =>
        cell.column.viewType !== 'uid' &&
        cell.column.id !== 'selection' &&
        cell.column.viewType !== 'cover' &&
        cell.column.viewType !== 'primary' &&
        cell.column.viewType !== 'avatar' &&
        cell.column.viewType !== 'addField',
    );

    const cover = row.cells.find((cell) => cell.column.viewType === 'cover');
    const avatar = row.cells.find((cell) => cell.column.viewType === 'avatar');

    return (
      <>
        <ItemCover cover={cover} avatar={avatar} item={item} />
        <ItemWrapper>
          <ItemHeader primary={primary} item={item} />
          <ItemFields>
            {visibleCells.map((cell) => {
              return (
                <ItemField
                  cell={cell}
                  key={`${item.id}-${cell.column.id}-name`}
                />
              );
            })}
          </ItemFields>
        </ItemWrapper>
      </>
    );
  }
}
