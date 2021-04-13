import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ItemCover from './ItemCover';
import ItemField from './ItemField';
import ItemHeader from './ItemHeader';

const ItemWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: grid;
`;

const ItemFields = styled.dl`
  margin-bottom: 0;
  min-width: 0;
`;

export default class Item extends PureComponent<any> {
  render() {
    const { item, primary, row } = this.props;

    if (!item) {
      return null;
    }

    const visibleCells = row.cells.filter(
      (cell) =>
        cell.column.kind !== 'uid' &&
        !cell.column.isPrimary &&
        !cell.column.isPrivate &&
        cell.column.kind !== 'addField',
    );

    const cover = row.cells.find((cell) => cell.column.kind === 'cover');
    const avatar = row.cells.find((cell) => cell.column.kind === 'avatar');

    return (
      <>
        <ItemCover cover={cover} avatar={avatar} />
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
