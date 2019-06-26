export { WithProviders } from './withProviders';
export { Providers } from '../types';

export type ProviderHandler = (name: string, provider?: Promise<any>) => void;

export default class ProviderFactory {
  private providers: Map<string, Promise<any>> = new Map();
  private subscribers: Map<string, ProviderHandler[]> = new Map();

  static create(providers: { [name: string]: Promise<any> }) {
    const providerFactory = new ProviderFactory();
    Object.keys(providers).forEach(name => {
      providerFactory.setProvider(name, providers[name]);
    });
    return providerFactory;
  }

  destroy() {
    this.providers.clear();
    this.subscribers.clear();
  }

  isEmpty(): boolean {
    return !this.providers.size && !this.subscribers.size;
  }

  setProvider(name: string, provider?: Promise<any>) {
    // Do not trigger notifyUpdate if provider is the same.
    if (this.providers.get(name) === provider) {
      return;
    }

    if (provider) {
      this.providers.set(name, provider);
    } else {
      this.providers.delete(name);
    }

    this.notifyUpdated(name, provider);
  }

  removeProvider(name: string) {
    this.providers.delete(name);
    this.notifyUpdated(name);
  }

  subscribe(name: string, handler: ProviderHandler) {
    const handlers = this.subscribers.get(name) || [];
    handlers.push(handler);

    this.subscribers.set(name, handlers);

    const provider = this.providers.get(name);

    if (provider) {
      handler(name, provider);
    }
  }

  unsubscribe(name: string, handler: ProviderHandler) {
    const handlers = this.subscribers.get(name);
    if (!handlers) {
      return;
    }

    const index = handlers.indexOf(handler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }

    if (handlers.length === 0) {
      this.subscribers.delete(name);
    } else {
      this.subscribers.set(name, handlers);
    }
  }

  unsubscribeAll(name: string) {
    const handlers = this.subscribers.get(name);
    if (!handlers) {
      return;
    }

    this.subscribers.delete(name);
  }

  hasProvider(name: string) {
    return this.providers.has(name);
  }

  private notifyUpdated(name: string, provider?: Promise<any>) {
    const handlers = this.subscribers.get(name);
    if (!handlers) {
      return;
    }

    handlers.forEach(handler => {
      handler(name, provider);
    });
  }
}
