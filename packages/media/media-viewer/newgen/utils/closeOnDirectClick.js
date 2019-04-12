export function closeOnDirectClick(onClose) {
    return function (e) {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };
}
//# sourceMappingURL=closeOnDirectClick.js.map