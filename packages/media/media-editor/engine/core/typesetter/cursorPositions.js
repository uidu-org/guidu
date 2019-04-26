import { getUtf32CodeUnits } from '../../../util';
// Tolerance to compare values for equality. It's for screen units, we don't need high precision
var screenUnitsTolerance = 1;
// Gets x coordinates of cursors for one line.
// For a text containing N characters (UTF-32 code units) we must produce N + 1 cursor positions.
//
// Note: textHelperDiv must already have font and direction with which the text is rendered
export var getCursorPositions = function (text, direction, textHelperDiv) {
    if (text.length === 0) {
        return [0];
    }
    // We need a root span where we will put other spans
    var rootSpan = document.createElement('span');
    textHelperDiv.appendChild(rootSpan);
    var cursors = detectCursorPositions(getUtf32CodeUnits(text), direction, rootSpan);
    textHelperDiv.removeChild(rootSpan);
    return cursors;
};
// In short:
//
// 1) We extract groups from the text. A group is a single whitespace character or an array of characters that have same direction.
//    We loop through the text in the logical order (how it is stored in memory).
// 2) When we will assign positions at the next step, it's better (for consistency) to loop through the groups in their visual order
//    (how they are displayed on the screen).
//    So we reorder the groups. We don't mess any data because each group holds the start index in the original text.
// 3) For each group we assign a cursor position at the beginning of the group and inside it.
// 4) We assign the last cursor position.
var detectCursorPositions = function (text, direction, rootSpan) {
    var cursorCount = text.length + 1;
    var cursors = initCursorsArray(cursorCount); // initial cursors array with zeros
    var groups = getGroups(text, direction, rootSpan);
    var totalLength = calculateTotalLength(groups);
    // Reorder groups so that they are ordered left-to-right like they appear on the screen
    groups.sort(function (a, b) { return a.xmin - b.xmin; });
    // We're ready to find the cursor positions.
    // For each group we'll put the start position:
    //   - for a 'ltr' group it's the leftmost position
    //   - for a 'rtl' group it's the rightmost position.
    // Then we set the internal positions inside a group.
    //
    // Finally we set the last cursor position.
    if (direction === 'rtl') {
        groups.forEach(function (group) {
            cursors[group.startIndex] = group.xmax;
            setInternalCursorPositions(group, rootSpan, cursors);
        });
        // The text direction is 'rtl', so the text ends at the leftmost position
        cursors[cursorCount - 1] = -totalLength;
    }
    else {
        groups.forEach(function (group) {
            cursors[group.startIndex] = group.xmin;
            setInternalCursorPositions(group, rootSpan, cursors);
        });
        // The text direction is 'ltr', so the text ends at the rightmost position
        cursors[cursorCount - 1] = totalLength;
    }
    return cursors;
};
// Gets the array for cursor position filled with zeros
var initCursorsArray = function (length, value) {
    if (value === void 0) { value = 0; }
    return Array.apply(null, { length: length }).map(function () { return value; });
};
// Extracting groups from the text
var getGroups = function (text, baseDirection, rootSpan) {
    // We extract groups in several steps:
    // 1) We detect groups of text that are either a single whitespace or have the same direction.
    // 2) We calculate start index for each group.
    // 3) We determine xmin and xmax for each group by putting a group into a span.
    var baseGroups = extractBaseGroups(text, baseDirection, rootSpan);
    var startIndices = getGroupStartIndices(baseGroups);
    var groupXMinMax = getGroupXMinMax(baseGroups, baseDirection, rootSpan);
    // Then we combine the results and return the groups
    return baseGroups.map(function (baseGroup, index) {
        var text = baseGroup.text;
        var direction = baseGroup.direction || baseDirection;
        var startIndex = startIndices[index];
        var _a = groupXMinMax[index], xmin = _a.xmin, xmax = _a.xmax;
        return { text: text, direction: direction, startIndex: startIndex, xmin: xmin, xmax: xmax };
    });
};
var extractBaseGroups = function (text, direction, rootSpan) {
    // We create a temporary span where we will put spans containig every character.
    var parentSpan = document.createElement('span');
    parentSpan.style.direction = direction;
    rootSpan.appendChild(parentSpan);
    var spans = createSpansForCharacters(text, parentSpan);
    var result = [];
    // Data for the group being extracted
    var currentText = [];
    var currentDirection;
    text.forEach(function (character, index) {
        if (isWhiteSpace(character)) {
            // The current character is a whitespace. It forms one group.
            // If we were extracting a group before, we put it to the result.
            if (currentText.length !== 0) {
                result.push({ text: currentText, direction: currentDirection });
                currentText = [];
                currentDirection = undefined;
            }
            // One whitespace forms a group
            result.push({ text: [character], direction: undefined });
        }
        else {
            // The character is not a whitespace
            if (currentText.length === 0) {
                // We only start to extract a group
                currentText.push(character);
            }
            else {
                // We determine direction based on the previous character
                var dir = getDirection(index, spans);
                // If we could not detect direction (currently we are at the second character of a group),
                // or it is different than the current, we will start a new group
                if (!dir || (currentDirection && currentDirection !== dir)) {
                    result.push({ text: currentText, direction: currentDirection }); // put previous to the result
                    currentText = [character]; // start a new group
                }
                else {
                    // we continue pushing characters into the current group
                    currentText.push(character);
                }
                currentDirection = dir;
            }
        }
    });
    // If we were extracting a group before, we put it to the result
    if (currentText.length !== 0) {
        result.push({ text: currentText, direction: currentDirection });
    }
    rootSpan.removeChild(parentSpan);
    return result;
};
export var isWhiteSpace = function (codeUnit) {
    return codeUnit === ' ' || codeUnit === '\t'; // currently we don't support tabs, but they can be added
};
// Determines if two values are close
export var isClose = function (x1, x2) {
    return Math.abs(x1 - x2) < screenUnitsTolerance;
};
// Gets the direction based on the previous character
export var getDirection = function (index, spans) {
    if (index <= 0 || index >= spans.length) {
        return undefined;
    }
    var previousRect = spans[index - 1].getBoundingClientRect();
    var currentRect = spans[index].getBoundingClientRect();
    if (isClose(previousRect.right, currentRect.left)) {
        //  | previous || current |
        return 'ltr';
    }
    else if (isClose(previousRect.left, currentRect.right)) {
        //  | current || previous |
        return 'rtl';
    }
    else {
        return undefined;
    }
};
export var getGroupStartIndices = function (baseGroups) {
    var index = 0;
    return baseGroups.map(function (group) {
        var groupIndex = index;
        index += group.text.length;
        return groupIndex;
    });
};
export var getGroupXMinMax = function (baseGroups, direction, rootSpan) {
    // We create a temporary span where we will put spans for every group to get their xmin, xmax
    var parentSpan = document.createElement('span');
    parentSpan.style.direction = direction;
    rootSpan.appendChild(parentSpan);
    // Wrap each group into a span
    var spans = createSpansForGroups(baseGroups, parentSpan);
    // Get x origin of the line. Currently we have spans for each group inside parentSpan
    // For 'rtl' direction the line starts at the rightmost position,
    // for 'ltr' direction the line starts at the leftmost position.
    var parentSpanRect = parentSpan.getBoundingClientRect();
    var xorigin = direction === 'rtl' ? parentSpanRect.right : parentSpanRect.left;
    var groupXMinMax = spans.map(function (span) {
        var rect = span.getBoundingClientRect();
        return {
            xmin: rect.left - xorigin,
            xmax: rect.right - xorigin,
        };
    });
    rootSpan.removeChild(parentSpan);
    return groupXMinMax;
};
// Wrap each character into a span
export var createSpansForCharacters = function (text, parent) {
    return text.map(function (character) {
        var span = document.createElement('span');
        span.innerText = character;
        parent.appendChild(span);
        return span;
    });
};
// Wrap each group into a span
export var createSpansForGroups = function (baseGroups, parent) {
    return baseGroups.map(function (group) {
        var span = document.createElement('span');
        span.innerText = group.text.join('');
        parent.appendChild(span);
        return span;
    });
};
// Gets the total length of all groups. Sums the lengths of all groups
export var calculateTotalLength = function (groups) {
    return groups
        .map(function (group) { return group.xmax - group.xmin; })
        .reduce(function (prev, curr) { return prev + curr; }, 0);
};
// Setting cursor positions inside a group
var setInternalCursorPositions = function (group, rootSpan, cursors) {
    if (group.text.length < 2) {
        // No internal cursor positions, nothing to do
        return;
    }
    // To detect cursor positions inside a group we'll need additional span
    var span = document.createElement('span');
    span.style.direction = group.direction;
    rootSpan.appendChild(span);
    if (group.direction === 'rtl') {
        putInternalPositions(group.text, span, cursors, group.startIndex, function (spanWidth) { return group.xmax - spanWidth; }, // for 'rtl' groups we calculate from the right side
        function (// for 'rtl' groups we calculate from the right side
        pos) { return Math.max(pos, group.xmin); });
    }
    else {
        putInternalPositions(group.text, span, cursors, group.startIndex, function (spanWidth) { return group.xmin + spanWidth; }, // for 'ltr' groups we calculate from the left side
        function (// for 'ltr' groups we calculate from the left side
        pos) { return Math.min(pos, group.xmax); });
    }
    rootSpan.removeChild(span);
};
// Records internal cursor positions of a group into the cursors array.
// Uses a helper span. At every step adds a new character to the helper span.
// Calls posCalculator to get the cursor position based on the span width,
// then posLimiter to adjust the calculated cursor positions to the borders of the group.
//
// To understand the function better, let's look at the simple example. Let our group is 'lwqi', starts from x = 15.
// Let 'l' is 10 pixels wide, 'w' - 14, 'q' - 12
// Let our posCalculator function just return the (span width + group.xmin), i.e. (span width + 15)
//
// Step (i)    Span content       Span width          Calculated cursor position
// -----------------------------------------------------------------------------
//    1            l                 10                       25
//    2            lw                24                       39
//    3            lwq               36                       51
//
//
// Group starts from x = 15
//
//   |   l   |     w     |   q   |  i  |
//           25          39      51          - calculated values
export var putInternalPositions = function (text, span, cursors, startIndex, posCalculator, posLimiter) {
    for (var i = 1; i < text.length; ++i) {
        span.innerText = text.slice(0, i).join('');
        var rect = span.getBoundingClientRect();
        var pos = posCalculator(rect.right - rect.left);
        cursors[startIndex + i] = posLimiter(pos);
    }
};
//# sourceMappingURL=cursorPositions.js.map