/// <reference types="jest" />
export declare const asMock: (fn: Function) => jest.Mock<any, any>;
export declare const expectToEqual: <T>(actual: T, expected: T) => T;
export declare type ExpectFunctionToHaveBeenCalledWith = <T extends (...args: any[]) => any>(func: T, expectedArgs: Parameters<T>) => void;
export declare type ExpectConstructorToHaveBeenCalledWith = <T extends new (...args: any[]) => any>(func: T, expectedArgs: ConstructorParameters<T>) => void;
export declare const expectConstructorToHaveBeenCalledWith: ExpectConstructorToHaveBeenCalledWith;
export declare const expectFunctionToHaveBeenCalledWith: ExpectFunctionToHaveBeenCalledWith;
