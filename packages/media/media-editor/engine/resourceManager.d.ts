export interface Resource {
    unload(): void;
}
export declare type ReleaseFunction = () => void;
export declare class ResourceManager {
    private releaseFunctions;
    constructor();
    add(resource: Resource): void;
    addCustom(releaseFunction: ReleaseFunction): void;
    releaseAll(): void;
}
