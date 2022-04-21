import { DashletProps, renderDashlet } from '@uidu/dashlets';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps } from '../types';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardManagerContextProps {
  columnDefs: { [key: string]: any };
  apiUrl: string;
}

export const DashboardManagerContext =
  createContext<DashboardManagerContextProps>(
    {} as DashboardManagerContextProps,
  );

function DashboardManagerProvider({ columnDefs, apiUrl, children }) {
  const value = useMemo(() => ({ columnDefs, apiUrl }), [columnDefs, apiUrl]);
  return (
    <DashboardManagerContext.Provider value={value}>
      {children}
    </DashboardManagerContext.Provider>
  );
}

export function useDashboardManager() {
  const context = useContext(DashboardManagerContext);
  if (context === undefined) {
    throw new Error('useDashboardManager must be used within a UiProvider');
  }
  return context;
}

export default function DashboardManager({
  children,
  gridProps,
  columnDefs = {},
  apiUrl,
}: DashboardManagerProps) {
  const renderDashlets = useCallback(
    ({ dashlets = [] }: { dashlets: DashletProps[] }) => {
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

      const items = dashlets.map((dashlet, index) => (
        <div key={`${index}`}>{renderDashlet(dashlet, index)}</div>
      ));

      // try with memoizing children
      // since version > 0.18.0 animation works differently
      // https://github.com/STRML/react-grid-layout/blob/master/README.md#Performance

      return (
        <DashboardManagerProvider apiUrl={apiUrl} columnDefs={columnDefs}>
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
            {items}
          </ResponsiveGridLayout>
        </DashboardManagerProvider>
      );
    },
    [columnDefs, gridProps],
  );

  const renderControls = ({}) => {
    return <></>;
  };

  return (children as any)({
    renderControls,
    renderBlocks: renderDashlets,
    renderDashlets,
  });
}
