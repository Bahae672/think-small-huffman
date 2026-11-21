# Think Small: How Greedy Algorithms Compress Images
### Huffman Coding and Lossless Image Compression

**Course:** Analysis of Algorithms  
**Institution:** Nanjing University of Posts and Telecommunications  
**Presenters:** Bahaeddine EL ATIGUI & Hafssa GAMMAZ  
**Academic Year:** 2026  

---

## 1. Quick Start: How to Run the Presentation

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or pnpm

### Installation & Development Server
```bash
# Clone or navigate to the project directory
cd think_small

# Install dependencies
npm install

# Start the local development server with Hot Module Replacement
npm run dev
```
Open your browser at `http://localhost:5173/` to view the presentation.

### Production Build & Preview
To run the high-performance production build:
```bash
npm run build
npm run preview
```
This builds optimized bundles in `dist/` and hosts a local preview at `http://localhost:4173/`.

---

## 2. Presentation Navigation & Keyboard Shortcuts

The presentation runs at a logical **1920 × 1080** resolution, automatically scaled to fit any browser window or projector screen with zero distortion.

| Key / Action | Function |
|---|---|
| `Space` or `→` or `PageDown` | Advance to the next animation step or slide |
| `←` or `PageUp` | Return to the previous animation step or slide |
| `Home` / `End` | Jump to Slide 1 (Title) / Slide 14 (Thank You) |
| `F` | Toggle Fullscreen mode |
| `S` or `N` | Toggle Presenter Speaker Notes Drawer (with slide jumper) |
| Click on background | Advance to the next animation step or slide |

> **Note:** The UI contains only a minimal header (course title and slide counter), keeping the canvas free from clutter to ensure a clean academic conference aesthetic.

---

## 3. Slide Deck Architecture (14 Slides)

1. **Slide 1: Title & Presenters**
   - Clean, minimalistic academic conference title slide with the square NJUPT university emblem, presentation title, subtitle, course, and presenters (**Bahaeddine EL ATIGUI** & **Hafssa GAMMAZ**).
2. **Slide 2: The Growing Cost of Digital Images**
   - Real-world motivation: High-contrast academic graphics, diagrams, and UI assets accumulating into massive byte volumes and bandwidth bottlenecks.
3. **Slide 3: The Fundamental Question**
   - *"Can we reduce the amount of data while preserving every original pixel?"*
   - Clear visual pipeline: `ORIGINAL IMAGE → COMPRESSION → RECONSTRUCTED IMAGE`, highlighting Lossless Compression.
4. **Slide 4: Huffman Coding in PNG**
   - Architectural context within the DEFLATE standard: Filtering $\to$ LZ77 $\to$ **Huffman Entropy Coding** $\to$ Bitstream.
5. **Slide 5: The Greedy Choice**
   - The central greedy heuristic: *Repeatedly combine the two symbols with the lowest frequencies*. 6-symbol frequency distribution.
6. **Slide 6: Algorithm 1 — Huffman(C) Pseudocode**
   - Formal CLRS pseudocode with min-priority queue operations and progressive highlighting.
7. **Slide 7: Constructing the Huffman Tree**
   - Animated step-by-step min-heap merges (Steps 0–5) with geometric edge clipping terminating strictly at node circumferences without crossing node centers or labels.
8. **Slide 8: Mathematical Formulation**
   - Boxed theorem:
     $$\bar{L}_{\mathrm{Huffman}} = \min_{\text{prefix codes}} \sum_{i=1}^k p_i l_i$$
     With exact definitions of $\bar{L}$, $p_i$, $l_i$, and alphabet size $k$.
9. **Slide 9: Why Does the Greedy Algorithm Work?**
   - 3-pillar proof structure: Greedy-Choice Property (exchange argument), Reduction, and Optimal Substructure.
10. **Slide 10: Huffman Coding vs. Alternative Approaches**
    - Rigorous benchmark on an integer frequency distribution: A: 5, B: 2, C: 2, D: 2, E: 2 ($N = 13$).
    - Comparison: Fixed-Length (3.00 b/sym), Shannon-Fano (2.31 b/sym), Huffman (2.23 b/sym).
    - Large comparison bar chart (~60% of slide) highlighting Huffman's global optimality.
11. **Slide 11: Computational Complexity — Big-O Analysis**
    - Operation breakdown: $O(N)$ frequency tally, $O(k)$ heap build, $O(k \log k)$ greedy merges, $O(k)$ tree traversal $\to O(N + k \log k)$ total time, $O(k)$ auxiliary space.
12. **Slide 12: Why Use a Priority Queue?**
    - Large comparison graph (~75% of slide) contrasting Min-Heap $O(k \log k)$ vs. Naive Array Scan $O(k^2)$ ($32\times$ speedup at $k = 256$).
13. **Slide 13: Interactive Live Demonstration**
    - Single-slide continuous fluid visual metamorphosis:
      $$\text{IMAGE} \longrightarrow \text{PIXELS} \longrightarrow \text{NUMBERS} \longrightarrow \text{HUFFMAN TREE} \longrightarrow \text{BINARY DATA} \longrightarrow \text{RECONSTRUCTED IMAGE}$$
    - Genuine byte-by-byte reconstruction with bit-exact validation (`PASS: 0 Byte Differences`).
14. **Slide 14: Thank You**
    - Ultra-minimalist closing slide featuring:
      - `# Thank You`
      - `*"Small choices can lead to optimal solutions."*`

---

## 4. How the Interactive Live Demonstration Works

On **Slide 13**, the entire demonstration flows in **one continuous visual metamorphosis** on a single slide:

1. **Standby / Ready:** Displays an initial prompt to begin compressing an image, with an option to upload any custom PNG/JPEG.
2. **Phase 1 — Source Image Display:** The image is introduced in high resolution.
3. **Phase 2 — Visible Pixel Grid:** The image smoothly transitions into an $8 \times 8$ magnified grid of discrete pixels.
4. **Phase 3 — Numerical Values:** Each pixel dissolves into its underlying numerical byte values (e.g. RGBA channels $[0 \dots 255]$).
5. **Phase 4 — Frequency Organizers:** The byte values group into an empirical frequency ranking.
6. **Phase 5 — Greedy Merges:** The greedy algorithm step-by-step extracts the two lowest frequencies and fuses them into a binary Huffman tree.
7. **Phase 6 — Binary Bitstream:** Traversal generates variable-length bit codewords (`0` and `1`), showing dense bitstream packing.
8. **Phase 7 — Exact Lossless Reconstruction:** The bitstream is decoded back into the original image, displaying a side-by-side verification confirming $100\%$ byte-exact equivalence.
