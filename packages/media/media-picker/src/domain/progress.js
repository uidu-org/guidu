// TODO these classes are deprecated and will be removed as part of MSW-691
import { handleError } from '../util/handleError';
var SmartMediaProgress = /** @class */ (function () {
    function SmartMediaProgress(size, progress, startTime, measureTime) {
        this.size = size;
        this.progress = progress;
        this.startTime = startTime;
        this.measureTime = measureTime;
        if (!SmartMediaProgress.isValidSize(size)) {
            handleError('wrong_file_size', 'Passed file size is incorrect.');
            return;
        }
        if (!SmartMediaProgress.isValidProgress(size, progress)) {
            handleError('wrong_progress', 'The progress format is incorrect.');
            return;
        }
        if (!SmartMediaProgress.isValidStartTime(startTime)) {
            handleError('wrong_start_time', 'The progress start time has incorrect format.');
            return;
        }
        if (!SmartMediaProgress.isValidMeasureTime(startTime, measureTime)) {
            handleError('wrong_measure_time', 'The progress measure time has incorrect format.');
            return;
        }
        this.size = size;
        this.progress = progress;
        this.startTime = startTime;
        this.measureTime = measureTime;
    }
    Object.defineProperty(SmartMediaProgress.prototype, "absolute", {
        get: function () {
            return this.progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartMediaProgress.prototype, "portion", {
        get: function () {
            return this.progress / this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartMediaProgress.prototype, "max", {
        get: function () {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartMediaProgress.prototype, "overallTime", {
        get: function () {
            return (this.measureTime - this.startTime) / this.portion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartMediaProgress.prototype, "expectedFinishTime", {
        get: function () {
            return this.startTime + this.overallTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmartMediaProgress.prototype, "timeLeft", {
        get: function () {
            return this.expectedFinishTime - this.measureTime;
        },
        enumerable: true,
        configurable: true
    });
    SmartMediaProgress.prototype.toJSON = function () {
        return {
            absolute: this.absolute,
            portion: this.portion,
            max: this.max,
            overallTime: this.overallTime,
            expectedFinishTime: this.expectedFinishTime,
            timeLeft: this.timeLeft,
        };
    };
    SmartMediaProgress.isValidSize = function (size) {
        return typeof size === 'number' && size > 0;
    };
    SmartMediaProgress.isValidProgress = function (size, progress) {
        return (SmartMediaProgress.isValidSize(size) &&
            typeof progress === 'number' &&
            progress >= 0 &&
            progress <= size);
    };
    SmartMediaProgress.isValidStartTime = function (startTime) {
        return typeof startTime === 'number' && startTime > 0;
    };
    SmartMediaProgress.isValidMeasureTime = function (startTime, measureTime) {
        return (SmartMediaProgress.isValidStartTime(startTime) &&
            typeof measureTime === 'number' &&
            measureTime >= startTime);
    };
    return SmartMediaProgress;
}());
export { SmartMediaProgress };
//# sourceMappingURL=progress.js.map