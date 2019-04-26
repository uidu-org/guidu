export function getUrlParameter(name, searchOverride) {
    var search = searchOverride || location.search;
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(search);
    return results === null
        ? undefined
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
export function getRequiredUrlParameter(name, searchOverride) {
    var result = getUrlParameter(name, searchOverride);
    if (result) {
        return result;
    }
    else {
        throw new Error("Could not get required url parameter: " + name);
    }
}
//# sourceMappingURL=getUrlParameter.js.map