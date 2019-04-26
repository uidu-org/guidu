import * as React from 'react';
import { Client } from '../Client';
export interface ProviderProps {
    client?: Client;
    children: React.ReactElement<any>;
}
export declare class Provider extends React.Component<ProviderProps> {
    render(): JSX.Element;
}
