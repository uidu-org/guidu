import * as tslib_1 from "tslib";
export function genericExtractPropsFromJSONLD(options) {
    var e_1, _a;
    var defaultExtractorFunction = options.defaultExtractorFunction, extractorPrioritiesByType = options.extractorPrioritiesByType, extractorFunctionsByType = options.extractorFunctionsByType, json = options.json;
    if (json) {
        var type = json['@type'];
        if (type && Array.isArray(type)) {
            var highestPriority = 0;
            var highestPriorityExtractorFunction = defaultExtractorFunction;
            try {
                for (var type_1 = tslib_1.__values(type), type_1_1 = type_1.next(); !type_1_1.done; type_1_1 = type_1.next()) {
                    var t = type_1_1.value;
                    if (extractorPrioritiesByType[t] > highestPriority) {
                        highestPriority = extractorPrioritiesByType[t];
                        highestPriorityExtractorFunction = extractorFunctionsByType[t];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (type_1_1 && !type_1_1.done && (_a = type_1.return)) _a.call(type_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return highestPriorityExtractorFunction(json);
        }
        if (type && extractorFunctionsByType[type]) {
            return extractorFunctionsByType[type](json);
        }
    }
    return defaultExtractorFunction(json);
}
//# sourceMappingURL=genericExtractPropsFromJSONLD.js.map