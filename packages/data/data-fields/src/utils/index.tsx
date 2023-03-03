import { Column, ColumnDef, ColumnMeta } from '@tanstack/react-table';
import numeral from 'numeral';
import { byName } from '../fields';
import { FieldGroup } from '../types';

export function buildNextColumn<T>({
  columns,
}: {
  columns: Partial<ColumnDef<T, unknown>>[];
}): Partial<ColumnDef<T, unknown>>[] {
  return columns.map((column) => {
    const columnType = byName[column.meta?.kind];
    return {
      id: column.accessorKey,
      accessor: column.id,
      ...columnType,
      ...column,
      meta: {
        ...(columnType?.meta || {}),
        ...column.meta,
      },
    };
  });
}

export const buildColumn = ({ columns, ...fieldGroup }: FieldGroup) => {
  return columns.map(({ primary, kind, ...column }) => {
    return {
      fieldGroup,
      id: column.id,
      accessor: column.id,
      ...(kind ? { ...byName[kind] } : {}),
      ...(primary
        ? {
            canMove: false,
            canHide: false,
            lockPinned: true,
            isPrimary: true,
            showRowGroup: true,
            pinned: 'left',
          }
        : {}),
      ...column,
    };
  });
};

export function buildNextColumns<T>(
  columns: ColumnDef<T>[],
): Array<ColumnDef<T>> {
  return columns.reduce(
    (arr, item) => [...arr, ...buildNextColumn(item)],
    [] as ColumnDef<T>[],
  );
}

export const buildColumns = (columns): Array<FieldGroup> => {
  return columns.reduce((arr, item) => {
    return [...arr, ...buildColumn(item)];
  }, []);
};

export function getPrimary<T>(columns: Column<T>[]) {
  return columns.find((column) => column.columnDef.meta?.isPrimary);
}

export function getCover<T>(columns: Column<T>[]) {
  return columns.find((column) => column.columnDef.meta?.kind === 'cover');
}

export function getAvatar<T>(columns: Column<T>[]) {
  return columns.find((column) => column.columnDef.meta?.kind === 'avatar');
}

export const numericComparator = (number1, number2) => {
  const numericNumber1 = numeral(number1).value();
  const numericNumber2 = numeral(number2).value();
  if (numericNumber1 === null && number2 === null) {
    return 0;
  }

  if (isNaN(numericNumber1)) {
    return -1;
  }

  if (isNaN(numericNumber2)) {
    return 1;
  }

  if (numericNumber1 === null) {
    return -1;
  }

  if (numericNumber2 === null) {
    return 1;
  }

  return numericNumber1 - numericNumber2;
};

export function getColumnDef(columnDefs, filterOrGrouperOrSorter) {
  return columnDefs.filter((c) => c.id === filterOrGrouperOrSorter.id)[0];
}

export function getFieldFromColumnDef<T>(columnDef: ColumnDef<T>) {
  return byName[columnDef.meta?.kind];
}

export function mergeByKind<T>(passedMeta: ColumnMeta<T, unknown>) {
  const { meta, ...rest } = byName[passedMeta.kind || 'string'];
  return {
    ...rest,
    meta: {
      ...meta,
      ...passedMeta,
    },
  };
}
