export var createMouseEvent = function (name, props) {
    if (props === void 0) { props = {}; }
    var mb = props.mouseButton, cx = props.clientX, cy = props.clientY, sx = props.screenX, sy = props.screenY;
    if (document.createEvent) {
        var event_1 = document.createEvent('MouseEvent');
        event_1.initMouseEvent(name, true, true, window, 0, sx || 0, sy || 0, cx || 0, cy || 0, false, false, false, false, mb || 0, null);
        return event_1;
    }
    return new MouseEvent(name, {
        button: mb,
        clientX: cx || 0,
        clientY: cy || 0,
    });
};
//# sourceMappingURL=createMouseEvent.js.map