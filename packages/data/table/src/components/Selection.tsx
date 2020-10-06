import { CheckboxStateless } from '@uidu/checkbox';
import React from 'react';

export function RowSelection({ row }) {
  return <CheckboxStateless {...row.getToggleRowSelectedProps()} id={row.id} />;
}

export function HeaderSelection({ getToggleAllRowsSelectedProps, ...rest }) {
  return <CheckboxStateless {...getToggleAllRowsSelectedProps()} id="Foo" />;
}

export function AggregatedSelection({
  getToggleAllRowsSelectedProps,
  ...rest
}) {
  return <CheckboxStateless {...getToggleAllRowsSelectedProps()} id="Foo" />;
}
