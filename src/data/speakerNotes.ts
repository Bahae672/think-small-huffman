import { SpeakerNote } from '../types';

export const speakerNotesData: SpeakerNote[] = [
  {
    slideNumber: 1,
    slideTitle: "Think Small: How Greedy Algorithms Compress Images",
    durationMinutes: "0:30",
    durationSeconds: 30,
    notes: [
      "Good morning everyone. Today we are presenting 'Think Small: How Greedy Algorithms Compress Images — Huffman Coding and Lossless Image Compression' for our Analysis of Algorithms course at Nanjing University of Posts and Telecommunications.",
      "In computer science, representing data compactly without loss of information is fundamental. Today, we will explore how a greedy algorithmic strategy solves this optimization problem by building an optimal prefix-free code, and we will demonstrate its direct application to image raster data."
    ]
  },
  {
    slideNumber: 2,
    slideTitle: "The Problem: Efficient Image Storage",
    durationMinutes: "1:05",
    durationSeconds: 65,
    notes: [
      "Let us begin with the motivating problem. Consider a university portal, digital library, or cloud learning management system hosting hundreds of thousands of educational assets: logos, lecture diagrams, user interface icons, and technical screenshots.",
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
      "The PNG architecture employs the DEFLATE compression method, which combines two distinct stages: LZ77 sliding-window dictionary substitution, followed by Huffman entropy coding to emit the final binary bitstream.",
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
      "Let us trace the complete execution step-by-step using our six-symbol distribution: A=45, B=13, C=12, D=16, E=9, and F=5.",
      "In Merge 1, F(5) and E(9) are combined into an internal node of weight 14.",
      "In Merge 2, the next two smallest in the queue are C(12) and B(13), yielding a subtree of weight 25.",
      "In Merge 3, the smallest are the subtree 14 and symbol D(16), combining to form weight 30.",
      "In Merge 4, subtree 25 and subtree 30 merge into weight 55.",
      "In the 5th and final merge, symbol A(45) merges with subtree 55 to create the root with total frequency 100.",
      "Traversing from root to leaves—assigning 0 to left edges and 1 to right edges—yields prefix-free codes: A is simply '0', while the rare symbol F receives '1100'. High-frequency symbols sit near the root, while low-frequency symbols are pushed to deeper levels."
    ]
  },
  {
    slideNumber: 7,
    slideTitle: "Encoding Cost",
    durationMinutes: "1:05",
    durationSeconds: 65,
    notes: [
      "Let us quantify the cost of this tree. The total encoded payload B is given by the sum over all symbols of their frequency f_i multiplied by their binary code length l_i.",
      "Under a fixed-length scheme, three bits are required to differentiate six symbols, requiring 100 times 3, or 300 total bits.",
      "With Huffman coding, symbol A requires only 45 bits, B requires 39 bits, C requires 36 bits, D requires 48 bits, E requires 36 bits, and F requires 20 bits. Summing these yields exactly 224 bits.",
      "This represents a payload reduction of 25.33 percent. Notice that no code is a prefix of any other code, ensuring instantaneous, unambiguous decoding without lookahead."
    ]
  },
  {
    slideNumber: 8,
    slideTitle: "Why Does the Greedy Algorithm Work?",
    durationMinutes: "1:05",
    durationSeconds: 65,
    notes: [
      "Why is this greedy choice guaranteed to be globally optimal? The proof relies on three formal pillars.",
      "First, the Greedy-Choice Property: We can prove by contradiction and exchange argument that there exists an optimal prefix code tree where the two characters with lowest frequencies appear as sibling leaves of maximum depth.",
      "Second, Reduction: When we fuse these two symbols x and y into a replacement symbol z with frequency x.freq + y.freq, we reduce the problem size from n symbols to n minus 1 symbols.",
      "Third, Optimal Substructure: An optimal tree for the reduced alphabet can be converted into an optimal tree for the original alphabet simply by replacing the leaf z with an internal node having x and y as children. Repeating this induction establishes global optimality."
    ]
  },
  {
    slideNumber: 9,
    slideTitle: "Computational Complexity",
    durationMinutes: "1:20",
    durationSeconds: 80,
    notes: [
      "Now we analyze the computational complexity. Let N be the total number of input symbols in the raster stream, and k be the number of distinct byte symbols, where k is at most 256 for standard byte data.",
      "Counting frequencies takes O(N) time over the input raster. Building the min-priority queue with a binary heap takes O(k) time.",
      "The greedy tree construction performs k minus 1 iterations. Each iteration performs two EXTRACT-MIN operations and one INSERT, each taking O(log k) time. Thus, tree construction is bounded by O(k log k).",
      "On the right, Figure 2 contrasts the theoretical growth of this binary heap implementation against an unoptimized repeated-linear-scan approach that takes O(k squared). For larger alphabets, heap-based tree construction scales cleanly.",
      "The end-to-end time is O(N + k log k + B), where B is the bit-emission length, requiring O(k) auxiliary space."
    ]
  },
  {
    slideNumber: 10,
    slideTitle: "Interactive Live Demonstration",
    durationMinutes: "3:50",
    durationSeconds: 230,
    notes: [
      "We now arrive at the interactive live demonstration. This is not a canned mockup or animation with fabricated numbers—it is a live, genuine implementation running directly in the browser.",
      "We will upload an image file. The browser decodes the image into an uncompressed RGBA8 pixel raster.",
      "Stage 1 displays the uploaded raster metadata. In Stage 2, we zoom into the pixel grid, showing the true underlying RGB values.",
      "In Stage 3, these pixels are linearized into a raw numerical byte stream. In Stage 4, we compute the true frequency histogram across all byte values 0 to 255.",
      "In Stage 5, our binary min-heap constructs the Huffman tree before your eyes, pairing the two minimum frequencies at each step. You can step through individual merges or fast-forward to the root.",
      "In Stage 6, optimal variable-length codes are generated and the entire raster is bit-packed into a binary buffer.",
      "In Stage 7, the bitstream is decoded back through the tree, and we perform a byte-by-byte equality check: Exact Raster Reconstruction: PASS.",
      "Finally, Stage 8 evaluates the compression metrics and payload savings."
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
      "The resulting prefix-free code achieves the minimum expected codeword length for the empirical symbol distribution.",
      "This exemplifies the core elegance of greedy algorithms: locally optimal decisions yielding a mathematically verified, globally optimal encoding. Thank you for your attention."
    ]
  },
  {
    slideNumber: 12,
    slideTitle: "References",
    durationMinutes: "0:35",
    durationSeconds: 35,
    notes: [
      "The theoretical foundations and technical standards cited in this presentation include:",
      "David Huffman's landmark 1952 paper, 'A Method for the Construction of Minimum-Redundancy Codes' in the Proceedings of the IRE.",
      "The W3C Portable Network Graphics (PNG) Specification, Third Edition (2025).",
      "RFC 1951 for the DEFLATE Compressed Data Format Specification by Peter Deutsch.",
      "And Chapter 16 on Greedy Algorithms from Cormen, Leiserson, Rivest, and Stein's Introduction to Algorithms. Thank you."
    ]
  }
];
