import * as uuid from 'uuid';
import { getFutureDate } from './mockData';
export function createUpload() {
    return {
        id: uuid.v4(),
        created: Date.now(),
        expires: getFutureDate().valueOf(),
        chunks: [],
    };
}
//# sourceMappingURL=upload.js.map