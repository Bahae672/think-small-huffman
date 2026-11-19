import { HuffmanNode, HuffmanMergeStep, HuffmanCodeMap, EncodingResult } from '../types';
import { PriorityQueue } from './priorityQueue';

let nodeIdCounter = 0;

export function resetNodeIdCounter(): void {
  nodeIdCounter = 0;
}

/**
 * Constructs a Huffman tree using min-priority queue according to Algorithm 1.
 * Records step-by-step merge operations for visualization.
 */
export function buildHuffmanTree(
  symbolFrequencies: { symbol: number; freq: number; charLabel?: string }[]
): {
  root: HuffmanNode | null;
  steps: HuffmanMergeStep[];
  leaves: HuffmanNode[];
} {
  resetNodeIdCounter();
  const steps: HuffmanMergeStep[] = [];

  // Filter symbols with non-zero frequency
  const activeSymbols = symbolFrequencies.filter((item) => item.freq > 0);
  if (activeSymbols.length === 0) {
    return { root: null, steps: [], leaves: [] };
  }

  // Create initial leaf nodes
  const leaves: HuffmanNode[] = activeSymbols.map((item, index) => ({
    id: ++nodeIdCounter,
    symbol: item.symbol,
    charLabel: item.charLabel,
    freq: item.freq,
    left: null,
    right: null,
    order: index,
  }));

  // Edge case: single symbol
  if (leaves.length === 1) {
    const singleLeaf = leaves[0];
    const root: HuffmanNode = {
      id: ++nodeIdCounter,
      symbol: null,
      freq: singleLeaf.freq,
      left: singleLeaf,
      right: null,
      order: 1000,
    };
    steps.push({
      stepIndex: 1,
      nodeA: singleLeaf,
      nodeB: singleLeaf,
      mergedNode: root,
      remainingQueueSize: 1,
    });
    return { root, steps, leaves };
  }

  // Algorithm 1: Q := C
  const Q = new PriorityQueue(leaves);
  const n = leaves.length;
  let insertionOrder = n;

  // for i := 1 to n - 1 do
  for (let i = 1; i <= n - 1; i++) {
    // z.left := x := EXTRACT-MIN(Q)
    const x = Q.extractMin()!;
    // z.right := y := EXTRACT-MIN(Q)
    const y = Q.extractMin()!;

    // allocate a new node z
    const z: HuffmanNode = {
      id: ++nodeIdCounter,
      symbol: null,
      freq: x.freq + y.freq, // z.freq := x.freq + y.freq
      left: x,
      right: y,
      order: ++insertionOrder,
    };

    // INSERT(Q, z)
    Q.insert(z);

    steps.push({
      stepIndex: i,
      nodeA: x,
      nodeB: y,
      mergedNode: z,
      remainingQueueSize: Q.size,
    });
  }

  // return EXTRACT-MIN(Q)
  const root = Q.extractMin();
  return { root, steps, leaves };
}

/**
 * Generates prefix-free Huffman codes from the tree.
 * Left branch is '0', right branch is '1'.
 */
export function generateHuffmanCodes(root: HuffmanNode | null): HuffmanCodeMap {
  const codes: HuffmanCodeMap = {};
  if (!root) return codes;

  // Edge case: single node tree
  if (!root.left && !root.right && root.symbol !== null) {
    codes[root.symbol] = '0';
    return codes;
  }

  function traverse(node: HuffmanNode | null, currentCode: string) {
    if (!node) return;
    if (node.symbol !== null && !node.left && !node.right) {
      codes[node.symbol] = currentCode || '0';
      return;
    }
    if (node.left) {
      traverse(node.left, currentCode + '0');
    }
    if (node.right) {
      traverse(node.right, currentCode + '1');
    }
  }

  traverse(root, '');
  return codes;
}

/**
 * Calculates metadata size overhead for storing the tree/codebook.
 * We represent the tree as (leaves * 2 bytes [symbol + codelength]) + canonical representation.
 */
export function calculateMetadataOverhead(distinctSymbols: number): number {
  // Approximate standard canonical codebook header:
  // 1 byte count of symbols + 1.5 bytes average per entry in alphabet
  return Math.ceil(distinctSymbols * 1.5) + 4;
}

/**
 * True bit-packed encoder.
 * Packs bits sequentially into a pre-allocated Uint8Array.
 */
export function encodeDataStream(
  data: Uint8ClampedArray | Uint8Array,
  codes: HuffmanCodeMap,
  root: HuffmanNode | null,
  distinctSymbols: number
): EncodingResult {
  // Pre-calculate total bits required: B = sum(f_i * l_i)
  let totalBits = 0;
  for (let i = 0; i < data.length; i++) {
    const sym = data[i];
    const code = codes[sym];
    if (code) {
      totalBits += code.length;
    }
  }

  const byteLength = Math.ceil(totalBits / 8);
  const buffer = new Uint8Array(byteLength);

  let bitOffset = 0;
  for (let i = 0; i < data.length; i++) {
    const sym = data[i];
    const code = codes[sym];
    if (!code) continue;

    for (let c = 0; c < code.length; c++) {
      if (code[c] === '1') {
        const byteIndex = bitOffset >> 3; // bitOffset / 8
        const bitInByte = 7 - (bitOffset & 7); // MSB-first: 7 - (bitOffset % 8)
        buffer[byteIndex] |= 1 << bitInByte;
      }
      bitOffset++;
    }
  }

  const paddedBits = totalBits % 8 === 0 ? 0 : 8 - (totalBits % 8);
  const treeMetadataBytes = calculateMetadataOverhead(distinctSymbols);

  // Perform genuine decode and byte-by-byte equality check
  const decodedRaster = decodeDataStream(buffer, totalBits, root, data.length);
  let isExactMatch = true;
  let mismatchIndex: number | null = null;

  if (decodedRaster.length !== data.length) {
    isExactMatch = false;
    mismatchIndex = -1;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (decodedRaster[i] !== data[i]) {
        isExactMatch = false;
        mismatchIndex = i;
        break;
      }
    }
  }

  return {
    encodedBitLength: totalBits,
    encodedBuffer: buffer,
    huffmanCodes: codes,
    paddedBits,
    treeMetadataBytes,
    decodedRaster,
    isExactMatch,
    mismatchIndex,
  };
}

/**
 * Decodes the bit-packed buffer using the Huffman tree.
 */
export function decodeDataStream(
  buffer: Uint8Array,
  totalBits: number,
  root: HuffmanNode | null,
  expectedLength: number
): Uint8ClampedArray {
  const result = new Uint8ClampedArray(expectedLength);
  if (!root || totalBits === 0 || expectedLength === 0) {
    return result;
  }

  // Handle single node tree
  if (!root.left && !root.right && root.symbol !== null) {
    result.fill(root.symbol);
    return result;
  }

  let currentNode: HuffmanNode = root;
  let writeIndex = 0;

  for (let bitIndex = 0; bitIndex < totalBits && writeIndex < expectedLength; bitIndex++) {
    const byteIndex = bitIndex >> 3;
    const bitInByte = 7 - (bitIndex & 7);
    const bit = (buffer[byteIndex] >> bitInByte) & 1;

    currentNode = (bit === 0 ? currentNode.left : currentNode.right) || root;

    if (currentNode.symbol !== null && !currentNode.left && !currentNode.right) {
      result[writeIndex++] = currentNode.symbol;
      currentNode = root;
    }
  }

  return result;
}
