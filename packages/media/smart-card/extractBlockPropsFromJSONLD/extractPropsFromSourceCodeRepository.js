import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedRelative } from 'react-intl';
import { extractPropsFromObject } from './extractPropsFromObject';
export var buildRepositoryLink = function (json) {
    var link = json.url && json.url.trim();
    return link ? { link: link } : {};
};
export var buildRepositoryTitle = function (json) {
    var text = json.name && json.name.trim();
    return text ? { title: { text: text } } : {};
};
export var buildRepositoryDescription = function (json) {
    var text = typeof json.summary === 'string' ? json.summary : undefined;
    return text ? { description: { text: text } } : {};
};
export var buildRepositoryByline = function (json) {
    var attributedTo = json.attributedTo && json.attributedTo.name ? json.attributedTo.name : '';
    var dateCreated = json['schema:dateCreated'];
    var dateUpdated = json['updated'];
    var updatedBy = json['atlassian:updatedBy'] && json['atlassian:updatedBy'].name;
    if (dateCreated || dateUpdated) {
        return {
            byline: updatedBy ? (React.createElement("span", null,
                "Updated by ",
                updatedBy,
                " ",
                React.createElement(FormattedRelative, { value: dateUpdated }))) : (React.createElement("span", null,
                "Created by ",
                attributedTo,
                " ",
                React.createElement(FormattedRelative, { value: dateCreated }))),
        };
    }
    return {};
};
export var setRepositoryContext = function (props, json) {
    var nextProps = tslib_1.__assign({}, props);
    if (nextProps.context && json.generator && json.context) {
        nextProps.context.text = json.generator.name + " / " + json.context.name;
    }
    return nextProps;
};
export var setRepositoryDetails = function (props, json) {
    var nextProps = tslib_1.__assign({}, props);
    if (json['schema:programmingLanguage']) {
        nextProps.details = nextProps.details || [];
        nextProps.details.push({
            title: 'Language',
            text: json['schema:programmingLanguage'],
        });
    }
    if (json['atlassian:subscriberCount']) {
        nextProps.details = nextProps.details || [];
        nextProps.details.push({
            title: 'Subscribers',
            text: json['atlassian:subscriberCount'],
        });
    }
    return nextProps;
};
export function extractPropsFromSourceCodeRepository(json) {
    var props = extractPropsFromObject(json);
    props = setRepositoryContext(props, json);
    props = setRepositoryDetails(props, json);
    return tslib_1.__assign({}, buildRepositoryLink(json), buildRepositoryTitle(json), buildRepositoryDescription(json), buildRepositoryByline(json), props);
}
//# sourceMappingURL=extractPropsFromSourceCodeRepository.js.map