import { SpeakerNote } from '../types';

export const speakerNotesData: SpeakerNote[] = [
  {
    slideNumber: 1,
    slideTitle: "Think Small: How Greedy Algorithms Compress Images",
    durationMinutes: "0:30",
    durationSeconds: 30,
    notes: [
      "Good morning everyone. We are Bahaeddine EL ATIGUI and Hafssa Gammaz, presenting 'Think Small: How Greedy Algorithms Compress Images — Huffman Coding and Lossless Image Compression' for our Analysis of Algorithms course.",
      "In computer science, representing data compactly without loss of information is fundamental. Today, we will explore how a greedy algorithmic strategy solves this optimization problem by building an optimal prefix-free code, and we will demonstrate its direct application to image raster data."
    ]
  },
  {
    slideNumber: 2,
    slideTitle: "The Problem: Efficient Image Storage",
    durationMinutes: "1:05",
    durationSeconds: 65,
    notes: [
      "Let us begin with the motivating problem. Consider a digital university platform or research repository hosting millions of graphical assets: logos, diagrams, icons, and technical screenshots.",
      "Transmitting and archiving these uncompressed raster assets consumes massive storage and network bandwidth. However, for academic diagrams, typography, and logos, lossy compression is unacceptable—text becomes blurry and high-contrast edges introduce severe artifacts.",
      "The fundamental algorithmic challenge is: How can we represent identical raster image information using fewer bits, without discarding a single byte of the original data? This brings us to entropy-based lossless compression."
    ]
  },
  {
    slideNumber: 3,
    slideTitle: "Huffman Coding in PNG",
    durationMinutes: "0:55",
    durationSeconds: 55,
    notes: [
      "Where does Huffman Coding appear in real-world systems? The most widespread standard is PNG—the Portable Network Graphics format.",
      "The PNG architecture employs the DEFLATE compression method, which combines dictionary substitution with Huffman entropy coding to emit the final binary bitstream.",
      "Our investigation isolates the Huffman coding component. We focus specifically on its greedy tree-construction algorithm, demonstrating how it produces an optimal prefix-free binary representation from symbol frequency distributions."
    ]
  },
  {
    slideNumber: 4,
    slideTitle: "The Greedy Choice",
    durationMinutes: "1:15",
    durationSeconds: 75,
    notes: [
      "Greedy algorithms solve optimization problems by making a sequence of choices, each of which looks best at the moment, with the hope that local optimization leads to a global optimum.",
      "In Huffman Coding, our central greedy decision is remarkably simple: Repeatedly combine the two symbols with the lowest frequencies.",
      "Look at the six-symbol distribution on screen: A through F with frequencies ranging from 5 to 45. The greedy choice inspects the set, extracts the two minimum frequencies—here F with frequency 5 and E with frequency 9—and fuses them into a composite node of frequency 14.",
      "This composite node is reinserted, and the process repeats. Why does this local choice guarantee a minimal total weighted path length? We will formulate this mathematically."
    ]
  },
  {
    slideNumber: 5,
    slideTitle: "Algorithm 1 — Huffman(C)",
    durationMinutes: "1:15",
    durationSeconds: 75,
    notes: [
      "Here is the formal pseudocode for HUFFMAN(C), typeset in standard academic form from Cormen, Leiserson, Rivest, and Stein.",
      "Let C denote the set of n characters or symbols. In line 1, we determine n. In line 2, we initialize a min-priority queue Q containing all symbols in C, keyed by their frequency.",
      "The loop in lines 3 through 9 executes exactly n minus 1 iterations. In each iteration, lines 5 and 6 implement the greedy choice by executing two EXTRACT-MIN operations to obtain the two least frequent nodes, x and y.",
      "In line 7, a parent node z is allocated with frequency equal to the sum of x.freq and y.freq, with x and y as its children. In line 8, z is reinserted into Q.",
      "Finally, in line 10, the lone remaining element in Q is extracted—this is the root of the optimal prefix-code tree."
    ]
  },
  {
    slideNumber: 6,
    slideTitle: "Constructing the Huffman Tree",
    durationMinutes: "1:25",
    durationSeconds: 85,
    notes: [
      "Notice that we begin at STEP 0 with all six independent frequency nodes in priority queue Q: A(45), B(13), C(12), D(16), E(9), and F(5). No connections exist yet.",
      "In Merge 1, F(5) and E(9) are extracted and combined into parent node 14.",
      "In Merge 2, the next two smallest are C(12) and B(13), forming parent node 25.",
      "In Merge 3, node 14 and symbol D(16) combine to form node 30.",
      "In Merge 4, subtrees 25 and 30 fuse into composite node 55.",
      "In the 5th and final merge, symbol A(45) merges with subtree 55 to create the root with total frequency 100.",
      "Traversing from root to leaves yields prefix-free codes: A is simply '0', while the rare symbol F receives '1100'. High-frequency symbols sit near the root, while low-frequency symbols are pushed deeper."
    ]
  },
  {
    slideNumber: 7,
    slideTitle: "Theoretical Optimality & Shannon Entropy",
    durationMinutes: "1:15",
    durationSeconds: 75,
    notes: [
      "How close is Huffman Coding to theoretical optimality? We evaluate two core metrics: average codeword length L_bar, and Shannon source entropy H(X).",
      "Shannon entropy establishes the fundamental lower bound on lossless compression: no prefix-free code can achieve an average length below H(X).",
      "The fundamental theorem guarantees that H(X) <= L_bar < H(X) + 1.",
      "For our six-symbol distribution, Shannon entropy is approximately 2.22 bits per symbol, and Huffman achieves an average codeword length of exactly 2.24 bits per symbol—just 0.02 bits from the theoretical absolute limit!"
    ]
  },
  {
    slideNumber: 8,
    slideTitle: "Why Does the Greedy Algorithm Work?",
    durationMinutes: "1:05",
    durationSeconds: 65,
    notes: [
      "Why is this greedy choice guaranteed to be globally optimal? The proof relies on three formal pillars.",
      "First, the Greedy-Choice Property: We prove by an exchange argument that there exists an optimal prefix code tree where the two characters with lowest frequencies appear as sibling leaves of maximum depth.",
      "Second, Reduction: When we fuse these two symbols x and y into a replacement symbol z with frequency x.freq + y.freq, we reduce the problem size from n symbols to n minus 1 symbols.",
      "Third, Optimal Substructure: An optimal tree for the reduced alphabet can be converted into an optimal tree for the original alphabet simply by replacing the leaf z with an internal node having x and y as children."
    ]
  },
  {
    slideNumber: 9,
    slideTitle: "Computational Complexity",
    durationMinutes: "1:20",
    durationSeconds: 80,
    notes: [
      "Now we analyze computational complexity. Let N be total raster bytes, and k be distinct symbols (k <= 256).",
      "Counting frequencies takes O(N) time. Priority queue initialization takes O(k) time.",
      "Tree construction executes k minus 1 iterations, each with two EXTRACT-MIN and one INSERT operation in a binary heap, bounding construction to O(k log k).",
      "Notice the graph on the right: at k=256, a min-priority queue takes roughly 2,048 operations, whereas an unoptimized repeated array scan takes 65,536 operations—a 32-fold asymptotic efficiency gain!",
      "The total time is O(N + k log k), requiring O(k) auxiliary space."
    ]
  },
  {
    slideNumber: 10,
    slideTitle: "Interactive Live Demonstration",
    durationMinutes: "3:50",
    durationSeconds: 230,
    notes: [
      "We now arrive at the interactive live demonstration. This operates directly on full-resolution raster pixel data inside the browser.",
      "When an image is loaded, it preserves 100% of its original intrinsic dimensions without downsampling.",
      "The demonstration automatically visualizes the complete pipeline: from raw image, to enlarged pixel grid, to numerical RGBA bytes, to empirical 256-bin histogram, to greedy tree construction, to prefix-free encoding, and finally to decoded raster reconstruction.",
      "We perform an exact byte-by-byte verification across all decoded bytes: Exact Reconstruction: PASS.",
      "Finally, the metrics evaluate original payload versus Huffman payload and net compression gains."
    ]
  },
  {
    slideNumber: 11,
    slideTitle: "Conclusion",
    durationMinutes: "0:45",
    durationSeconds: 45,
    notes: [
      "To conclude: We started with the real-world problem of storing and transmitting image data without loss.",
      "We applied the greedy strategy of repeatedly combining the two least frequent symbols to construct a Huffman binary tree.",
      "The resulting prefix-free code achieves the minimum expected codeword length for the empirical symbol distribution, tightly bounded by Shannon entropy.",
      "This exemplifies the core elegance of greedy algorithms: locally optimal decisions yielding a mathematically verified, globally optimal encoding. Thank you for your attention."
    ]
  }
];
