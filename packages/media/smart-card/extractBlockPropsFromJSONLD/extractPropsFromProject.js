import { extractPropsFromObject } from './extractPropsFromObject';
export function extractBlockViewPropsFromProject(json) {
    var props = extractPropsFromObject(json);
    props.byline = 'Project';
    if (json.member &&
        json.member['@type'] === 'Collection' &&
        json.member.totalItems > 0) {
        props.details = props.details || [];
        props.details.push({
            title: 'Members',
            text: json.member.totalItems,
        });
    }
    return props;
}
//# sourceMappingURL=extractPropsFromProject.js.map