var lastKey = 1;
var identifiersMap = new Map();
// Returns the same key given the same Card Identifier.
// This is needed to keep a consistent react element key for lists
// when given different types of objects
export var generateIdentifierKey = function (identifier) {
    switch (identifier.mediaItemType) {
        case 'external-image':
            return identifier.dataURI;
        case 'file':
            if (typeof identifier.id === 'string') {
                return identifier.id;
            }
            else {
                var currentKey = identifiersMap.get(identifier.id);
                if (currentKey) {
                    return currentKey;
                }
                // We want to increment the key before using it
                lastKey++;
                var newKey = "" + lastKey;
                identifiersMap.set(identifier.id, newKey);
                return newKey;
            }
    }
};
//# sourceMappingURL=generateIdentifierKey.js.map