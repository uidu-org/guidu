import { Fragment } from './fragment';
import { FontInfo } from './fontInfo';
// Renders one line of the text. Pushes new fragments to the 'fragments' array
export var renderText = function (fragments, config) {
    var direction = config.direction, canvas = config.supplementaryCanvas, gl = config.gl;
    var measures = measureText(config);
    if (!measures) {
        return false;
    }
    setCanvasSize(canvas, measures);
    var previousDirection = setCanvasDir(canvas, direction);
    var normalTextures = generateTextures(config, measures, renderNormalText);
    var strokeTextures = generateTextures(config, measures, renderStroke);
    canvas.dir = previousDirection; // restore text direction
    // We need to check the generated textures. Their amount must be the same and all of them must be valid
    var generationCompleted = normalTextures.length === strokeTextures.length &&
        normalTextures.every(function (tex) { return !!tex.texture; }) &&
        strokeTextures.every(function (tex) { return !!tex.texture; });
    if (!generationCompleted) {
        // An unexpected error occured. We should delete all the textures and return false
        deleteTextures(gl, normalTextures);
        deleteTextures(gl, strokeTextures);
        return false;
    }
    // Combine the generated textures for the normal text and stroke. They have the same positions
    normalTextures.forEach(function (generatedNormal, index) {
        var generatedStroke = strokeTextures[index];
        var normal = generatedNormal.texture;
        var stroke = generatedStroke.texture;
        var position = generatedNormal.position;
        if (normal && stroke) {
            fragments.push(new Fragment(gl, normal, stroke, position));
        }
    });
    return true;
};
// Gets measures of the text that should be rendered
var measureText = function (config) {
    var text = config.text, direction = config.direction, fontSize = config.fontSize, fontInfo = config.fontInfo, supplementaryCanvas = config.supplementaryCanvas;
    // We will use '2d' context of the canvas to measure the text
    var context = supplementaryCanvas.getContext('2d');
    if (!context) {
        return null;
    }
    // Firstly we will detect the "pure" width and height of the text, without any offsets.
    var fontMetrics = fontInfo.getFontMetrics(fontSize);
    context.font = FontInfo.getFontStyle(fontSize);
    var pureWidth = context.measureText(text).width;
    var pureHeight = fontMetrics.lineHeight;
    // "Pure" width and height are rough values, estimations.
    // If we apply them directly, we can have our rendered text clipped. Thus we will add some offset.
    // Offset value was adjusted manually.
    // Also "pure" width and height don't consider stroke thickness, we need to add it as well.
    var strokeThickness = getStrokeThickness(fontSize);
    var offset = Math.round(Math.min(fontSize / 2, 5)) + strokeThickness;
    var width = Math.round(offset + pureWidth + offset);
    var height = Math.round(offset + pureHeight + offset);
    // If the direction is right-to-left, the text starts at the rightmost position
    var x = Math.round(direction === 'rtl' ? width - offset : offset);
    var y = Math.round(height - offset); // y on canvas context is measured from the top
    return { width: width, height: height, x: x, y: y, yoffset: offset, descent: fontMetrics.descent };
};
// Gets the thickness of the stroke depending on the font size.
// The numbers were adjusted manually.
var getStrokeThickness = function (fontSize) {
    return Math.round(Math.max(fontSize / 12, 2));
};
var setCanvasSize = function (canvas, measures) {
    canvas.width = measures.width;
    canvas.height = measures.height;
};
// Sets canvas diretion, returns the previous direction
var setCanvasDir = function (canvas, textDirection) {
    var previousDirection = canvas.dir;
    canvas.dir = textDirection;
    return previousDirection;
};
// Renders the text on the canvas and gets textures containing the rendered text.
// Rendering the normal text and stroke differs only in the text rendering. You should pass this function
// in the 'renderer' parameter.
//
// Also note that we need alpha textures as the result, where pixel 0 is transparent, 255 - opaque.
// Thus we will render white text on the black canvas. Then when we can copy any channel (R, G, or B) to the result texture.
var generateTextures = function (config, measures, renderer) {
    var text = config.text, fontSize = config.fontSize, gl = config.gl, canvas = config.supplementaryCanvas;
    var context = canvas.getContext('2d');
    if (!context) {
        return [];
    }
    clearCanvas(context, canvas);
    context.font = FontInfo.getFontStyle(fontSize);
    context.textBaseline = 'bottom';
    renderer(text, context, measures, getStrokeThickness(fontSize));
    return sliceCanvasToTextures(context, gl, measures);
};
var renderNormalText = function (text, context, measures) {
    context.fillStyle = '#FFFFFF';
    context.fillText(text, measures.x, measures.y);
};
var renderStroke = function (text, context, measures, strokeThickness) {
    context.lineJoin = 'round';
    context.strokeStyle = '#FFFFFF';
    // The stroke consists of two parts: the inner and outer, both are rendered with equal thickness: context.lineWidth / 2 each.
    // We need the outer stroke rendered with strokeThickness, thus we need to set context.lineWidth to (2 * strokeThickness).
    context.lineWidth = 2 * strokeThickness;
    context.strokeText(text, measures.x, measures.y);
};
var clearCanvas = function (context, canvas) {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
};
// Produces multiple alpha textures from the canvas with the rendered text.
// Slices the canvas horizontally.
var sliceCanvasToTextures = function (context, gl, measures) {
    var result = [];
    var maxTextureSize = gl.MAX_TEXTURE_SIZE;
    // We include descent to the offset because we used context.textBaseline = 'bottom' for rendering
    // but for the fragment y = 0 at the base line.
    var yoffset = measures.yoffset + measures.descent;
    for (var x = 0; x < measures.width; x += maxTextureSize) {
        var xend = Math.min(x + maxTextureSize, measures.width);
        result.push({
            texture: createTexture(context, gl, x, xend, measures.height),
            position: {
                xbase: x - measures.x,
                ybase: -yoffset,
                xopposite: xend - measures.x,
                yopposite: measures.height - yoffset,
            },
        });
    }
    return result;
};
var createTexture = function (context, gl, xstart, xend, height) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // These parameters are required for non-power-of-two textures (according to WebGL spec)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    var previousAlignment = gl.getParameter(gl.UNPACK_ALIGNMENT);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    var width = xend - xstart;
    var bufferLength = width * height;
    var buffer = new Uint8Array(bufferLength);
    // Copy the region from canvas
    var canvasData = context.getImageData(xstart, 0, width, height);
    for (var i = 0; i < canvasData.data.length; i += 4) {
        buffer[i / 4] = canvasData.data[i]; // we take the R channel
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, width, height, 0, gl.ALPHA, gl.UNSIGNED_BYTE, buffer);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, previousAlignment);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
};
var deleteTextures = function (gl, textures) {
    textures.forEach(function (gen) {
        if (gen.texture) {
            gl.deleteTexture(gen.texture);
        }
    });
};
//# sourceMappingURL=textRenderer.js.map