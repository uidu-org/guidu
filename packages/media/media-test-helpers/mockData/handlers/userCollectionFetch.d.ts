import { MockContext } from '..';
import { MockRequest, MockResponse } from 'xhr-mock';
export declare const userCollectionFetch: (context: () => MockContext) => (req: MockRequest, res: MockResponse) => MockResponse;
