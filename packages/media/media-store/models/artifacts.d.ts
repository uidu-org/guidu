import { MediaFileProcessingStatus } from './media';
export declare type MediaFileArtifact = {
    readonly url: string;
    readonly processingStatus: MediaFileProcessingStatus;
};
export interface MediaFileArtifacts {
    'video_1280.mp4'?: MediaFileArtifact;
    'video_640.mp4'?: MediaFileArtifact;
    'document.pdf'?: MediaFileArtifact;
    'audio.mp3'?: MediaFileArtifact;
}
export declare const getArtifactUrl: (artifacts: MediaFileArtifacts, prop: "video_1280.mp4" | "video_640.mp4" | "document.pdf" | "audio.mp3") => string;
