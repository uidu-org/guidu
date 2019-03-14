export type ChunkId = string;

export type Chunk = {
  readonly id: ChunkId;
  readonly blob: Blob;
};
