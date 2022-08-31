import { StyledComponent } from 'styled-components';

export function noop() {}

export function getComponents(
  components: Record<string, StyledComponent<any, any>>,
  overrides: Record<
    string,
    { component: StyledComponent<any, any>; props?: {}; style?: {} }
  > = {},
) {
  return Object.keys(components).reduce((acc, name) => {
    const override = overrides[name];
    acc[name] = {
      component: override?.component || components[name],
      props: { $style: override?.style, ...override?.props },
    };
    return acc;
  }, {});
}
