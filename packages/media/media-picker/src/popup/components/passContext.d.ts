import { Component } from 'react';
import { AppProxyReactContext } from './app';
import { Store } from 'redux';
import { State } from '../domain';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';
export interface PassContextProps {
    store: Store<State>;
    proxyReactContext?: AppProxyReactContext;
}
export default class PassContext extends Component<PassContextProps, any> {
    static childContextTypes: {
        store(): void;
        getAtlaskitAnalyticsEventHandlers(): void;
        intl: ReactIntl.IntlShape;
    };
    private createDefaultI18nProvider;
    getChildContext(): {
        store: Store<State, import("redux").AnyAction>;
        getAtlaskitAnalyticsEventHandlers: UIAnalyticsEventHandlerSignature;
        intl: ReactIntl.InjectedIntl | ReactIntl.IntlShape;
    };
    render(): import("react").ReactNode;
}
