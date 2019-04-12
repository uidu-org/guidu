export var createTouchEvent = function (name, props) {
    if (props === void 0) { props = { touches: [] }; }
    var touches = props.touches;
    return new TouchEvent(name, {
        cancelable: true,
        bubbles: true,
        touches: touches,
        targetTouches: [],
        changedTouches: touches,
        shiftKey: true,
    });
};
//# sourceMappingURL=createTouchEvent.js.map