import { getAvatar, getCover } from '@uidu/data-fields';
import { ScrollableContainer, ShellBody } from '@uidu/shell';
import React, { useCallback, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { GalleryProps } from '../types';
import GalleryItem from './GalleryItem';

const ITEM_HEADER_HEIGHT = 42;
const ITEM_COLUMN_ROW = 64;
const ITEM_PADDING = 32;

function chunkArray(myArray, chunkSize) {
  const results = [];
  const copied = [...myArray];

  while (copied.length) {
    results.push(copied.splice(0, chunkSize));
  }

  return results;
}

export default function Gallery({
  tableInstance,
  onItemClick,
  columnCount = 4,
  gutterSize = 8,
}: GalleryProps) {
  const parentRef = useRef();

  const { prepareRow, columns } = tableInstance;

  const getGutterSize = ({ avatar, cover }) => {
    if (cover) {
      return cover.width ? (cover.width * 3) / 2 : 207;
    }

    if (avatar) {
      return 207;
    }

    return 0;
  };

  const cover = getCover(columns);
  const avatar = getAvatar(columns);

  const estimateSize = useCallback(() => {
    return (
      getGutterSize({ avatar, cover }) +
      ITEM_HEADER_HEIGHT +
      ITEM_COLUMN_ROW *
        tableInstance.visibleColumns.filter(
          (column) =>
            column.kind !== 'uid' &&
            column.kind !== 'selection' &&
            column.kind !== 'cover' &&
            !column.isPrimary &&
            column.kind !== 'avatar' &&
            column.kind !== 'addField',
        ).length +
      // ITEM_PADDING +
      gutterSize
    );
  }, [gutterSize, tableInstance.visibleColumns, avatar, cover]);

  const items = useMemo(() => chunkArray(tableInstance.rows, columnCount), [
    tableInstance.rows,
    columnCount,
  ]);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize,
    overscan: 5,
  });

  return (
    <ShellBody>
      <ScrollableContainer ref={parentRef}>
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = items[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                className="w-100"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  margin: `${gutterSize}px 0`,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {row.map((item, index) => {
                  prepareRow(item);
                  return (
                    <GalleryItem
                      key={`${virtualRow.index}-${index}`}
                      onItemClick={onItemClick}
                      item={item}
                      tableInstance={tableInstance}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </ScrollableContainer>
    </ShellBody>
  );
}
