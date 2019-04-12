// Utility used to know if the integrator is using percentage values
export var isValidPercentageUnit = function (value) {
    var valueString = "" + value;
    return (valueString[valueString.length - 1] === '%' &&
        !isNaN(+valueString.slice(0, -1)));
};
//# sourceMappingURL=isValidPercentageUnit.js.map