import { genericExtractPropsFromJSONLD } from '../genericExtractPropsFromJSONLD';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { extractInlineViewPropsFromTask } from './extractPropsFromTask';
import { extractInlineViewPropsFromTextDocument } from './extractPropsFromTextDocument';
import { extractInlineViewPropsFromBlogPost } from './extractPropsFromBlogPost';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
import { extractInlineViewPropsFromProject } from './extractPropsFromProject';
import { extractInlineViewPropsFromTemplate } from './extractPropsFromTemplate';
import { extractInlineViewPropsFromSourceCodeRepository } from './extractPropsFromSourceCodeRepository';
import { extractInlineViewPropsFromSourceCodePullRequest } from './extractPropsFromSourceCodePullRequest';
import { extractInlineViewPropsFromSourceCodeReference } from './extractPropsFromSourceCodeReference';
import { extractInlineViewPropsFromDigitalDocument } from './extractPropsFromDigitalDocument';
var extractorPrioritiesByType = {
    Object: 0,
    Document: 5,
    'schema:TextDigitalDocument': 10,
    'schema:DigitalDocument': 10,
    'schema:BlogPosting': 10,
    'atlassian:Task': 10,
    'atlassian:Project': 10,
    'atlassian:Template': 10,
    'atlassian:SourceCodeRepository': 10,
    'atlassian:SourceCodePullRequest': 10,
    'atlassian:SourceCodeReference': 10,
};
var extractorFunctionsByType = {
    Object: extractInlineViewPropsFromObject,
    Document: extractInlineViewPropsFromDocument,
    'schema:TextDigitalDocument': extractInlineViewPropsFromTextDocument,
    'schema:DigitalDocument': extractInlineViewPropsFromDigitalDocument,
    'schema:BlogPosting': extractInlineViewPropsFromBlogPost,
    'atlassian:Task': extractInlineViewPropsFromTask,
    'atlassian:Project': extractInlineViewPropsFromProject,
    'atlassian:Template': extractInlineViewPropsFromTemplate,
    'atlassian:SourceCodeRepository': extractInlineViewPropsFromSourceCodeRepository,
    'atlassian:SourceCodePullRequest': extractInlineViewPropsFromSourceCodePullRequest,
    'atlassian:SourceCodeReference': extractInlineViewPropsFromSourceCodeReference,
};
export function extractInlinePropsFromJSONLD(json) {
    return genericExtractPropsFromJSONLD({
        extractorPrioritiesByType: extractorPrioritiesByType,
        extractorFunctionsByType: extractorFunctionsByType,
        defaultExtractorFunction: extractInlineViewPropsFromObject,
        json: json,
    });
}
//# sourceMappingURL=index.js.map