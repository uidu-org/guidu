import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  cursor: pointer;
  font-size: 0.95rem;
`;

export default function Item({
  row: item,
  gutterSize = 32,
  onItemClick,
  style = {},
}) {
  const primary = item.cells.find((cell) => cell.column.isPrimary);
  const cover = item.cells.find((cell) => cell.column.kind === 'cover');
  const uid = item.cells.find((cell) => cell.column.kind === 'uid');

  return (
    <StyledItem
      key={item.id}
      onClick={(e) => {
        e.preventDefault();
        onItemClick(item);
      }}
      style={{
        ...style,
        minWidth: `calc(100% - ${gutterSize * 2}px)`,
        left: style.left + gutterSize,
        // top: style.top + gutterSize,
        top: 0,
        transform: `translate3d(0px,${style.top}px, 0px)`,
        willChange: 'transform',
        height: style.height,
      }}
      tw="top-0 flex items-center w-auto"
    >
      {uid && (
        <div tw="truncate px-3 xl:px-4 h-full border-r">
          {uid.render('Cell')}
        </div>
      )}
      {/* {cover && (
        <div
          style={{
            width: cover.width || '138px',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundImage: `url(${valueRenderer(item, cover)})`,
            height: '100%',
            flexShrink: 0,
          }}
        />
      )} */}
      <div tw="flex flex-col">
        {primary && (
          <div
            className={`mb-2${cover ? ' px-3 px-xl-4' : ''}`}
            style={{
              maxWidth: `calc('100vw - 100px')`,
              fontWeight: 500,
            }}
            tw="sticky width[fit-content] -left-6"
          >
            {primary.render('Cell', { ...primary.column.cellProps })}
          </div>
        )}
        <div tw="flex items-center">
          {item.cells
            .filter(
              (cell) =>
                cell.column.kind !== 'uid' &&
                !cell.column.isPrivate &&
                !cell.column.isPrimary,
            )
            .map((cell) => {
              return (
                <div
                  key={`${item.id}-${cell.column.id}-value`}
                  tw="truncate px-3 xl:px-4"
                  style={{
                    width: cell.column.width || '150px',
                    minWidth: cell.column.minWidth || 'auto',
                    maxWidth: cell.column.maxWidth || 'auto',
                  }}
                >
                  {cell.render('Cell', { ...cell.column.cellProps })}
                </div>
              );
            })}
        </div>
      </div>
    </StyledItem>
  );
}
