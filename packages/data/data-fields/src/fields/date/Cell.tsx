import { CellContext } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

export default function Cell<T>(props: CellContext<T, string>) {
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }
  const { getValue } = props;
  if (!getValue()) {
    return null;
  }

  // we should ensure value is an utc date, if not force it
  const cleaned = getValue().endsWith('Z') ? getValue() : `${getValue()}Z`;
  const convertedIntoUTC = dayjs(cleaned).utc().format();

  return (
    <div tw="flex w-full justify-between">
      {dayjs(convertedIntoUTC).format('L')}
      <span>{dayjs(convertedIntoUTC).format('LT')}</span>
    </div>
  );
}
