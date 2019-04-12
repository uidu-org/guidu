import { isIE } from '../../../../newgen/utils/isIE';
describe('isIE', function () {
    it('should return false for Chrome', function () {
        var navigator = {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
            appVersion: '5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        };
        expect(isIE(navigator)).toBeFalsy();
    });
    it('should return false for Firefox', function () {
        var navigator = {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:59.0) Gecko/20100101 Firefox/59.0',
            appVersion: '5.0 (Macintosh)',
        };
        expect(isIE(navigator)).toBeFalsy();
    });
    it('should return false for Safari', function () {
        var navigator = {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7',
            appVersion: '5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7',
        };
        expect(isIE(navigator)).toBeFalsy();
    });
    it('should return true for IE', function () {
        var navigator = {
            userAgent: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko',
            appVersion: '5.0 (Windows NT 6.3; Trident/7.0; .NET4.0E; .NET4.0E; rv:11.0) like Gecko',
        };
        expect(isIE(navigator)).toBeTruthy();
    });
});
//# sourceMappingURL=isIE.spec.js.map