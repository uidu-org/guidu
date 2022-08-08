import { Row } from '@tanstack/react-table';
import React from 'react';
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

export default function Item<T>({
  primary,
  item,
}: {
  primary: any;
  item: Row<T>;
}) {
  if (!item) {
    return null;
  }

  const cells = item.getVisibleCells();

  const visibleCells = cells.filter(
    (cell) =>
      cell.column.kind !== 'uid' &&
      !cell.column.isPrimary &&
      !cell.column.isPrivate &&
      cell.column.kind !== 'addField',
  );

  const cover = cells.find(
    (cell) => cell.column.columnDef?.meta?.kind === 'cover',
  );
  const avatar = cells.find(
    (cell) => cell.column.columnDef?.meta?.kind === 'avatar',
  );

  return (
    <>
      {cover && <ItemCover cover={cover} avatar={avatar} />}
      <ItemWrapper>
        <ItemHeader primary={primary} item={item} />
        <ItemFields>
          {cells.map((cell) => (
            <ItemField cell={cell} key={`${item.id}-${cell.column.id}-name`} />
          ))}
        </ItemFields>
      </ItemWrapper>
    </>
  );
}
