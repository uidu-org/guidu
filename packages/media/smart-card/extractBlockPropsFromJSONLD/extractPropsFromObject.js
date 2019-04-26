export function extractPropsFromObject(json) {
    if (!json) {
        throw new Error('smart-card: data is not parsable JSON-LD.');
    }
    var props = {
        title: {
            text: typeof json.name === 'string' ? json.name : '',
        },
        description: {
            text: typeof json.summary === 'string' ? json.summary : '',
        },
    };
    if (json.url) {
        props.link = String(json.url);
    }
    if (json.generator && (json.generator.name || json.generator.icon)) {
        props.context = {
            text: json.generator.name,
            icon: json.generator.icon && json.generator.icon.url
                ? json.generator.icon.url
                : json.generator.icon,
        };
    }
    return props;
}
//# sourceMappingURL=extractPropsFromObject.js.map