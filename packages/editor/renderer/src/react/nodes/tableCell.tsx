import { CellAttributes } from '@uidu/adf-schema';
import { compose, SortOrder } from '@uidu/editor-common';
import * as React from 'react';
import { CSSProperties } from 'react';
import { RendererCssClassName } from '../../consts';
import SortingIcon from '../../ui/SortingIcon';

type CellProps = CellAttributes & {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export type CellWithSortingProps = CellProps & {
  isHeaderRow?: boolean;
  allowColumnSorting?: boolean;
  onSorting?: (columnIndex?: number, currentSortOrdered?: SortOrder) => void;
  columnIndex?: number;
  sortOrdered?: SortOrder;
};

const nextStatusOrder = (currentSortOrder?: SortOrder): SortOrder => {
  switch (currentSortOrder) {
    case SortOrder.NO_ORDER:
      return SortOrder.ASC;
    case SortOrder.ASC:
      return SortOrder.DESC;
    case SortOrder.DESC:
      return SortOrder.NO_ORDER;
  }

  return SortOrder.NO_ORDER;
};

const getDataAttributes = (colwidth?: number[]): any => {
  const attrs: any = {};
  if (colwidth) {
    attrs['data-colwidth'] = colwidth.join(',');
  }

  return attrs;
};

const getStyle = (background?: string): CSSProperties => {
  const style: CSSProperties = {};
  if (background) {
    style.backgroundColor = background;
  }

  return style;
};

const withCellProps = (WrapperComponent: React.ElementType) => {
  return class WithCellProps extends React.Component<CellProps> {
    render() {
      const {
        children,
        className,
        onClick,
        colwidth,
        rowspan,
        colspan,
        background,
      } = this.props;

      return (
        <WrapperComponent
          rowSpan={rowspan}
          colSpan={colspan}
          style={getStyle(background)}
          onClick={onClick}
          className={className}
          {...getDataAttributes(colwidth)}
        >
          {children}
        </WrapperComponent>
      );
    }
  };
};

export const withSortableColumn = (WrapperComponent: React.ElementType) => {
  return class WithSortableColumn extends React.Component<CellWithSortingProps> {
    constructor(props: CellWithSortingProps) {
      super(props);
    }

    render() {
      const {
        allowColumnSorting,
        onSorting,
        children,
        sortOrdered,
        isHeaderRow,
      } = this.props;
      const sortOrderedClassName =
        sortOrdered === SortOrder.NO_ORDER
          ? RendererCssClassName.SORTABLE_COLUMN_NO_ORDER
          : '';

      if (!allowColumnSorting || !isHeaderRow) {
        return <WrapperComponent {...this.props} />;
      }

      let className = RendererCssClassName.SORTABLE_COLUMN;

      if (!onSorting) {
        className = `${className} ${RendererCssClassName.SORTABLE_COLUMN_NOT_ALLOWED}`;
      }

      return (
        <WrapperComponent
          {...this.props}
          className={className}
          onClick={this.onClick}
        >
          <>
            {children}
            <figure
              className={`${RendererCssClassName.SORTABLE_COLUMN_ICON} ${sortOrderedClassName}`}
            >
              <SortingIcon
                isSortingAllowed={!!onSorting}
                sortOrdered={sortOrdered}
              />
            </figure>
          </>
        </WrapperComponent>
      );
    }

    onClick = () => {
      const { onSorting, columnIndex, sortOrdered } = this.props;

      if (onSorting && columnIndex != null) {
        const sortOrder = nextStatusOrder(sortOrdered);

        onSorting(columnIndex, sortOrder);
      } else {
      }
    };
  };
};

export const TableHeader = compose(withSortableColumn, withCellProps)('th');
export const TableCell = withCellProps('td');
