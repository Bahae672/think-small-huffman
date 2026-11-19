# Think Small: How Greedy Algorithms Compress Images
### Huffman Coding and Lossless Image Compression

An academic, interactive, browser-based slide presentation and algorithmic demonstration engineered for the **Analysis of Algorithms** course at **Nanjing University of Posts and Telecommunications**.

---

## 1. Project Overview

This project implements an academic research conference presentation (1920 &times; 1080 canvas) combined with a genuine, client-side interactive algorithm demonstration of Huffman Coding applied to image raster data.

- **University:** Nanjing University of Posts and Telecommunications (NJUPT)
- **Course:** Analysis of Algorithms (Fall 2026)
- **Topic:** Greedy Algorithms — Huffman Coding
- **Real-World Context:** Lossless image compression (PNG / DEFLATE pipeline)
- **Target Presentation Time:** ~15 minutes (with per-slide scripts and pacing)
- **Visual Aesthetic:** Minimalist academic research style (Pure white `#FFFFFF`, near-black `#202124`, dark teal `#147D78`, Computer Modern / Latin Modern serif typography for mathematical expressions and pseudocode).

---

## 2. Key Features

1. **Academic Slide Deck (12 Slides):**
   - **Slide 1:** Minimalist academic title slide with horizontal university logo slot, title, subtitle, and metadata.
   - **Slide 2 (Real-World Problem):** Motivating scenario for university digital learning infrastructure, bandwidth/storage trade-offs, and data flow pipeline.
   - **Slide 3 (PNG & Huffman Coding):** Architecture diagram isolating the Huffman entropy stage within PNG's DEFLATE specification.
   - **Slide 4 (The Greedy Choice):** The local selection rule: *"Combine the two least frequent symbols"*, with illustrative 6-symbol distribution ($A=45, B=13, C=12, D=16, E=9, F=5$).
   - **Slide 5 (Formal Pseudocode):** Exact research paper typesetting of **Algorithm 1 HUFFMAN(C)** from Cormen, Leiserson, Rivest, and Stein (CLRS), including horizontal rules, line numbers (1–10), small-caps procedure names, italicized variables, and min-priority queue explanation.
   - **Slide 6 (Huffman Tree Construction):** Step-by-step priority queue merges (1 to 5) with interactive stepping controls, SVG tree branches, and resulting prefix-free code table.
   - **Slide 7 (Mathematical Formulation):** Cost objective function $B = \sum (f_i \times l_i)$, comparing 300 fixed-length bits vs. 224 Huffman bits (25.33% payload reduction).
   - **Slide 8 (Optimality):** Rigorous 3-part proof structure (Greedy-Choice Property, Reduction, Optimal Substructure).
   - **Slide 9 (Computational Complexity):** Two-column layout with asymptotic table ($O(N)$, $O(k)$, highlighted $O(k \log k)$, $O(N + k \log k + B)$) and a 2D line graph comparing binary heap $k \log_2(k)$ against repeated scanning $k^2$ for $k \le 256$.
   - **Slide 10 (Interactive Live Demonstration):** Continuous 8-stage visual transformation operating on genuine image data decoded in the browser.
   - **Slide 11 (Conclusion):** Problem, Approach, Result, and closing axiom *"Locally optimal decisions. Globally optimal encoding."*
   - **Slide 12 (References):** Formal bibliography ([1] Huffman 1952, [2] W3C PNG 2025, [3] Deutsch DEFLATE RFC 1951, [4] CLRS 2009).

2. **Genuine Live Demonstration (Slide 10):**
   - **Stage 1 (Image Upload):** Supports user file upload (`.png`, `.jpg`, `.jpeg`, `.webp`) or instant academic presets. Displays resolution, pixel count, and byte stream size.
   - **Stage 2 (Pixels):** Spatial decomposition into an enlarged pixel grid with representative 8&times;8 micro-grid and interactive RGB/RGBA inspector.
   - **Stage 3 (RGBA Values):** Serialization of 2D pixels into a 1D stream of unsigned byte integers.
   - **Stage 4 (Frequencies):** Empirical 256-bin frequency histogram and top-10 frequency ranking.
   - **Stage 5 (Greedy Tree):** Min-heap simulation pairing lowest frequencies, step-by-step or fast-forward, executing Algorithm 1 with deterministic tie-breaking.
   - **Stage 6 (Encoding):** Prefix-free codebook emission and true bit-packed serialization into a `Uint8Array` buffer.
   - **Stage 7 (Reconstruction):** Bitstream traversal through the tree, raster reconstruction, side-by-side canvas display, and an automated byte-by-byte equality check displaying: `EXACT RASTER RECONSTRUCTION: PASS` (100% fidelity).
   - **Stage 8 (Results):** Prominent metrics for original payload, Huffman payload, payload savings/expansion, and canonical tree metadata overhead.

3. **Presenter Tools & Speaker Notes:**
   - Speaker notes drawer toggled via the `S` or `N` key.
   - Slide target durations and complete speaking script for every slide.
   - Quick jump matrix to instantly navigate between slides 1–12.

---

## 3. Installation & Local Execution

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)

### Installation
```bash
# Clone or navigate into the project directory
cd c:\Projects\think_small

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your terminal) in your browser.

### Building for Production
```bash
# Type-check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 4. Presentation Navigation & Keybindings

| Key / Action | Function |
|---|---|
| **Arrow Right / Space / Page Down** | Advance to next slide |
| **Arrow Left / Page Up** | Move to previous slide |
| **Click on Canvas** | Advance to next slide (clicks on demo controls do not advance) |
| **S / N** | Toggle Presenter Speaker Notes drawer |
| **F** | Toggle Fullscreen mode |
| **Home / End** | Jump directly to Slide 1 / Slide 12 |

---

## 5. University Logo Replacement Instructions

The presentation is preconfigured to load the wide, horizontal university title logo from:

```
public/assets/njupt-wide-title-logo.png
```

### Steps to replace the placeholder:
1. Place your wide, horizontal university title logo image into the `public/assets/` folder.
2. Name the file exactly:
   ```
   njupt-wide-title-logo.png
   ```
3. The application will automatically detect and render the logo on Slide 1:
   - Preserves original aspect ratio (`object-fit: contain`).
   - Does not stretch, crop, recolor, or distort the logo.
   - Contains ample surrounding whitespace.
   - Until the image is placed, a clean academic typographic title banner is displayed as a graceful fallback.

---

## 6. Technical Stack & Architecture

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite
- **Typography:** Inter, Crimson Pro, Latin Modern Math, JetBrains Mono
- **Visuals:** Pure SVG vector graphics for trees, pipelines, and graphs
- **Image Processing:** Browser Canvas API for raster extraction, RGBA8 manipulation, and pixel reconstruction
- **Priority Queue:** Custom binary min-heap (`PriorityQueue`) with deterministic tie-breaking on frequency, insertion order, and node ID.
- **Bitstream:** Genuine bit-packing into `Uint8Array` byte buffers with MSB-first packing and padding calculations.
