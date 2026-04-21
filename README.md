# MAISON SEVEN — Interior Design Studio

> *A digital architectural experience.*
> Scroll is not scroll. Scroll is walking.

A world-class, immersive, multi-page website for a fictitious interior design
studio. Built as a slow, editorial, architectural experience rather than a
conventional site.

---

## ✦ Stack

| Layer | Tool |
| --- | --- |
| Framework | **React 19** + **Vite** |
| Styling | **Tailwind CSS v3** · custom fonts (Fraunces, Cormorant Garamond, Inter, JetBrains Mono) |
| Routing | **react-router-dom** |
| Motion | **Framer Motion** (micro-interactions + page transitions) |
| Scroll FX | **GSAP** + **ScrollTrigger** (scrubbed scenes, pinning, horizontal scroll, parallax) |
| Smooth scroll | **Lenis** (RAF-driven, wired into GSAP ticker) |
| 3D | **three**, **@react-three/fiber**, **@react-three/drei** (minimal interior scene with scroll-driven camera) |

---

## ✦ Getting started

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build
npm run preview  # preview the prod build
```

---

## ✦ Pages

| Route | Description |
| --- | --- |
| `/` | **Home.** Pinned 3D hero where the camera choreographs itself through four rooms as you scroll (Arrival → Living → Workspace → Bedroom → Concept). Principles section, room chapters, marquee manifesto, featured projects with parallax, press wall, magnetic CTA. |
| `/projects` | **Archive.** Editorial list view with hover image preview, filter rail, thumbnail grid. |
| `/projects/:id` | **Project detail.** Full-bleed hero, credits table, intro, **horizontal scroll chapters** (GSAP pinned), parallax figure stack, pull quote, next-project threshold. |
| `/studio` | **About.** Manifesto, portrait, numbers strip, team list, chronicle, materials marquee. |
| `/services` | Three-discipline accordion with animated open/close, four-movement process, engagement pricing. |
| `/contact` | Luxury editorial form — inline fields, chips for intent + budget, magnetic send button, received state. |

---

## ✦ Folder structure

```
seven/
├── index.html                  # Fonts preloaded, theme-color, SEO
├── tailwind.config.js          # Custom palette, fonts, animations, easings
├── postcss.config.js
├── src/
│   ├── main.jsx                # Router bootstrap
│   ├── App.jsx                 # Providers · Routes · PageTransition
│   ├── index.css               # Tailwind + base + components + grain/vignette
│   │
│   ├── lib/
│   │   └── SmoothScroll.jsx    # Lenis + GSAP ticker bridge, route-reset
│   │
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav + full-screen Menu (clip-path reveal)
│   │   ├── Footer.jsx          # Manifesto CTA + atelier info
│   │   ├── Cursor.jsx          # Dot + lagging ring, context-aware (view / link / default)
│   │   ├── PageTransition.jsx  # Twin slab reveal between routes
│   │   ├── MagneticButton.jsx  # Spring-eased magnetic attraction
│   │   ├── Reveal.jsx          # <Reveal> + <LinesReveal> (word-masked text)
│   │   ├── Marquee.jsx         # Editorial scrolling ticker
│   │   └── Scene3D.jsx         # R3F canvas · room · furniture · lights · camera rig
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Studio.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   │
│   └── data/
│       └── projects.js         # Projects · rooms · services · press quotes
```

---

## ✦ 3D integration approach

Rather than loading a heavy external asset (`.glb`, Spline scene), the interior
is **composed entirely from primitives** inside R3F — a diorama of four rooms:

* `Room` — floor, plaster walls, window-with-mullion built from wall segments
  (true light passes through the opening), dark accent wall, baseboard gold
  strip, half-height partition.
* `Furniture` — a cushioned low sofa, travertine coffee table, long blackened
  workbench, low bedroom platform, trio of concept-studio pedestals.
* `FloatingObjects` — pendant lamp, floating vase, a warm dust-of-light sphere,
  all using `<Float>` from drei.
* `Lights` — warm sun through the window + cool fill + two practicals (pendant
  + bedside). Soft contact shadows + `SoftShadows`.
* `CameraRig` — reads a `scrollRef` (normalised 0 → 1) and interpolates between
  five "stages" with smoothstep easing. A subtle pointer-based parallax adds
  life. GSAP `ScrollTrigger` (on the hero's tall container) writes the value.

No assets to ship, no shaders to compile — it boots instantly and renders
crisply on laptops while still feeling architectural.

---

## ✦ Animation strategy

* **Lenis** runs on one RAF loop; its `scroll` event drives `ScrollTrigger.update`, so every scrub is silk.
* **GSAP ScrollTrigger** owns: the hero camera scrub, project-detail **horizontal pinned** chapters, parallax figures, row reveals.
* **Framer Motion** owns: page transitions (slab reveal), menu overlay (clip-path), micro-interactions (magnetic buttons, masked word reveals).
* **Custom cursor** morphs on `data-cursor="view|link"` hinting at "walk toward" vs "press".
* Every text block breaks into **per-word masked reveals** for an editorial feel.

---

## ✦ Design language

* **Palette**: `bone #F5F5F3` · `mist #E7E5E4` · `ink #1C1C1C` · `coal #0F0F0F` · `gold #C2A878`.
* **Type**: Fraunces / Cormorant Garamond for display + italic, Inter for body, JetBrains Mono for eyebrows & HUD numerics.
* **Grid**: 12-col, generous whitespace, editorial misalignments in featured grids.
* **Finish**: a subtle grain overlay + corner vignette for a printed-matter feel.

---

## ✦ Principles honoured

- Slow, intentional pacing
- No clutter — the 3D canvas and type carry the weight
- No flashy colours — warm neutrals, gold accent only
- No generic agency tropes — this behaves like a magazine that moves

---

## ✦ License

Demonstration project. Imagery via Unsplash. Studio, team, timeline, and press
quotes are fictional.
