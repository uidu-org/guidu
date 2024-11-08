import React from 'react';
import PortalProviderAPI from './PortalProviderApi';
import { PortalProviderProps } from './types';

export default class PortalProvider extends React.Component<PortalProviderProps> {
  static displayName = 'PortalProvider';

  portalProviderAPI: PortalProviderAPI;

  constructor(props: PortalProviderProps) {
    super(props);
    this.portalProviderAPI = new PortalProviderAPI();
  }

  componentDidUpdate() {
    this.portalProviderAPI.forceUpdate();
  }

  render() {
    const { render } = this.props;
    return render(this.portalProviderAPI);
  }
}
