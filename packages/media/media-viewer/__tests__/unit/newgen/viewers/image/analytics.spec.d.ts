/// <reference types="jest" />
import * as React from 'react';
export declare function createFixture(response: Promise<Blob>): {
    context: import("../../../../../../../media-core").Context;
    el: import("enzyme").ReactWrapper<any, {}, React.Component<{}, {}, any>>;
    onClose: jest.Mock<any, any>;
};
