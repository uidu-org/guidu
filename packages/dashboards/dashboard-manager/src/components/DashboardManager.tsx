import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { DashletProps, renderDashlet } from '@uidu/dashlets';
import React, { useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps } from '../types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardManager({
  children,
  gridProps,
  cubejsToken = '',
  cubejsOptions = {
    apiUrl: 'http://localhost:4000/cubejs-api/v1',
  },
}: DashboardManagerProps) {
  const cubejsApi = useRef(cubejs(cubejsToken, cubejsOptions));

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

    // try with memoizing children
    // since version > 0.18.0 animation works differently
    // https://github.com/STRML/react-grid-layout/blob/master/README.md#Performance

    return (
      <CubeProvider cubejsApi={cubejsApi.current}>
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
          {dashlets.map((dashlet, index) => {
            return <div key={`${index}`}>{renderDashlet(dashlet)}</div>;
          })}
        </ResponsiveGridLayout>
      </CubeProvider>
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
