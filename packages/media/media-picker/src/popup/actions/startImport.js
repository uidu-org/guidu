export var START_IMPORT = 'START_IMPORT';
export function isStartImportAction(action) {
    return action.type === START_IMPORT;
}
export function startImport() {
    return {
        type: START_IMPORT,
    };
}
//# sourceMappingURL=startImport.js.map