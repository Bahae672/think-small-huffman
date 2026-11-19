import { HuffmanNode } from '../types';

/**
 * Min-Priority Queue for Huffman Coding nodes.
 * Implements a binary min-heap with deterministic tie-breaking.
 * Tie-breaker:
 * 1. Primary: node.freq (ascending)
 * 2. Secondary: node.order (insertion order, ascending)
 * 3. Tertiary: node.id (unique id, ascending)
 */
export class PriorityQueue {
  private heap: HuffmanNode[] = [];

  constructor(initialNodes?: HuffmanNode[]) {
    if (initialNodes && initialNodes.length > 0) {
      this.heap = [...initialNodes];
      this.buildHeap();
    }
  }

  public get size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public peek(): HuffmanNode | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  public insert(node: HuffmanNode): void {
    this.heap.push(node);
    this.siftUp(this.heap.length - 1);
  }

  public extractMin(): HuffmanNode | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return min;
  }

  public toArray(): HuffmanNode[] {
    return [...this.heap];
  }

  private compare(a: HuffmanNode, b: HuffmanNode): number {
    if (a.freq !== b.freq) {
      return a.freq - b.freq;
    }
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.id - b.id;
  }

  private siftUp(index: number): void {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (this.compare(this.heap[current], this.heap[parent]) < 0) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  private siftDown(index: number): void {
    let current = index;
    const length = this.heap.length;
    while (true) {
      let smallest = current;
      const left = 2 * current + 1;
      const right = 2 * current + 2;

      if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest !== current) {
        this.swap(current, smallest);
        current = smallest;
      } else {
        break;
      }
    }
  }

  private buildHeap(): void {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}
