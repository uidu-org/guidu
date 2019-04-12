import * as tslib_1 from "tslib";
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (_a) {
        var thatX = _a.x, thatY = _a.y;
        var _b = this, thisX = _b.x, thisY = _b.y;
        return new Vector2(thisX + thatX, thisY + thatY);
    };
    Vector2.prototype.sub = function (_a) {
        var thatX = _a.x, thatY = _a.y;
        var _b = this, thisX = _b.x, thisY = _b.y;
        return new Vector2(thisX - thatX, thisY - thatY);
    };
    Vector2.prototype.scaled = function (scalar) {
        var _a = this, x = _a.x, y = _a.y;
        return new Vector2(x * scalar, y * scalar);
    };
    Vector2.prototype.map = function (fn) {
        return new Vector2(fn(this.x), fn(this.y));
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.rounded = function () {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    };
    Vector2.prototype.toString = function () {
        return "[" + this.x + ", " + this.y + "]";
    };
    return Vector2;
}());
export { Vector2 };
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rectangle.prototype, "aspectRatio", {
        get: function () {
            return this.width / this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "center", {
        get: function () {
            return new Vector2(this.width / 2, this.height / 2);
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.scaled = function (scale) {
        return new Rectangle(this.width * scale, this.height * scale);
    };
    Rectangle.prototype.resized = function (width, height) {
        return new Rectangle(width, height);
    };
    Rectangle.prototype.flipped = function () {
        return new Rectangle(this.height, this.width);
    };
    // Computes the scaling factor that needs to be applied to this
    // Rectangle so that it
    // - is fully visible inside of the containing Rectangle
    // - is the LARGEST possible size
    // - maintains the original aspect ratio (no distortion)
    Rectangle.prototype.scaleToFit = function (containing) {
        var widthRatio = containing.width / this.width;
        var heightRatio = containing.height / this.height;
        if (widthRatio <= heightRatio) {
            return widthRatio;
        }
        else {
            return heightRatio;
        }
    };
    Rectangle.prototype.scaleToFitLargestSide = function (containing) {
        return this.scaleToFit(containing);
    };
    // Computes the scaling factor that needs to be applied to this
    // Rectangle so that it
    // - is fully visible inside of the containing Rectangle
    // - is the SMALLEST possible size
    // - maintains the original aspect ratio (no distortion)
    Rectangle.prototype.scaleToFitSmallestSide = function (containing) {
        var widthRatio = containing.width / this.width;
        var heightRatio = containing.height / this.height;
        if (widthRatio >= heightRatio) {
            return widthRatio;
        }
        else {
            return heightRatio;
        }
    };
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.width, this.height);
    };
    return Rectangle;
}());
export { Rectangle };
var Bounds = /** @class */ (function (_super) {
    tslib_1.__extends(Bounds, _super);
    function Bounds(x, y, width, height) {
        var _this = _super.call(this, width, height) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Object.defineProperty(Bounds.prototype, "origin", {
        get: function () {
            return new Vector2(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "corner", {
        get: function () {
            return new Vector2(this.x + this.width, this.y + this.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "center", {
        get: function () {
            return new Vector2(this.x + this.width * 0.5, this.y + this.height * 0.5);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "rect", {
        get: function () {
            return new Rectangle(this.width, this.height);
        },
        enumerable: true,
        configurable: true
    });
    Bounds.prototype.flipped = function () {
        var rect = this.rect.flipped();
        return new Bounds(this.x, this.y, rect.width, rect.height);
    };
    Bounds.prototype.scaled = function (scale) {
        return new Bounds(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    };
    Bounds.prototype.relativeTo = function (bounds) {
        return new Bounds(this.x - bounds.x, this.y - bounds.y, this.width, this.height);
    };
    Bounds.prototype.clone = function () {
        return new Bounds(this.x, this.y, this.width, this.height);
    };
    Bounds.prototype.map = function (fn) {
        return new Bounds(fn(this.x), fn(this.y), fn(this.width), fn(this.height));
    };
    Object.defineProperty(Bounds.prototype, "left", {
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "top", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    return Bounds;
}(Rectangle));
export { Bounds };
var Camera = /** @class */ (function () {
    function Camera(viewport, originalImg) {
        this.viewport = viewport;
        this.originalImg = originalImg;
    }
    Camera.prototype.resizedViewport = function (newViewport) {
        return new Camera(newViewport, this.originalImg);
    };
    Object.defineProperty(Camera.prototype, "scaleToFit", {
        get: function () {
            return this.originalImg.scaleToFitLargestSide(this.viewport);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "scaleDownToFit", {
        // If the image is smaller than or equal to the viewport, it won't be scaled.
        // If the image is larger than the viewport, it will be scaled down to fit.
        get: function () {
            return Math.min(1, this.scaleToFit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "fittedImg", {
        get: function () {
            return this.originalImg.scaled(this.scaleDownToFit);
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.scaledImg = function (newScale) {
        return this.originalImg.scaled(newScale);
    };
    Camera.prototype.scaledOffset = function (prevOffset, prevScale, newScale) {
        var viewport = this.viewport;
        return prevOffset
            .add(viewport.center)
            .scaled(newScale / prevScale)
            .sub(viewport.center);
    };
    return Camera;
}());
export { Camera };
//# sourceMappingURL=camera.js.map