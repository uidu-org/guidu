import { MockRequest } from 'xhr-mock';
import { RequestData } from '.';
export declare const matchMethod: (req: MockRequest, data: RequestData) => boolean;
export declare const exactMatchUrl: (req: MockRequest, data: RequestData) => any;
export declare const exactMatchHeaders: (req: MockRequest, data: RequestData) => any;
export declare const exactMatchBody: (req: MockRequest, data: RequestData) => any;
export declare const exactMatch: (req: MockRequest, data: RequestData) => boolean;
