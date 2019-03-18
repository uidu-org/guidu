// @flow

import React, { type ComponentType, type ElementConfig } from 'react';

import AnalyticsContext from './AnalyticsContext';

type WithAnalyticsContextProps = {|
  analyticsContext?: {},
|};

/* The returned component props must use $Supertype to work with multiple HOCs - https://github.com/facebook/flow/issues/6057#issuecomment-414157781
 * We also cannot alias this as a generic as that causes issues with multiple HOCs - https://github.com/facebook/flow/issues/6587.
 * We could declare a parametrized flow type for it but this convolutes error messages.
 * Intersections cause issues so we must use exact objects in conjunction with
 * object spreading instead - https://github.com/flowtype/flow-bin/issues/93#issuecomment-340687896
 */
export type AnalyticsContextWrappedComp<C> = ComponentType<{
  ...$Exact<WithAnalyticsContextProps>,
  ...$Exact<ElementConfig<$Supertype<C>>>,
}>;

export default function withAnalyticsContext<P: {}, C: ComponentType<P>>(
  defaultData: {} = {},
): C => AnalyticsContextWrappedComp<C> {
  return WrappedComponent => {
    // $FlowFixMe - flow 0.67 doesn't know about forwardRef
    const WithAnalyticsContext = React.forwardRef((props, ref) => {
      const { analyticsContext = {}, ...others } = props;
      const data = { ...defaultData, ...analyticsContext };
      return (
        <AnalyticsContext data={data}>
          <WrappedComponent {...others} ref={ref} />
        </AnalyticsContext>
      );
    });

    WithAnalyticsContext.displayName = `WithAnalyticsContext(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    return WithAnalyticsContext;
  };
}
