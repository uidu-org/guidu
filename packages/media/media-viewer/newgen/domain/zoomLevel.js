var BASE_ZOOM_LEVELS = [0.06, 0.12, 0.24, 0.48, 1, 1.5, 2, 4, 6, 8];
var sortNumbers = function (nums) { return nums.sort(function (a, b) { return a - b; }); }; // default sorting is alphabetically
var deduplicated = function (nums) {
    return sortNumbers(nums).filter(function (num, pos) { return pos === 0 || num !== nums[pos - 1]; });
};
var ZoomLevel = /** @class */ (function () {
    function ZoomLevel(initialValue, selectedValue) {
        this.initialValue = initialValue;
        if (!selectedValue) {
            selectedValue = initialValue;
        }
        if (selectedValue < this.min) {
            this.value = this.min;
        }
        else if (selectedValue > this.max) {
            this.value = this.max;
        }
        else {
            this.value = selectedValue;
        }
    }
    Object.defineProperty(ZoomLevel.prototype, "zoomLevels", {
        get: function () {
            var _this = this;
            return deduplicated(sortNumbers(BASE_ZOOM_LEVELS.map(function (zoomLevel) { return zoomLevel * _this.initialValue; }).concat(1))); // and that all levels are ordered
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomLevel.prototype, "min", {
        get: function () {
            return this.zoomLevels[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomLevel.prototype, "max", {
        get: function () {
            return this.zoomLevels.slice(-1)[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomLevel.prototype, "asPercentage", {
        get: function () {
            return Math.round(this.value * 100) + " %";
        },
        enumerable: true,
        configurable: true
    });
    ZoomLevel.prototype.zoomIn = function () {
        var index = this.zoomLevels.indexOf(this.value);
        var nextValue = this.zoomLevels[index + 1];
        return nextValue ? new ZoomLevel(this.initialValue, nextValue) : this;
    };
    ZoomLevel.prototype.zoomOut = function () {
        var index = this.zoomLevels.indexOf(this.value);
        var nextValue = this.zoomLevels[index - 1];
        return nextValue ? new ZoomLevel(this.initialValue, nextValue) : this;
    };
    ZoomLevel.prototype.fullyZoomIn = function () {
        return new ZoomLevel(this.initialValue, this.max);
    };
    ZoomLevel.prototype.fullyZoomOut = function () {
        return new ZoomLevel(this.initialValue, this.min);
    };
    Object.defineProperty(ZoomLevel.prototype, "canZoomIn", {
        get: function () {
            return this.value < this.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomLevel.prototype, "canZoomOut", {
        get: function () {
            return this.value > this.min;
        },
        enumerable: true,
        configurable: true
    });
    return ZoomLevel;
}());
export { ZoomLevel };
//# sourceMappingURL=zoomLevel.js.map