/// <reference types="react" />
import { createApiUrl, fetchFromApiUrl, fetchFromApi, imageProxy, extractFirstUrl } from './utils';
declare function LinkPreview<LinkPreviewProps>(props: any): JSX.Element;
declare namespace LinkPreview {
    var defaultProps: {
        video: boolean;
        contrast: boolean;
        screenshot: boolean;
        prerender: string;
        apiKey: any;
        autoPlay: boolean;
        controls: boolean;
        media: string[];
        loop: boolean;
        muted: boolean;
        playsInline: boolean;
        direction: string;
        size: string;
        onScraped: () => void;
    };
}
export { imageProxy, createApiUrl, fetchFromApiUrl, fetchFromApi, extractFirstUrl, };
export default LinkPreview;
