import { MockContext } from '..';
import { MockRequest, MockResponse } from 'xhr-mock';
export declare const tenantAuth: (context: () => MockContext) => (req: MockRequest, res: MockResponse) => MockResponse;
