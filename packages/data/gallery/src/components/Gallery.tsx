import { getAvatar, getCover } from '@uidu/data-fields';
import { ScrollableContainer, ShellBody } from '@uidu/shell';
import React, { useCallback, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { GalleryProps } from '../types';
import GalleryItem from './GalleryItem';

const ITEM_HEADER_HEIGHT = 42;
const ITEM_COLUMN_ROW = 64;

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

  const { prepareRow, page, columns, visibleColumns } = tableInstance;

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
        visibleColumns.filter(
          (column) =>
            column.kind !== 'uid' &&
            column.kind !== 'selection' &&
            !column.isPrivate &&
            !column.isPrimary &&
            column.kind !== 'addField',
        ).length +
      // ITEM_PADDING +
      gutterSize
    );
  }, [gutterSize, visibleColumns, avatar, cover]);

  const items = useMemo(
    () => chunkArray(page, columnCount),
    [page, columnCount],
  );

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
          tw="w-full relative"
          style={{
            height: `${rowVirtualizer.totalSize}px`,
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = items[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                tw="w-full absolute top-0 left-0 grid"
                style={{
                  padding: `${gutterSize}px`,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  gridColumnGap: `${gutterSize}px`,
                  gridRowGap: `${gutterSize}px`,
                  gridTemplateColumns: Array.from({ length: columnCount })
                    .map((i) => `1fr`)
                    .join(' '),
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
