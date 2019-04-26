import { genericExtractPropsFromJSONLD } from '../genericExtractPropsFromJSONLD';
import { extractPropsFromObject } from './extractPropsFromObject';
import { extractPropsFromDocument } from './extractPropsFromDocument';
import { extractPropsFromSpreadsheet } from './extractPropsFromSpreadsheet';
import { extractBlockViewPropsFromTask } from './extractPropsFromTask';
import { extractPropsFromPresentation } from './extractPropsFromPresentation';
import { extractPropsFromTextDocument } from './extractPropsFromTextDocument';
import { extractBlockViewPropsFromProject } from './extractPropsFromProject';
import { extractPropsFromSourceCodeRepository } from './extractPropsFromSourceCodeRepository';
var extractorPrioritiesByType = {
    Object: 0,
    Document: 5,
    'schema:TextDigitalDocument': 10,
    'schema:SpreadsheetDigitalDocument': 10,
    'schema:PresentationDigitalDocument': 10,
    Spreadsheet: 10,
    'atlassian:Task': 10,
    'atlassian:Project': 10,
    'atlassian:SourceCodeRepository': 10,
};
var extractorFunctionsByType = {
    Object: extractPropsFromObject,
    'schema:TextDigitalDocument': extractPropsFromTextDocument,
    'schema:SpreadsheetDigitalDocument': extractPropsFromSpreadsheet,
    'schema:PresentationDigitalDocument': extractPropsFromPresentation,
    Document: extractPropsFromDocument,
    Spreadsheet: extractPropsFromSpreadsheet,
    Presentation: extractPropsFromPresentation,
    'atlassian:Task': extractBlockViewPropsFromTask,
    'atlassian:Project': extractBlockViewPropsFromProject,
    'atlassian:SourceCodeRepository': extractPropsFromSourceCodeRepository,
};
export function extractBlockPropsFromJSONLD(json) {
    return genericExtractPropsFromJSONLD({
        extractorPrioritiesByType: extractorPrioritiesByType,
        extractorFunctionsByType: extractorFunctionsByType,
        defaultExtractorFunction: extractPropsFromObject,
        json: json,
    });
}
//# sourceMappingURL=index.js.map