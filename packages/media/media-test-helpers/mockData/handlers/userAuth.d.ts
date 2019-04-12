import { MockRequest, MockResponse } from 'xhr-mock';
import { MockContext } from '../';
export declare const userAuth: (context: () => MockContext) => (req: MockRequest, res: MockResponse) => MockResponse;
