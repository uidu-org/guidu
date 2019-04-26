import * as tslib_1 from "tslib";
import * as Core from './core/binaries/mediaEditor';
import { ResourceManager } from './resourceManager';
import { BitmapExporter } from './core/bitmapExporter';
import { BitmapProvider } from './core/bitmaps/bitmapProvider';
import { BrowserTypesetter } from './core/typesetter/browserTypesetter';
import { ContextHolder } from './core/contextHolder';
import { TimerFactory } from './core/timerFactory';
var defaultFormat = 'image/png';
var maxColorChannel = 255;
var Engine = /** @class */ (function () {
    function Engine(config) {
        this.config = config;
        this.resourceManager = new ResourceManager();
        try {
            this.addComponentsToResourceManager();
            this.createNativeCore();
            this.subscribeToComponentsSignals();
        }
        catch (error) {
            this.resourceManager.releaseAll();
            throw error;
        }
    }
    Engine.prototype.unload = function () {
        this.resourceManager.releaseAll();
    };
    Engine.prototype.getBase64Image = function (format) {
        try {
            if (!this.ve.exportImage()) {
                return { isExported: false, error: this.ve.failureReason };
            }
            else {
                var image = this.bitmapExporter.getBase64Image(format || defaultFormat);
                return { isExported: true, content: image };
            }
        }
        catch (error) {
            return { isExported: false, error: error.message };
        }
    };
    Engine.prototype.addComponentsToResourceManager = function () {
        var _this = this;
        var _a = this.config, di = _a.drawingArea, ip = _a.imageProvider, mi = _a.mouseInput, tb = _a.toolbar, ki = _a.keyboardInput, ir = _a.imageReceiver, sd = _a.shapeDeleter;
        [di, ip, mi, tb, ki, ir, sd].forEach(function (component) {
            return _this.resourceManager.add(component);
        });
    };
    Engine.prototype.subscribeToComponentsSignals = function () {
        var _this = this;
        var _a = this.config, drawingArea = _a.drawingArea, mouseInput = _a.mouseInput, toolbar = _a.toolbar, keyboardInput = _a.keyboardInput, shapeDeleter = _a.shapeDeleter;
        drawingArea.resize.listen(function (size) {
            _this.veCall('resize', function (ve) { return ve.resize(size); });
        });
        mouseInput.click.listen(function (pos) {
            return _this.veCall('click', function (ve) { return ve.clickOnce(pos); });
        });
        mouseInput.dragStart.listen(function (pos) {
            return _this.veCall('drag start', function (ve) { return ve.dragStart(pos); });
        });
        mouseInput.dragMove.listen(function (pos) {
            return _this.veCall('drag move', function (ve) { return ve.dragMove(pos); });
        });
        mouseInput.dragEnd.listen(function (pos) {
            return _this.veCall('drag end', function (ve) { return ve.dragEnd(pos); });
        });
        mouseInput.dragLost.listen(function () {
            return _this.veCall('drag lost', function (ve) { return ve.dragLost(); });
        });
        toolbar.addShadowChanged.listen(function () {
            // TODO Inform the core about this change
            // https://jira.atlassian.com/browse/FIL-3997
        });
        toolbar.colorChanged.listen(function (color) {
            return _this.veCall('update color', function (ve) { return ve.setColor(color); });
        });
        toolbar.lineWidthChanged.listen(function (lineWidth) {
            return _this.veCall('update line width', function (ve) { return ve.setLineWidth(lineWidth); });
        });
        toolbar.toolChanged.listen(function (tool) {
            return _this.veCall('update tool', function (ve) { return ve.setTool(_this.toVeTool(tool)); });
        });
        keyboardInput.characterPressed.listen(function (code) {
            return _this.veCall('add character', function (ve) { return ve.addCharacter(code); });
        });
        keyboardInput.inputCommand.listen(function (command) {
            return _this.veCall('input command', function (ve) {
                var textCommand = _this.toTextCommand(command);
                return ve.textCommand(textCommand);
            });
        });
        shapeDeleter.deleteShape.listen(function () {
            return _this.veCall('delete shape', function (ve) { return ve.deleteShape(); });
        });
    };
    Engine.prototype.createNativeCore = function () {
        this.module = Core.createModule();
        this.initModule();
        this.createVeEngine();
    };
    Engine.prototype.initModule = function () {
        var _this = this;
        var _a = this.config, drawingArea = _a.drawingArea, toolbar = _a.toolbar, keyboardInput = _a.keyboardInput, imageReceiver = _a.imageReceiver, shapeDeleter = _a.shapeDeleter;
        var contextHolder = new ContextHolder(drawingArea);
        this.resourceManager.add(contextHolder);
        contextHolder.contextLost.listen(function () {
            _this.veCall('context lost notification', function (ve) { return ve.contextLost(); });
        });
        contextHolder.contextRestored.listen(function (outputSize) {
            _this.veCall('context restored notification', function (ve) {
                return ve.contextRestored(outputSize);
            });
        });
        var gl = contextHolder.gl;
        this.module.setContext(gl);
        var bitmapProvider = new BitmapProvider(this.config.imageProvider, gl);
        this.resourceManager.add(bitmapProvider);
        this.module.bitmapProvider = bitmapProvider;
        this.module.handleShapeParametersChanged = function (red, green, blue, lineWidth, addShadow) {
            toolbar.updateByCore({
                color: { red: red, green: green, blue: blue },
                lineWidth: lineWidth,
                addShadow: addShadow,
            });
        };
        this.module.handleTextInputStarted = function () {
            keyboardInput.startInput();
        };
        this.module.handleTextInputEnded = function () {
            keyboardInput.endInput();
        };
        var typesetter = new BrowserTypesetter(tslib_1.__assign({ 
            // TODO: Media migration - TypeScript error - startInput not expected
            gl: gl, module: this.module }, keyboardInput));
        this.resourceManager.add(typesetter);
        this.module.browserTypesetter = typesetter;
        var timerFactory = new TimerFactory(function (id) { return _this.passTimerTick(id); });
        this.resourceManager.add(timerFactory);
        this.module.timerFactory = timerFactory;
        this.bitmapExporter = new BitmapExporter(imageReceiver.supplementaryCanvas, this.module);
        this.module.bitmapExporter = this.bitmapExporter;
        this.module.handleScrollChanged = function () { };
        this.module.handleUndoRedoStateChanged = function () { };
        this.module.handleDeleteShapeStateChanged = function (canDelete) {
            if (canDelete) {
                shapeDeleter.deleteEnabled();
            }
            else {
                shapeDeleter.deleteDisabled();
            }
        };
    };
    Engine.prototype.createVeEngine = function () {
        var _this = this;
        var _a = this.config, shapeParameters = _a.shapeParameters, drawingArea = _a.drawingArea, imageProvider = _a.imageProvider;
        var backImage = imageProvider.backImage, backImageUuid = imageProvider.backImageUuid;
        var initialParameters = {
            shapeColor: shapeParameters.color,
            lineWidth: shapeParameters.lineWidth,
            addShadow: shapeParameters.addShadow,
            tool: this.toVeTool(this.config.initialTool),
            windowSize: drawingArea.outputSize,
            backgroundColor: tslib_1.__assign({ alpha: maxColorChannel }, drawingArea.backgroundColor),
            backBitmapUuid: backImageUuid,
            backBitmapSize: { width: backImage.width, height: backImage.height },
            baseTextDirection: this.toTextDirection(this.config.textDirection),
        };
        this.ve = new this.module.VeEngine();
        this.resourceManager.addCustom(function () {
            _this.ve.delete();
        });
        if (!this.ve.create(initialParameters)) {
            throw new Error("The engine was not created. Error: " + this.ve.failureReason);
        }
        this.veCall('render', function (ve) { return ve.render(); });
    };
    Engine.prototype.veCall = function (description, method) {
        if (!method(this.ve)) {
            this.config.onCoreError("Could not perform '" + description + "'. Reason: '" + this.ve.failureReason + "'");
        }
    };
    Engine.prototype.toVeTool = function (tool) {
        var _a = this.module.VeTool, Arrow = _a.Arrow, Blur = _a.Blur, Line = _a.Line, Brush = _a.Brush, Oval = _a.Oval, Rectangle = _a.Rectangle, Text = _a.Text;
        var nativeTools = {
            arrow: Arrow,
            blur: Blur,
            line: Line,
            brush: Brush,
            oval: Oval,
            rectangle: Rectangle,
            text: Text,
            default: Arrow,
        };
        return nativeTools[tool] || nativeTools['default'];
    };
    Engine.prototype.toTextCommand = function (inputCommand) {
        var _a = this.module.VeTextInputCommand, CompleteInput = _a.CompleteInput, NewLine = _a.NewLine, Backspace = _a.Backspace, Delete = _a.Delete, MoveCursorLeft = _a.MoveCursorLeft, MoveCursorRight = _a.MoveCursorRight, MoveCursorUp = _a.MoveCursorUp, MoveCursorDown = _a.MoveCursorDown;
        var commands = {
            complete: CompleteInput,
            newline: NewLine,
            backspace: Backspace,
            delete: Delete,
            left: MoveCursorLeft,
            right: MoveCursorRight,
            up: MoveCursorUp,
            down: MoveCursorDown,
        };
        return commands[inputCommand];
    };
    Engine.prototype.toTextDirection = function (direction) {
        var _a = this.module.VeTextDirection, RightToLeft = _a.RightToLeft, LeftToRight = _a.LeftToRight;
        return direction === 'rtl' ? RightToLeft : LeftToRight;
    };
    Engine.prototype.passTimerTick = function (id) {
        this.veCall('pass timer tick', function (ve) { return ve.timerTick(id); });
    };
    return Engine;
}());
export { Engine };
//# sourceMappingURL=engine.js.map