"use strict";
if (typeof jest === 'undefined') {
    // We need to do this since jest is not defined on browser integration tests
    global.jest = {
        fn: function () { return ({
            mockReturnValue: function () { },
            mockImplementation: function () { },
            mockResolvedValue: function () { },
        }); },
        spyOn: function () { return ({ mockImplementation: function () { } }); },
    };
}
//# sourceMappingURL=jest_check.js.map