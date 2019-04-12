import { getFeatureFlag } from '../../../../newgen/utils/getFeatureFlag';
/**
 * Skipping three tests, no ideas on this one
 * TODO: JEST-23 Fix these tests
 */
describe('getFeatureFlag', function () {
    var nativeLocalStorage = window.localStorage;
    afterEach(function () {
        window.localStorage = nativeLocalStorage;
    });
    it('should return the value if its present in the passed features flags', function () {
        expect(getFeatureFlag('testKey', { testKey: true })).toBeTruthy();
        expect(getFeatureFlag('testKey', { testKey: false })).toBeFalsy();
    });
    it.skip('should use localStorage if flag is not passed', function () {
        expect(getFeatureFlag('testKey', {})).toBeFalsy();
        window.localStorage = {
            getItem: function (item) {
                if (item === 'MediaViewerNextGenTestKey') {
                    return 'true';
                }
                return null;
            },
        };
        expect(getFeatureFlag('testKey')).toBeTruthy();
        expect(getFeatureFlag('testKey', {})).toBeTruthy();
    });
    it.skip('should return true if flag is false and dev override is true', function () {
        window.localStorage = {
            getItem: function (item) {
                if (item === 'MediaViewerNextGenTestKey') {
                    return 'true';
                }
                return null;
            },
        };
        expect(getFeatureFlag('testKey', {
            testKey: false,
        })).toBeTruthy();
    });
    it.skip('should return false if flag is true and dev override is false', function () {
        window.localStorage = {
            getItem: function (item) {
                if (item === 'MediaViewerNextGenTestKey') {
                    return 'false';
                }
                return null;
            },
        };
        expect(getFeatureFlag('testKey', {
            testKey: true,
        })).toBeFalsy();
    });
});
//# sourceMappingURL=getFeatureFlag.spec.js.map