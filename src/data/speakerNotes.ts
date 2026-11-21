import { SpeakerNote } from '../types';

export const speakerNotesData: SpeakerNote[] = [
  {
    slideNumber: 1,
    slideTitle: "Think Small: How Greedy Algorithms Compress Images",
    durationMinutes: "0:30",
    durationSeconds: 30,
    notes: [
      "Good morning everyone. We are Bahaeddine EL ATIGUI and Hafssa GAMMAZ, presenting 'Think Small: How Greedy Algorithms Compress Images — Huffman Coding and Lossless Image Compression' for our Analysis of Algorithms course.",
      "In computer science, representing data compactly without loss of information is fundamental. Today, we will explore how a greedy algorithmic strategy solves this optimization problem by building an optimal prefix-free code, and we will demonstrate its direct application to image raster data."
    ]
  },
  {
    slideNumber: 2,
    slideTitle: "The Growing Cost of Digital Images",
    durationMinutes: "0:50",
    durationSeconds: 50,
    notes: [
      "Consider a digital university platform or research repository hosting thousands of graphical assets: institutional emblems, lecture diagrams, technical code screenshots, and UI icons.",
      "As visual data accumulates, raw uncompressed byte payloads strain network bandwidth and storage infrastructure. Uncompressed 24-bit RGB frames quickly consume megabytes per asset.",
      "Crucially, in educational diagrams and typography, lossy artifacts blur text and ruin sharp edges. We need a compression technique that reduces storage while guaranteeing 100% data fidelity."
    ]
  },
  {
    slideNumber: 3,
    slideTitle: "The Fundamental Question: Lossless Data Reduction",
    durationMinutes: "0:45",
    durationSeconds: 45,
    notes: [
      "This leads directly to our central algorithmic question: 'Can we reduce the amount of data while preserving every original pixel?'",
      "Notice the lossless pipeline: Original Image into Compression into Reconstructed Image, where Original identically equals Reconstructed pixel for pixel.",
      "Lossless compression achieves this by exploiting statistical redundancy in symbol frequencies rather than discarding perceptual data."
    ]
  },
  {
    slideNumber: 4,
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
    slideNumber: 5,
    slideTitle: "The Greedy Choice",
    durationMinutes: "1:15",
    durationSeconds: 75,
    notes: [
      "Greedy algorithms solve optimization problems by making a sequence of choices, each of which looks best at the moment, with the hope that local optimization leads to a global optimum.",
      "In Huffman Coding, our central greedy decision is remarkably simple: Repeatedly combine the two symbols with the lowest frequencies.",
      "Look at the six-symbol distribution on screen: A through F with frequencies ranging from 5 to 45. The greedy choice inspects the set, extracts the two minimum frequencies—here F with frequency 5 and E with frequency 9—and fuses them into a composite node of frequency 14.",
      "This composite node is reinserted into the priority queue, and the process repeats. Why does this local choice guarantee a minimal total weighted path length? We will formulate this mathematically."
    ]
  },
  {
    slideNumber: 6,
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
    slideNumber: 7,
    slideTitle: "Constructing the Huffman Tree",
    durationMinutes: "1:30",
    durationSeconds: 90,
    notes: [
      "Notice that we begin at STEP 0 with all six independent frequency nodes in priority queue Q: F(5), E(9), C(12), B(13), D(16), and A(45).",
      "In Merge 1, F(5) and E(9) are extracted and combined into parent node 14.",
      "In Merge 2, the next two smallest are C(12) and B(13), forming parent node 25.",
      "In Merge 3, node 14 and symbol D(16) combine to form node 30.",
      "In Merge 4, subtrees 25 and 30 fuse into composite node 55.",
      "In the 5th and final merge, symbol A(45) merges with subtree 55 to create the root with total frequency 100.",
      "Traversing from root to leaves yields prefix-free codes: A is simply '0', while the rare symbol F receives '1100'. High-frequency symbols sit near the root, while low-frequency symbols are pushed deeper."
    ]
  },
  {
    slideNumber: 8,
    slideTitle: "Mathematical Formulation",
    durationMinutes: "1:00",
    durationSeconds: 60,
    notes: [
      "Here is the foundational mathematical formulation of Huffman Coding.",
      "The equation defines L_bar_Huffman as the minimum achievable average codeword length, taken over all possible binary prefix codes, calculated as the sum of p_i times l_i for each of the k distinct symbols.",
      "p_i represents the probability of symbol i, l_i represents the length in bits of its assigned codeword, and k is the total alphabet size.",
      "Huffman's greedy strategy provably finds this minimum without needing an exhaustive search."
    ]
  },
  {
    slideNumber: 9,
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
    slideNumber: 10,
    slideTitle: "Huffman Coding vs. Alternative Approaches",
    durationMinutes: "1:25",
    durationSeconds: 85,
    notes: [
      "To verify why the greedy bottom-up approach is superior, we compare it against alternative schemes on an integer distribution: A with count 5, and B, C, D, E each with count 2 (Total N = 13).",
      "Fixed-Length encoding assigns a uniform 3 bits to every symbol (39 total bits), yielding 3.00 bits per symbol with zero entropy reduction.",
      "Shannon-Fano coding uses top-down partitioning. Splitting into equal halves {A,B}=7 vs {C,D,E}=6 forces symbol A into 2 bits, requiring 30 total bits and 2.31 bits per symbol.",
      "Huffman Coding builds bottom-up using the greedy choice: fusing D+E=4, B+C=4, 4+4=8, and finally A(5)+8=13. Symbol A sits at depth 1 (1 bit), requiring only 29 total bits (2.23 bits per symbol).",
      "As shown in the bar graph, Huffman Coding achieves the minimum average code length among binary prefix-free codes."
    ]
  },
  {
    slideNumber: 11,
    slideTitle: "Computational Complexity: Big-O Analysis",
    durationMinutes: "1:10",
    durationSeconds: 70,
    notes: [
      "Now we analyze computational complexity. Let N be total raster bytes, and k be distinct alphabet symbols (k <= 256 for byte channels).",
      "Building the frequency histogram takes linear time O(N) over the image pixels.",
      "Initializing the min-heap via Build-Min-Heap takes O(k) time.",
      "The greedy tree construction loop runs k - 1 times. Each iteration executes two Extract-Min operations and one Insert operation in O(log k) time, yielding O(k log k) total tree construction time.",
      "Because N >> k in image compression (millions of pixels vs 256 symbols), the overall runtime O(N + k log k) is dominated by the linear scan, with minimal auxiliary space O(k)."
    ]
  },
  {
    slideNumber: 12,
    slideTitle: "Why Use a Priority Queue?",
    durationMinutes: "1:00",
    durationSeconds: 60,
    notes: [
      "Why must we use a min-priority queue instead of an array?",
      "If we implemented the greedy choice using an unsorted array, finding the two minimums in each iteration would require a linear scan of size k, leading to quadratic time O(k²).",
      "For a byte alphabet where k = 256, naive repeated scanning requires 65,536 operations, whereas a binary min-heap requires only 2,048 operations—a 32-fold performance increase!",
      "A priority queue reduces Huffman tree construction from O(k²) to O(k log k)."
    ]
  },
  {
    slideNumber: 13,
    slideTitle: "Live Demonstration: Huffman Image Compression",
    durationMinutes: "3:00",
    durationSeconds: 180,
    notes: [
      "We now arrive at the live demonstration, structured as one continuous visual story on a single slide.",
      "The audience sees the image progressively transform through its natural forms: the image breaks into visible pixels; the pixels become numerical byte values; the values organize into symbol frequencies; the greedy algorithm repeatedly combines the two lowest frequencies into a Huffman tree; the tree emits packed binary bits; and the bits stream back to reconstruct the original image.",
      "Notice the side-by-side verification at the end: exact byte-for-byte lossless match, with zero information lost."
    ]
  },
  {
    slideNumber: 14,
    slideTitle: "Thank You",
    durationMinutes: "0:30",
    durationSeconds: 30,
    notes: [
      "Thank you very much for your time and attention.",
      "'Small choices can lead to optimal solutions.'",
      "We now welcome any questions or discussion on greedy algorithm design, Huffman tree proofs, or lossless image compression."
    ]
  }
];
