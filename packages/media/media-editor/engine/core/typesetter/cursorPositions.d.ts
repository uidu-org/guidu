import { TextDirection } from '../../../common';
export declare type Text = Array<string>;
export interface Group {
    text: Text;
    direction: TextDirection;
    startIndex: number;
    xmin: number;
    xmax: number;
}
export interface GroupBase {
    text: Text;
    direction?: TextDirection;
}
export interface GroupMinMax {
    xmin: number;
    xmax: number;
}
export declare const getCursorPositions: (text: string, direction: TextDirection, textHelperDiv: HTMLDivElement) => number[];
export declare const isWhiteSpace: (codeUnit: string) => boolean;
export declare const isClose: (x1: number, x2: number) => boolean;
export declare const getDirection: (index: number, spans: HTMLSpanElement[]) => TextDirection;
export declare const getGroupStartIndices: (baseGroups: GroupBase[]) => number[];
export declare const getGroupXMinMax: (baseGroups: GroupBase[], direction: TextDirection, rootSpan: HTMLSpanElement) => GroupMinMax[];
export declare const createSpansForCharacters: (text: string[], parent: HTMLSpanElement) => HTMLSpanElement[];
export declare const createSpansForGroups: (baseGroups: GroupBase[], parent: HTMLSpanElement) => HTMLSpanElement[];
export declare const calculateTotalLength: (groups: Group[]) => number;
export declare const putInternalPositions: (text: string[], span: HTMLSpanElement, cursors: number[], startIndex: number, posCalculator: (spanWidth: number) => number, posLimiter: (position: number) => number) => void;
