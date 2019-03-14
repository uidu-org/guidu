import { Component } from './component';
import { Color, ShapeParameters, Tool } from '../../common';
import { Signal } from '../signal';

export interface Toolbar extends Component {
  // This function is called by the core to inform about changing of shape parameters
  updateByCore(parameters: ShapeParameters): void;

  // These signals should be emitted when the user clicks on toolbar buttons
  colorChanged: Signal<Color>;
  lineWidthChanged: Signal<number>;
  addShadowChanged: Signal<boolean>;
  toolChanged: Signal<Tool>;
}

export type UpdateByCoreHandler = (parameters: ShapeParameters) => void;

export class DefaultToolbar implements Toolbar {
  readonly colorChanged = new Signal<Color>();
  readonly lineWidthChanged = new Signal<number>();
  readonly addShadowChanged = new Signal<boolean>();
  readonly toolChanged = new Signal<Tool>();

  constructor(private readonly onUpdateByCore: UpdateByCoreHandler) {}

  unload(): void {}

  updateByCore(parameters: ShapeParameters): void {
    this.onUpdateByCore(parameters);
  }

  setColor(color: Color): void {
    this.colorChanged.emit(color);
  }

  setLineWidth(lineWidth: number): void {
    this.lineWidthChanged.emit(lineWidth);
  }

  setAddShadow(addShadow: boolean): void {
    this.addShadowChanged.emit(addShadow);
  }

  setTool(tool: Tool): void {
    this.toolChanged.emit(tool);
  }
}
