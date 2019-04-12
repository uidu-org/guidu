import { Hasher } from './hasher';
export declare class SimpleHasher implements Hasher {
    hash(blob: Blob): Promise<string>;
}
