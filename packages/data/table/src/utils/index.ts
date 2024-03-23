import { css, StyledComponent } from 'styled-components';
import tw from 'twin.macro';

export function getPinnedStyled({ pinned = 'left', index }) {
  if (pinned === 'left') {
    return css`
      left: ${index === 0 ? 0 : 'var(--table-pinned-column-width, 56px)'};
      background: rgb(var(--body-on-primary-bg));
      ${tw`border-r border-opacity-80 z-10 sticky!`}
    `;
  }
  if (pinned === 'right') {
    return css`
      right: ${index === 0 ? 0 : 0};
      background: rgb(var(--body-on-primary-bg));
      ${tw`border-l border-opacity-80 z-10 sticky!`}
    `;
  }
  return css``;
}

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
