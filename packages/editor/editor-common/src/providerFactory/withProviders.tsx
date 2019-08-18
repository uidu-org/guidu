import { PureComponent } from 'react';
import ProviderFactory from './';
import { Providers } from '../types';

export interface Props {
  providerFactory: ProviderFactory;
  providers: string[];
  renderNode: (providers: Providers) => JSX.Element;
}

export class WithProviders extends PureComponent<Props, { providers: any }> {
  constructor(props: Props) {
    super(props);

    const providers: Record<string, Promise<any> | undefined> = {};
    this.props.providers.forEach(name => {
      providers[name] = undefined;
    });

    this.state = {
      providers,
    };
  }

  UNSAFE_componentWillMount() {
    const { providers, providerFactory } = this.props;

    providers.forEach(name => {
      providerFactory.subscribe(name, this.handleProvider);
    });
  }

  componentWillUnmount() {
    const { providers, providerFactory } = this.props;

    providers.forEach(name => {
      providerFactory.unsubscribe(name, this.handleProvider);
    });
  }

  handleProvider = (name: string, provider?: Promise<any>) => {
    this.setState(({ providers }) => {
      return {
        providers: {
          ...providers,
          [name]: provider,
        },
      };
    });
  };

  render() {
    const { state, props } = this;
    const { renderNode } = props;

    return renderNode(state.providers);
  }
}
