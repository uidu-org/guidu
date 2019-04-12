import * as Rusha from 'rusha';
var SimpleHasher = /** @class */ (function () {
    function SimpleHasher() {
    }
    SimpleHasher.prototype.hash = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onload = function () {
                resolve(Rusha.createHash()
                    .update(reader.result)
                    .digest('hex'));
            };
            reader.onerror = reject;
        });
    };
    return SimpleHasher;
}());
export { SimpleHasher };
//# sourceMappingURL=simpleHasher.js.map