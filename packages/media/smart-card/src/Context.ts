import * as React from 'react';
import { Client } from './Client';

export default React.createContext<Client | undefined>(undefined);
