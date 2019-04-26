import { ExportedImage, ShapeParameters, TextDirection, Tool } from '../common';
import { DrawingArea } from './components/drawingArea';
import { ImageProvider } from './components/imageProvider';
import { MouseInput } from './components/mouseInput';
import { Toolbar } from './components/toolbar';
import { KeyboardInput } from './components/keyboardInput';
import { ImageReceiver } from './components/imageReceiver';
import { ShapeDeleter } from './components/shapeDeleter';
export declare type CoreErrorHandler = (message: string) => void;
export interface EngineConfig {
    onCoreError: CoreErrorHandler;
    shapeParameters: ShapeParameters;
    initialTool: Tool;
    textDirection: TextDirection;
    drawingArea: DrawingArea;
    imageProvider: ImageProvider;
    mouseInput: MouseInput;
    toolbar: Toolbar;
    keyboardInput: KeyboardInput;
    imageReceiver: ImageReceiver;
    shapeDeleter: ShapeDeleter;
}
export declare class Engine {
    private config;
    private resourceManager;
    private module;
    private ve;
    private bitmapExporter;
    constructor(config: EngineConfig);
    unload(): void;
    getBase64Image(format?: string): ExportedImage;
    private addComponentsToResourceManager;
    private subscribeToComponentsSignals;
    private createNativeCore;
    private initModule;
    private createVeEngine;
    private veCall;
    private toVeTool;
    private toTextCommand;
    private toTextDirection;
    private passTimerTick;
}
