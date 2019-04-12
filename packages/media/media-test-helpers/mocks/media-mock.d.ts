export declare type MockUserCollection = {
    [filename: string]: string;
};
export declare class MediaMock {
    private server;
    private collection;
    constructor(collection?: MockUserCollection);
    enable(): void;
    disable(): void;
}
export declare const mediaMock: MediaMock;
