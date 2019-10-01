import * as React from 'react';

type SidebarProps = { children: any; showSidebar: boolean };

export default class Sidebar extends React.Component<
  SidebarProps,
  { showSidebar: boolean }
> {
  render() {
    if (typeof this.props.children !== 'function') {
      return this.props.children;
    }

    if (!this.props.showSidebar) {
      return this.props.children({});
    }

    const additionalRendererProps = {
      appearance: 'full-page',
      allowDynamicTextSizing: true,
    };

    return this.props.children(additionalRendererProps);
  }
}
