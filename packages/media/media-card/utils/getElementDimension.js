import * as ReactDOM from 'react-dom';
export var getElementDimension = function (component, dimension) {
    var element = ReactDOM.findDOMNode(component);
    var dimensionValue = element.getBoundingClientRect()[dimension];
    return Math.round(dimensionValue);
};
//# sourceMappingURL=getElementDimension.js.map