export interface HuffmanNode {
  id: number;
  symbol: number | null; // null for internal nodes, 0-255 for bytes (or string/char for theoretical slides)
  charLabel?: string;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
  order: number; // for deterministic tie-breaking
}

export interface HuffmanMergeStep {
  stepIndex: number;
  nodeA: HuffmanNode;
  nodeB: HuffmanNode;
  mergedNode: HuffmanNode;
  remainingQueueSize: number;
}

export interface HuffmanCodeMap {
  [symbol: number]: string;
}

export interface ImageDataStats {
  width: number;
  height: number;
  totalPixels: number;
  totalBytes: number;
  frequencies: Uint32Array; // 256 byte values
  distinctSymbols: number;
  samplePixels: Array<{
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
    a: number;
  }>;
  sampleBytes: number[];
  rawData: Uint8ClampedArray;
}

export interface EncodingResult {
  encodedBitLength: number;
  encodedBuffer: Uint8Array;
  huffmanCodes: HuffmanCodeMap;
  paddedBits: number;
  treeMetadataBytes: number;
  decodedRaster: Uint8ClampedArray;
  isExactMatch: boolean;
  mismatchIndex: number | null;
}

export interface SpeakerNote {
  slideNumber: number;
  slideTitle: string;
  durationMinutes: string;
  durationSeconds: number;
  notes: string[];
}
