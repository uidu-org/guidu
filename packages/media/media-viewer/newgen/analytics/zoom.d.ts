import { GasPayload } from '@atlaskit/analytics-gas-types';
import { PackageAttributes } from './index';
export declare type ZoomType = 'zoomOut' | 'zoomIn';
export interface ZoomControlsGasPayload extends GasPayload {
    attributes: PackageAttributes & {
        zoomScale: number;
    };
}
export declare function createZoomEvent(zoomType: ZoomType, zoomScale: number): ZoomControlsGasPayload;
