// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@atlaskit/analytics-next', function () { return ({
    withAnalyticsEvents: jest.fn(function () { return jest.fn(function () { return function () { return null; }; }); }),
    withAnalyticsContext: jest.fn(function () { return jest.fn(function () { return function () { return null; }; }); }),
    createAndFireEvent: jest.fn(function () { return jest.fn(function (args) { return args; }); }),
}); });
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent, } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion, } from '../../../version.json';
import '../../../components/Button';
describe('Button', function () {
    it('should be wrapped with analytics context', function () {
        expect(withAnalyticsContext).toHaveBeenCalledWith({
            componentName: 'button',
            packageName: packageName,
            packageVersion: packageVersion,
        });
    });
    it('should be wrapped with analytics events', function () {
        expect(createAndFireEvent).toHaveBeenCalledWith('atlaskit');
        expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
            onClick: {
                action: 'clicked',
                actionSubject: 'button',
                attributes: {
                    componentName: 'button',
                    packageName: packageName,
                    packageVersion: packageVersion,
                },
            },
        });
    });
});
//# sourceMappingURL=analytics.js.map