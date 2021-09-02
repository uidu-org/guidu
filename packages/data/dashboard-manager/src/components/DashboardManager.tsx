import { DashletProps, renderDashlet } from '@uidu/dashlets';
import React, { createContext, useContext, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps } from '../types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ColumnDefsContext = createContext({});

function ColumnDefsProvider({ columnDefs, children }) {
  return (
    <ColumnDefsContext.Provider value={columnDefs}>
      {children}
    </ColumnDefsContext.Provider>
  );
}

export function useColumnDefs() {
  const context = useContext(ColumnDefsContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
}

export default function DashboardManager({
  children,
  gridProps,
  columnDefs = {},
}: DashboardManagerProps) {
  const renderDashlets = ({ dashlets = [] }: { dashlets: DashletProps[] }) => {
    const layout = dashlets.map(
      ({ layout: { x, y, w, h, minW, minH } }, index) => ({
        i: `${index}`,
        x,
        y,
        w,
        h,
        minH,
        minW,
      }),
    );

    const children = useMemo(() => {
      return dashlets.map((dashlet, index) => {
        return <div key={`${index}`}>{renderDashlet(dashlet, index)}</div>;
      });
    }, [dashlets]);

    // try with memoizing children
    // since version > 0.18.0 animation works differently
    // https://github.com/STRML/react-grid-layout/blob/master/README.md#Performance

    return (
      <ColumnDefsProvider columnDefs={columnDefs}>
        <ResponsiveGridLayout
          autoSize
          measureBeforeMount
          // verticalCompact
          rowHeight={24}
          useCSSTransforms
          layouts={{
            lg: layout,
            md: layout,
            sm: layout,
          }}
          breakpoints={{
            lg: 1200,
            md: 996,
            sm: 768,
            xs: 480,
            xxs: 0,
          }}
          cols={
            {
              lg: 12,
              md: 12,
              sm: 12,
              xs: 1,
              xxs: 1,
            } as any
          }
          margin={[24, 24]}
          {...gridProps}
        >
          {children}
        </ResponsiveGridLayout>
      </ColumnDefsProvider>
    );
  };

  const renderControls = ({}) => {
    return <></>;
  };

  return (children as any)({
    renderControls,
    renderBlocks: renderDashlets,
    renderDashlets,
  });
}
