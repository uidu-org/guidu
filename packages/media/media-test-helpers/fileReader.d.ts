/// <reference types="jest" />
declare class MockFileReader {
    loadEvent: () => void;
    errorEvent: (_: {}) => void;
    result: string | null | ArrayBuffer;
    constructor(result?: string | null | ArrayBuffer);
    addEventListener: jest.Mock<any, any>;
    readAsDataURL: jest.Mock<any, any>;
    readAsArrayBuffer: jest.Mock<any, any>;
}
declare const mockFileReaderError: {
    message: string;
};
declare class MockFileReaderWithError extends MockFileReader {
    readAsDataURL: jest.Mock<any, any>;
}
declare const mockFileReader: (result: string | ArrayBuffer) => MockFileReader;
declare const mockFileReaderWithError: () => MockFileReaderWithError;
declare const unmockFileReader: () => any;
export { mockFileReader, mockFileReaderWithError, unmockFileReader, mockFileReaderError, };
