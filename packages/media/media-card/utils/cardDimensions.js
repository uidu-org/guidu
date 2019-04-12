// Default dimensions
export var defaultSmallCardDimensions = {
    width: '100%',
    height: 42,
};
export var defaultImageCardDimensions = {
    width: 156,
    height: 125,
};
export var defaultHorizontalCardDimensions = {
    width: 435,
    height: 125,
};
export var defaultSquareCardDimensions = {
    width: 300,
    height: 300,
};
// Small dimensions
export var minSmallCardDimensions = {
    width: 200,
    height: 32,
};
export var minImageCardDimensions = {
    width: 144,
    height: 96,
};
export var minSquareCardDimensions = {
    width: 272,
    height: 275,
};
export var minHorizontalCardDimensions = {
    width: 400,
    height: 125,
};
// Max dimensions
export var maxImageCardDimensions = {
    width: 480,
    height: 360,
};
export var maxHorizontalCardDimensions = {
    width: 400,
    height: 116,
};
export var maxSquareCardDimensions = {
    width: 400,
    height: 348,
};
export var getCardMaxHeight = function (appearance) {
    if (appearance === 'image') {
        return maxImageCardDimensions.height;
    }
    if (appearance === 'horizontal') {
        return maxHorizontalCardDimensions.height;
    }
    if (appearance === 'square') {
        return maxSquareCardDimensions.height;
    }
    return maxSquareCardDimensions.width;
};
export var getCardMinWidth = function (appearance) {
    if (appearance === 'image') {
        return minImageCardDimensions.width;
    }
    if (appearance === 'horizontal') {
        return minHorizontalCardDimensions.width;
    }
    if (appearance === 'square') {
        return minSquareCardDimensions.width;
    }
    return minSmallCardDimensions.width;
};
export var getCardMaxWidth = function (appearance) {
    if (appearance === 'image') {
        return maxImageCardDimensions.width;
    }
    if (appearance === 'horizontal') {
        return maxHorizontalCardDimensions.width;
    }
    if (appearance === 'square') {
        return maxSquareCardDimensions.width;
    }
    return maxSquareCardDimensions.width;
};
export var getDefaultCardDimensions = function (appearance) {
    if (appearance === 'image') {
        return defaultImageCardDimensions;
    }
    if (appearance === 'square') {
        return defaultSquareCardDimensions;
    }
    if (appearance === 'horizontal') {
        return defaultHorizontalCardDimensions;
    }
    return defaultImageCardDimensions;
};
//# sourceMappingURL=cardDimensions.js.map