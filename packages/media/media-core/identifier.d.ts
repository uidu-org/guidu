export declare type Identifier = FileIdentifier | ExternalImageIdentifier;
export interface FileIdentifier {
    readonly mediaItemType: 'file';
    readonly id: string | Promise<string>;
    readonly occurrenceKey?: string;
    readonly collectionName?: string;
}
export interface ExternalImageIdentifier {
    readonly mediaItemType: 'external-image';
    readonly dataURI: string;
    readonly name?: string;
}
export declare const isFileIdentifier: (identifier: Identifier) => identifier is FileIdentifier;
export declare const isExternalImageIdentifier: (identifier: Identifier) => identifier is ExternalImageIdentifier;
export declare const isDifferentIdentifier: (a: Identifier, b: Identifier) => boolean;
