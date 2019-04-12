import { MockContext } from '..';
import { MockRequest, MockResponse } from 'xhr-mock';
export declare const getFileImage: (context: () => MockContext) => (req: MockRequest, res: MockResponse) => MockResponse;
