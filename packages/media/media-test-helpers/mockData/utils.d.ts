import { MockResponse } from 'xhr-mock';
import { ResponseData } from '.';
export declare const dataURItoBlob: (dataURI: string) => Blob;
export declare const fillInResponse: (res: MockResponse, data: ResponseData) => void;
