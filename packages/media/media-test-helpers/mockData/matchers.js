import * as matches from 'lodash.matches';
export var matchMethod = function (req, data) {
    return data.method ? data.method === req.method() : true;
};
export var exactMatchUrl = function (req, data) {
    return data.url ? matches(data.url)(req.url()) : true;
};
export var exactMatchHeaders = function (req, data) {
    return data.headers ? matches(data.headers)(req.headers()) : true;
};
export var exactMatchBody = function (req, data) {
    try {
        return data.body
            ? matches(JSON.parse(data.body))(JSON.parse(req.body() || '{}'))
            : true;
    }
    catch (e) {
        return false;
    }
};
export var exactMatch = function (req, data) {
    return [matchMethod, exactMatchUrl, exactMatchHeaders, exactMatchBody].reduce(function (coll, fn) { return coll && fn(req, data); }, true);
};
//# sourceMappingURL=matchers.js.map