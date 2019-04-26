export function extractInlineViewPropsFromObject(json) {
    if (!json || typeof json !== 'object') {
        throw new Error('smart-card: data is not parsable JSON-LD.');
    }
    var props = {
        title: typeof json.name === 'string' ? json.name : '',
    };
    if (json.generator && json.generator.icon) {
        props.icon =
            json.generator.icon && json.generator.icon.url
                ? json.generator.icon.url
                : json.generator.icon;
    }
    if (json.url || json['@url']) {
        props.link = String(json.url || json['@url']);
    }
    return props;
}
//# sourceMappingURL=extractPropsFromObject.js.map