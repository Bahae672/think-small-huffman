import { SpeakerNote } from '../types';

export const speakerNotesData: SpeakerNote[] = [
  {
    slideNumber: 1,
    slideTitle: "Think Small: How Greedy Algorithms Compress Images",
    durationMinutes: "0:30",
    durationSeconds: 30,
    notes: [
      "[0:00 – 0:30] Good morning everyone. We are Bahaeddine EL ATIGUI and Hafssa GAMMAZ, presenting 'Think Small: How Greedy Algorithms Compress Images — Huffman Coding and Lossless Image Compression' for our Analysis of Algorithms course.",
      "In computer science, representing data compactly without loss of information is fundamental. Today, we will explore how a greedy algorithmic strategy solves this optimization problem by building an optimal prefix-free code, and we will demonstrate its direct application to image raster data."
    ]
  },
  {
    slideNumber: 2,
    slideTitle: "The Growing Cost of Digital Images",
    durationMinutes: "0:50",
    durationSeconds: 50,
    notes: [
      "[0:30 – 1:20] Consider a digital university platform or research repository hosting thousands of graphical assets: institutional emblems, lecture diagrams, technical code screenshots, and UI icons.",
      "As visual data accumulates, raw uncompressed byte payloads strain network bandwidth and storage infrastructure. Uncompressed 24-bit RGB frames quickly consume megabytes per asset.",
      "Crucially, in educational diagrams and typography, lossy artifacts blur text and ruin sharp edges. We need a compression technique that reduces storage while guaranteeing 100% data fidelity."
    ]
  },
  {
    slideNumber: 3,
    slideTitle: "The Fundamental Question: Lossless Data Reduction",
    durationMinutes: "0:40",
    durationSeconds: 40,
    notes: [
      "[1:20 – 2:00] This leads directly to our central algorithmic question: 'Can we reduce the amount of data while preserving every original pixel?'",
      "Notice the lossless pipeline: Original Image into Compression into Reconstructed Image, where the reconstructed output is a 100% bit-exact match to the original.",
      "Lossless compression achieves this by exploiting statistical redundancy in symbol frequencies rather than discarding perceptual data."
    ]
  },
  {
    slideNumber: 4,
    slideTitle: "Huffman Coding in PNG",
    durationMinutes: "1:00",
    durationSeconds: 60,
    notes: [
      "[2:00 – 3:00] Where does Huffman Coding appear in real-world systems? The most widespread standard is PNG—the Portable Network Graphics format.",
      "The PNG architecture employs the DEFLATE compression method (RFC 1951), which combines dictionary substitution with Huffman entropy coding to emit the final binary bitstream.",
      "[Click Step 1] Our investigation isolates the Huffman coding stage: its greedy prefix-free binary tree construction."
    ]
  },
  {
    slideNumber: 5,
    slideTitle: "The Greedy Choice",
    durationMinutes: "1:15",
    durationSeconds: 75,
    notes: [
      "[3:00 – 4:15] Greedy algorithms solve optimization problems by making a sequence of locally optimal choices.",
      "In Huffman Coding, our central greedy decision is simple: Repeatedly combine the two symbols with the lowest frequencies.",
      "[Click Step 1] Look at the six-symbol distribution on screen: A through F with frequencies totaling 100. The greedy choice extracts the two minimum frequencies—F(5) and E(9)—and fuses them into a composite parent node of frequency 14."
    ]
  },
  {
    slideNumber: 6,
    slideTitle: "Algorithm 1 — Huffman(C)",
    durationMinutes: "1:15",
    durationSeconds: 75,
    notes: [
      "[4:15 – 5:30] Here is the formal CLRS pseudocode for HUFFMAN(C). We initialize a min-priority queue Q with all n symbols keyed by frequency.",
      "[Click Step 1] The loop executes n - 1 times. In lines 5 and 6, two EXTRACT-MIN(Q) operations implement the greedy choice, picking the two lowest-frequency nodes x and y.",
      "[Click Step 2] In lines 7 and 8, we sum their frequencies into parent z and reinsert z into Q. After n - 1 merges, line 10 returns the root of the completed tree."
    ]
  },
  {
    slideNumber: 7,
    slideTitle: "Constructing the Huffman Tree",
    durationMinutes: "2:00",
    durationSeconds: 120,
    notes: [
      "[5:30 – 7:30 | HALFWAY MARK AT END OF SLIDE] We begin at Step 0 with all 6 independent leaf nodes in Q.",
      "[Click Step 1] First, the leaf nodes align by frequency depth, placing F(5) and E(9) at the deepest level.",
      "[Click Step 2] Merge 1: F(5) and E(9) grow upward to fuse into Node 14.",
      "[Click Step 3] Merge 2: The next two smallest in Q, C(12) and B(13), fuse upward into Node 25.",
      "[Click Step 4] Merge 3: Node 14 and D(16) fuse upward into Node 30.",
      "[Click Step 5] Merge 4: Subtrees 25 and 30 fuse upward into Node 55.",
      "[Click Step 6] Merge 5: Frequent symbol A(45) merges with Node 55 to form Root 100. Notice the prefix-free codewords: A gets '0' (1 bit), achieving an average length of 2.24 bits/symbol (-25.3% vs 3-bit fixed length). [7:30 HALFWAY POINT / PRESENTER HANDOFF]"
    ]
  },
  {
    slideNumber: 8,
    slideTitle: "Mathematical Formulation",
    durationMinutes: "0:50",
    durationSeconds: 50,
    notes: [
      "[7:30 – 8:20 | SECOND HALF BEGINS] Here is the formal objective function of Huffman Coding.",
      "L_bar_Huffman is the minimum average codeword length over all valid binary prefix codes, defined as the sum from i = 1 to k of p_i times l_i.",
      "p_i is the probability of symbol i, l_i is its assigned bit length, and k is the alphabet size."
    ]
  },
  {
    slideNumber: 9,
    slideTitle: "Why Does the Greedy Algorithm Work?",
    durationMinutes: "1:10",
    durationSeconds: 70,
    notes: [
      "[8:20 – 9:30] Why does a local greedy merge guarantee global optimality? The proof rests on three visual lemmas.",
      "[Step 0] 01 — Greedy Choice (The Exchange Argument): In any optimal tree T, swapping the two lowest-frequency nodes x, y into the deepest sibling leaves a, b never increases the total cost: Cost(T') <= Cost(T).",
      "[Click Step 1] 02 — Reduction: Collapsing sibling leaves x and y into a composite leaf z of frequency f(x)+f(y) reduces the problem from n symbols to n - 1 symbols.",
      "[Click Step 2] 03 — Optimal Substructure: Expanding leaf z back into children x and y inside an optimal reduced tree T' yields an optimal tree T for the original alphabet."
    ]
  },
  {
    slideNumber: 10,
    slideTitle: "Why Huffman Beats Other Approaches",
    durationMinutes: "1:30",
    durationSeconds: 90,
    notes: [
      "[9:30 – 11:00] Let's compare three encoding strategies visually on the same 13-pixel stream where dominant symbol A appears 5 times (38.5%) and B, C, D, E appear twice each.",
      "[Click Step 1] 1. Fixed-Length Coding gives every symbol a 3-bit block—wasting 3 bits on each A, totaling 39 bits (3.00 bits/symbol).",
      "[Click Step 2] 2. Shannon-Fano splits top-down ({A,B}=7 vs {C,D,E}=6), trapping A at depth 2 (2 bits '00'), totaling 30 bits (2.31 bits/symbol).",
      "[Click Step 3] 3. Huffman Coding merges the rarest symbols from the bottom up first, leaving dominant symbol A at depth 1 with a single 1-bit block ('0'), shrinking the stream to 29 bits (2.23 bits/symbol)—the global minimum."
    ]
  },
  {
    slideNumber: 11,
    slideTitle: "Computational Complexity: Big-O Analysis",
    durationMinutes: "1:00",
    durationSeconds: 60,
    notes: [
      "[11:00 – 12:00] How fast is Huffman Coding on real images? Let N be total image bytes (millions) and k <= 256 be unique byte values.",
      "Step 01 counts frequencies in one linear pass O(N). Step 02 initializes the min-heap in O(k). Step 03 executes k - 1 greedy merges in O(k log k).",
      "[Click Step 1 & 2] Total time is O(N + k log k) and extra memory is O(k) (at most 511 nodes). Since N >> k, building the tree takes under 0.1 milliseconds."
    ]
  },
  {
    slideNumber: 12,
    slideTitle: "Why Use a Priority Queue?",
    durationMinutes: "0:45",
    durationSeconds: 45,
    notes: [
      "[12:00 – 12:45] This graph illustrates why a min-heap priority queue is essential for Step 3.",
      "Scanning an unsorted array repeatedly takes quadratic time O(k²) = 65,536 operations at k = 256.",
      "[Click Step 1] A binary min-heap takes O(k log k) = 2,048 operations—a 32-fold reduction in tree construction work."
    ]
  },
  {
    slideNumber: 13,
    slideTitle: "Live Demonstration: From Image to PNG",
    durationMinutes: "1:45",
    durationSeconds: 105,
    notes: [
      "[12:45 – 14:30] Now let's watch the real algorithm run step-by-step on a live image. You can advance through all 7 stages using Space, Click, or Right Arrow, or switch between the Diagram, NJUPT Emblem, and Multi-Tone presets.",
      "[Step 1 -> 2] The image breaks apart into an 8x8 grid of discrete colored pixels.",
      "[Step 3] Each colored pixel reveals its underlying byte value (0–255).",
      "[Step 4] We tally the real byte frequencies—notice each percentage bar is colored with the actual pixel color.",
      "[Step 5] The greedy algorithm merges the lowest frequencies bottom-up into a Huffman tree.",
      "[Step 6 -> 7] Frequent bytes become short binary codes, and decoding reconstructs the exact lossless PNG with 0 byte differences."
    ]
  },
  {
    slideNumber: 14,
    slideTitle: "Thank You",
    durationMinutes: "0:30",
    durationSeconds: 30,
    notes: [
      "[14:30 – 15:00] Thank you very much for your attention.",
      "'Small choices can lead to optimal solutions.' We are happy to take any questions."
    ]
  }
];
