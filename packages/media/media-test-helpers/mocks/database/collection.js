import { getHackerNoun } from './mockData';
export function createCollection(name) {
    return {
        name: name || getHackerNoun(),
        createdAt: Date.now(),
    };
}
//# sourceMappingURL=collection.js.map