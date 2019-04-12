import { Auth } from '../models/auth';
export declare type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare type RequestParams = {
    [key: string]: any;
};
export declare type RequestHeaders = {
    [key: string]: string;
};
export declare type RequestOptions = {
    readonly method?: RequestMethod;
    readonly auth?: Auth;
    readonly params?: RequestParams;
    readonly headers?: RequestHeaders;
    readonly body?: any;
};
export declare function request(url: string, options?: RequestOptions, controller?: AbortController): Promise<Response>;
export declare function mapResponseToJson(response: Response): Promise<any>;
export declare function mapResponseToBlob(response: Response): Promise<Blob>;
export declare function mapResponseToVoid(_response: Response): Promise<void>;
export declare type CreateUrlOptions = {
    readonly params?: RequestParams;
    readonly auth?: Auth;
};
export declare function createUrl(url: string, { params, auth }: CreateUrlOptions): string;
export default request;
