# Think Small: How Greedy Algorithms Compress Images
### Huffman Coding and Lossless Image Compression

**Course:** Analysis of Algorithms  
**Institution:** Nanjing University of Posts and Telecommunications  
**Presenters:** Bahaeddine EL ATIGUI & Hafssa GAMMAZ  
**Academic Year:** 2026  

---

## 1. How to Host This Presentation on Vercel (100% Free)

You can host this project on **Vercel** for free using either **Method A (GitHub + Vercel Website — Recommended)** or **Method B (Direct Terminal Upload via Vercel CLI)**.

### Step 0: Add Your Example Images First
Before deploying, place all the example images you want available during your live demo inside:
```text
c:\Projects\think_small\src\examples\
```
* Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.bmp`, `.svg`.
* Every image inside `src/examples/` is **automatically bundled** into the **`📁 Examples Folder`** popup on Slide 13 and will be accessible on any computer when you open your Vercel link.

---

### Method A: Deploy via GitHub & Vercel Dashboard (Recommended)

This method gives you a permanent URL (e.g., `https://think-small-huffman.vercel.app`) that automatically updates whenever you push new images or changes.

#### Step 1 — Create a Free GitHub Repository
1. Go to [https://github.com/new](https://github.com/new) and sign in.
2. Under **Repository name**, type `think-small-huffman`.
3. Choose **Public** (or **Private** — both work for free on Vercel).
4. Leave *"Add a README file"* unchecked and click **Create repository**.

#### Step 2 — Push Your Project from Your Computer to GitHub
Open PowerShell or your terminal inside `c:\Projects\think_small` and run these commands one by one:

```powershell
# 1. Initialize Git in the project folder (if not already initialized)
git init

# 2. Stage all project files (including src/examples/)
git add .

# 3. Create your first commit
git commit -m "Initial commit: Huffman Coding presentation"

# 4. Set the main branch name
git branch -M main

# 5. Link to your GitHub repository (replace YOUR_GITHUB_USERNAME with your username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/think-small-huffman.git

# 6. Upload the project to GitHub
git push -u origin main
```

#### Step 3 — Connect GitHub to Vercel (Free Hobby Plan)
1. Go to [https://vercel.com/signup](https://vercel.com/signup) and click **Continue with GitHub**.
2. Once logged into your Vercel Dashboard, click **Add New...** $\to$ **Project**.
3. Find `think-small-huffman` in your repository list and click **Import**.
4. Verify the build settings (Vercel detects Vite automatically):
   * **Framework Preset:** `Vite`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Click **Deploy**.
6. Wait ~30 seconds. Vercel will give you your live presentation link (e.g., `https://think-small-huffman.vercel.app`).

#### How to Add More Example Images Later (Method A)
Whenever you add or remove images in `c:\Projects\think_small\src\examples\`, run:
```powershell
git add .
git commit -m "Add new example images"
git push
```
Vercel will automatically rebuild and update your live website in ~20 seconds.

---

### Method B: Deploy Directly from Terminal (No GitHub Required)

If you don't want to use GitHub, you can upload the project straight from PowerShell using the official Vercel CLI:

#### Step 1 — Create a Free Account on Vercel
Sign up at [https://vercel.com/signup](https://vercel.com/signup).

#### Step 2 — Run the Vercel CLI from Your Project Folder
Open PowerShell in `c:\Projects\think_small` and run:

```powershell
# 1. Log in to Vercel in your terminal (opens browser confirmation)
npx vercel login

# 2. Deploy straight to Production
npx vercel --prod
```

When prompted by the CLI for the first time, press **Enter** to accept the default answers:
* *Set up and deploy `C:\Projects\think_small`?* $\to$ **`Y`**
* *Which scope do you want to deploy to?* $\to$ Press **Enter** (your personal account)
* *Link to existing project?* $\to$ **`N`**
* *What’s your project’s name?* $\to$ **`think-small-huffman`** (Press **Enter**)
* *In which directory is your code located?* $\to$ **`./`** (Press **Enter**)
* *Want to modify these settings?* $\to$ **`N`** (Press **Enter**)

Once finished (~30 seconds), the terminal will print your live **`Production: https://...vercel.app`** link!

#### How to Update Later (Method B)
If you add more images to `src/examples/` later, just run:
```powershell
npx vercel --prod
```

---

## 2. Running Locally on Your Computer

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm

### Development Server
```powershell
cd c:\Projects\think_small
npm install
npm run dev
```
Open `http://localhost:3000/` (or the port printed in the terminal).

### Production Build & Preview
```powershell
npm run build
npm run preview -- --port 4173
```
Open `http://localhost:4173/`.

---

## 3. Presentation Navigation & Keyboard Shortcuts

The presentation runs at a logical **1920 × 1080** resolution, automatically scaled to fit any browser window or classroom projector without distortion.

| Key / Action | Function |
| :--- | :--- |
| `Space` / `→` / `PageDown` / `Click` | Advance to the next animation step or slide |
| `←` / `PageUp` | Return to the previous animation step or slide |
| `↓` or `Shift + →` | Fast-skip directly to the next slide (great for Q&A) |
| `↑` or `Shift + ←` | Fast-skip directly to the previous slide (great for Q&A) |
| `Home` / `End` | Jump to Slide 1 (Title) / Slide 14 (Thank You) |
| `F` | Toggle Fullscreen mode |
| `S` or `N` | Toggle Presenter Lecture Script & Slide Jumper Drawer |

---

## 4. Slide Deck Architecture & 15-Minute Pacing Plan

| Slide | Title | Target Time | Elapsed |
| :---: | :--- | :---: | :---: |
| **1** | **Think Small: How Greedy Algorithms Compress Images** | `0:30` | `0:00 – 0:30` |
| **2** | **The Growing Cost of Digital Images** | `0:50` | `0:30 – 1:20` |
| **3** | **The Fundamental Question** | `0:40` | `1:20 – 2:00` |
| **4** | **Huffman Coding in PNG** | `1:00` | `2:00 – 3:00` |
| **5** | **The Greedy Choice** | `1:15` | `3:00 – 4:15` |
| **6** | **Algorithm 1 — Huffman(C) Pseudocode** | `1:15` | `4:15 – 5:30` |
| **7** | **Constructing the Huffman Tree (Steps 0–6)** | `2:00` | `5:30 – 7:30` *(Halfway Point)* |
| **8** | **Mathematical Formulation** | `0:50` | `7:30 – 8:20` |
| **9** | **Why Does the Greedy Algorithm Work? (Exchange Argument)** | `1:10` | `8:20 – 9:30` |
| **10** | **Why Huffman Beats Other Approaches (Visual Bitstream)** | `1:30` | `9:30 – 11:00` |
| **11** | **Computational Complexity — Big-O Analysis** | `1:00` | `11:00 – 12:00` |
| **12** | **Why Use a Priority Queue? (Animated Growth Graph)** | `0:45` | `12:00 – 12:45` |
| **13** | **Live Demonstration: From Image to PNG (Steps 1–7)** | `1:45` | `12:45 – 14:30` |
| **14** | **Thank You** | `0:30` | `14:30 – 15:00` |
