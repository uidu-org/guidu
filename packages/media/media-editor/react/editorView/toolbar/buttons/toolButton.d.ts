import { Component } from 'react';
import ArrowIcon from '@atlaskit/icon/glyph/media-services/arrow';
import BrushIcon from '@atlaskit/icon/glyph/media-services/brush';
import LineIcon from '@atlaskit/icon/glyph/media-services/line';
import BlurIcon from '@atlaskit/icon/glyph/media-services/blur';
import OvalIcon from '@atlaskit/icon/glyph/media-services/oval';
import RectIcon from '@atlaskit/icon/glyph/media-services/rectangle';
import TextIcon from '@atlaskit/icon/glyph/media-services/text';
import { Tool } from '../../../../common';
export declare const toolIcons: {
    line: typeof LineIcon;
    blur: typeof BlurIcon;
    arrow: typeof ArrowIcon;
    brush: typeof BrushIcon;
    oval: typeof OvalIcon;
    rectangle: typeof RectIcon;
    text: typeof TextIcon;
};
export interface ToolButtonProps {
    readonly tool: Tool;
    readonly activeTool: Tool;
    readonly onToolClick: (tool: Tool) => void;
}
export declare class ToolButton extends Component<ToolButtonProps> {
    render(): JSX.Element;
}
