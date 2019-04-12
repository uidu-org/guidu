import { PNGMetaData, PNGChunk } from './types';
export declare function readPNGXMPMetaData(file: File): Promise<PNGMetaData>;
export declare function parsePNGChunks(chunks: PNGChunk[]): Promise<PNGMetaData>;
