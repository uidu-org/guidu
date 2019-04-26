export interface ExtractorFunction<T> {
    (json: any): T;
}
export interface ExtractOptions<T> {
    defaultExtractorFunction: ExtractorFunction<T>;
    extractorPrioritiesByType: {
        [type: string]: number;
    };
    extractorFunctionsByType: {
        [type: string]: ExtractorFunction<T>;
    };
    json: any;
}
export declare function genericExtractPropsFromJSONLD<T>(options: ExtractOptions<T>): T;
