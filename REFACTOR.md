# REFACTOR

What changed, what it cost, and what is still generic.

Baseline is `deee517`, the last commit before this work. Every number below was
measured, not estimated.

---

## 1. Every tell from AUDIT.md, and what replaced it

### Typography

| # | Tell | Replaced by | Where |
|---|---|---|---|
| T1 | Google Fonts CDN, 3 families, 11 static weights | Three self-hosted subsets, 66 KB total, no third-party font requests | `src/styles/fonts.css`, `scripts/build-fonts.py` |
| T2 | Fraunces loaded with `opsz 9..144` and the axis never used | `opsz` kept live as the one variable axis; `wght`/`SOFT`/`WONK` pinned into a single file | `scripts/build-fonts.py` |
| T3 | 23 ad-hoc font sizes, no ratio | 1.25 modular scale as ten tokens; 102 values snapped onto it | `src/styles/tokens.css` |
| T4 | Mono setting the nav, buttons, tags, kickers, captions and footer | Mono confined to the terminal and two numeric columns; 12 declarations deleted outright | `components.css`, both demos |
| T5 | No italics anywhere despite three families | Karrik italic shipped (11.6 KB) and used for emphasis, since Karrik has no bold | `fonts.css` |
| T6 | Measure in `ch` once, in `px` four times (620/760/860/880) | One `--measure: 68ch` | `tokens.css` |
| T7 | No `tabular-nums` on the demo's numeric columns | `tabular-nums` on both columns and the terminal window | `SimilarityDemo`, `TerminalDemo` |
| T8 | `text-wrap: balance` used once, `pretty` never | `balance` on all display sizes, `pretty` on all body copy | `components.css` |
| T9 | Eight line-heights assigned ad hoc | Three tokens, shrinking as size grows: 1.6 / 1.15 / 1.05 | `tokens.css` |

### Colour

| # | Tell | Replaced by | Where |
|---|---|---|---|
| C1 | Six accents doing one job | One accent with a named list of jobs | `tokens.css`, `DIRECTION.md` §3 |
| C2 | Nine tokens declared, zero `var()` uses | Deleted | commit `36d6f6a` |
| C3 | Green→cyan→purple gradient on the H1, on a 14s loop | Solid `--ink`; gradient, `background-clip` and the keyframe deleted | `components.css` |
| C4 | Mesh-gradient blooms behind `.hero` and every `.page-section` | Deleted | `layout.css` |
| C5 | ~40 raw `rgba()` literals | Zero raw colour values outside `tokens.css` | verified by grep |
| C6 | Six hardcoded hexes bypassing the tokens | Deleted with the gradients that held them | — |
| C7 | Neutrals across three hue families | Whole ramp tinted to hue 200–220 | `tokens.css` |
| C8 | Not OKLCH, contrast never checked | OKLCH, every token carries its measured ratio as a comment | `tokens.css` |
| C9 | Focus ring cyan while every other state was green | One accent, one focus ring | `base.css` |

### Layout

| # | Tell | Replaced by | Where |
|---|---|---|---|
| L1 | `padding: 7rem 0` repeated for the whole site | Three rhythms that mean different things | `tokens.css`, `layout.css` |
| L2 | Centred column forever | Still a column, but the project index hangs outside it | `layout.css` |
| L3 | 28 ad-hoc rem spacing values | Ten-step ladder derived from the type scale | `tokens.css` |
| L4 | `/` and `/projects` rendered identical lists | `featured` means something: 3 under "Selected work", 6 under "Everything" | `projects.ts` |
| L5 | One density everywhere | Dense numbered index against a quiet hero | `ProjectsGrid.astro` |
| L6 | Nothing breaks the grid | "penguins" hangs into the left margin, once | `components.css` |
| L7 | `calc(100vh - 68px)` vs `- 58px`, correcting for an absolutely-positioned nav | `100svh` | `layout.css` |

### Components

| # | Tell | Replaced by | Where |
|---|---|---|---|
| K1 | 14 glow shadows as the default surface | Zero shadows on the site | verified by grep |
| K2 | `translateY(-2px)` hover lift on both buttons | Colour and border-colour changes only | `components.css` |
| K3 | Eight radius values against a `--radius` token that was bypassed | Two: `--radius-edge`, `--radius-pill` | `tokens.css` |
| K4 | Gradient glow behind the about photo | Deleted | `components.css` |
| K5 | Green/cyan/violet traffic-light dots in the terminal chrome | One neutral colour | `TerminalDemo.astro` |
| K6 | No `::selection`, no `caret-color` | Both styled on the accent | `base.css` |
| K7 | Nested radii copied, not reduced | One value held; nothing nests two radii now | — |
| — | Six bordered tag pills per row | Text separated by middots | `components.css` |
| — | Letter-in-a-box standing in for a missing logo | Deleted; it carried no information | `ProjectsGrid.astro` |

### Motion

| # | Tell | Replaced by | Where |
|---|---|---|---|
| M1 | Scroll-triggered fade-in-up, 720ms, 80ms stagger, IntersectionObserver | Deleted entirely. `/` and `/projects` ship no JavaScript | commit `9995f68` |
| M2 | Hero entrance stagger at 120/320/440/560ms | Deleted | `components.css` |
| M3 | `name-shimmer`, 14s infinite | Deleted | — |
| M4 | `aurora-drift`, `twinkle`, `scroll-sweep` | All three deleted | — |
| M5 | `reveal-up` on the about photo | Deleted | — |
| M6 | `ease` / `ease-in-out` everywhere, no tokens | `--ease-out` / `--ease-in`, `--dur-state` 140ms, `--dur-layout` 260ms | `tokens.css` |
| M7 | `prefers-reduced-motion` as `1ms !important` | `animation: none`, a real no-motion path | `responsive.css` |
| M8 | `padding-left` animated on hover | No layout property is animated | — |

### Copy

| # | Tell | Replaced by | Where |
|---|---|---|---|
| P1 | Empty `<p>` rendering as blank space on the live About page | Gone; page rewritten | `about.astro` |
| P2 | About page was a one-sentence stub | One deliberate paragraph plus the facts list | `about.astro` |
| P3 | "Hit Forensics' Q6", a project that exists nowhere on the site | Name removed. The 447,000-track figure is real and stays, confirmed with Ronnie | `SimilarityDemo.astro` |
| P4 | Four em dashes | Colons, commas, new sentences | — |
| P5 | Straight apostrophes throughout | Typographic apostrophes | `projects.ts` |
| P6 | "buliding" | "building" | `projects.ts` |
| P7 | "About the engineer", "Project field note", "Interactive artifact" ×2, "Stack and signals" | The real project kind; a real `<h2>Stack</h2>`; the two eyebrows deleted | — |
| P8 | Every project `kind` the same slashed-noun shape | Left alone. See "still generic" below | — |
| P9 | `h1` reading "About", restating the nav | Left as "About". A one-word heading on a short page is honest | — |
| P10 | Hardcoded `© 2026` | Generated | `BaseLayout.astro` |

### Code hygiene

| # | Tell | Replaced by | Where |
|---|---|---|---|
| H1 | 1,210-line layout holding all site CSS | 122-line layout; CSS in six files by role | `src/styles/` |
| H2 | Orphaned 1.4 MB `profile_grey copy.png` | Deleted | commit `36d6f6a` |
| H3 | 1.3 MB portrait, 684 KB logo, no optimisation | 108 KB and 11 KB, with intrinsic dimensions | `public/` |
| H4 | `.hero-meta` `aria-hidden`, hiding real content | Only the decorative dots are hidden | `index.astro` |
| H5 | About links visually identical to body text | `.text-link`, underlined on the accent | `about.astro` |
| H6 | `Record<string, any>` | Typed `DemoKey` | `DemoRenderer.astro` |
| H7 | `basePath` snippet duplicated in 4 files | `src/lib/paths.ts` | — |
| H8 | `.project-label`, `.row-logo img` (unmatchable) | Deleted | — |
| H9 | Orphaned `.hl-peng` from removed copy | Re-wired, and the penguins are back | `index.astro` |
| H10 | No 404, no skip link, one-PNG favicon, `summary` card | All four addressed | `404.astro`, `BaseLayout.astro` |
| H11 | Five markup classes with no rule | `.row-logo--filler` deleted; the rest are structural hooks and stay | — |
| H12 | `embedUrl`, `demoUrl` declared and set by nothing | Deleted with their render branches | `projects.ts` |
| H13 | `src/.DS_Store` committed | Deleted | — |
| H14 | No `color-scheme`, no print styles | `color-scheme: dark`; a real print stylesheet | `tokens.css`, `responsive.css` |

---

## 2. Fonts

| Face | Role | Licence | Source | Upstream | Shipped |
|---|---|---|---|---|---|
| Fraunces | Display | SIL OFL 1.1 | [undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) | 375.1 KB | **25.7 KB** |
| Karrik Regular | Body | SIL OFL 1.1 | [phantomfoundry/karrik_fonts](https://gitlab.com/phantomfoundry/karrik_fonts) | 89.1 KB | **11.2 KB** |
| Karrik Italic | Emphasis | SIL OFL 1.1 | same | 68.0 KB | **11.6 KB** |
| Monaspace Radon | Mono, demo pages only | SIL OFL 1.1 | [githubnext/monaspace](https://github.com/githubnext/monaspace) v1.400 | 2,533.6 KB | **17.8 KB** |
| | | | **Total** | **3,065.8 KB** | **66.3 KB** (−97.8%) |

Licence texts ship in `public/fonts/*-OFL.txt`. Three things worth recording:

- **Monaspace reserves its font name.** Subsetting produces a Modified Version, and OFL clause 3
  forbids one from carrying the Reserved Font Name, so the subset is renamed "Radon Terminal".
  The build asserts the copyright (nameID 7 here, not the usual 0) and the licence record survive,
  because clauses 1 and 2 require them to.
- **Karrik's upstream TTFs carry no licence records at all**, only nameIDs 1–6. The subsets embed
  the licence and its URL. No copyright line is invented, because upstream declares none.
- **Switzer was rejected on licence grounds.** It was the original recommendation, but Fontshare
  ships under the ITF Free Font License, whose section 02 prohibits subsetting, format conversion
  and metadata changes by name. Ronnie's own picks are all OFL, which removed the conflict.

Only Fraunces is preloaded. Both text faces have size-adjusted fallbacks derived from their real
metrics against Arial's, so the swap does not move text.

---

## 3. Measurements

Lighthouse 12, desktop preset, against `pnpm build` output served locally.

| | Before | After |
|---|---|---|
| Performance | 96 | **100** |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.8 s | **0.3 s** |
| Largest Contentful Paint | 1.2 s | **0.3 s** |
| Total Blocking Time | 40 ms | **0 ms** |
| Cumulative Layout Shift | 0 | 0.001 |

| Weight on `/` | Before | After |
|---|---|---|
| HTML | 10.7 KB | 7.8 KB |
| CSS | 21.4 KB | 18.9 KB |
| Fonts | 0 self-hosted (3 CDN families) | 96 KB self-hosted, 0 third-party |
| Images in `dist` | 4,964 KB | 388 KB |

**Two honest notes on this table.**

CLS went from 0 to 0.001. That is a regression, not an improvement, even though it is
far below the 0.1 threshold. Self-hosting introduces a font swap that the CDN version did not have
in the same form, and the size-adjusted fallbacks get it close to zero but not to zero.

Accessibility scored 100 *before*, while `.hero-meta` was `aria-hidden` and the About page's links
were visually indistinguishable from body text. Both were real defects. That is a limitation of
the automated audit, not evidence the problems were imaginary, and it is the reason the
accessibility work in this refactor does not show up as a score change.

### Screenshots

`docs/shots/`, home page:

| | 500 | 768 | 1440 |
|---|---|---|---|
| Before | `before-home-500.png` | `before-home-768.png` | `before-home-1440.png` |
| After | `after-home-500.png` | `after-home-768.png` | `after-home-1440.png` |

**The brief asked for 375, and these are 500.** Headless Chrome clamps its window to a 500 px
minimum: requesting `--window-size=375` reports `innerWidth=500` and produces a 500 px layout
cropped to a 375 px image. The first pair of captures was taken that way and looked like a bug,
a nav clipped off the right edge, which then appeared in both the before and the after shot.
It was an artefact of the crop, not of the CSS, and both files were deleted rather than shipped
with a misleading label. `--force-device-scale-factor` does not help; it changes rendering
resolution, not the CSS viewport. A true 375 px capture needs CDP device emulation, which this
run did not set up.

What that leaves unverified: the 375-to-500 range. The site's smallest breakpoint is 700 px, so
the 500 px capture does exercise the mobile layout, and nothing between 375 and 500 introduces a
new rule. But it has not been seen, and should be before anyone calls the mobile view done.

---

## 4. Still generic, and what I would do next

Listed because the brief asked for honesty, not a victory lap.

1. **The project rows are still a vertical list of title-plus-blurb-plus-tags.** Numbering them and
   hanging the numbers off the grid helps, but the underlying shape is the most common way to list
   projects on the internet. A real improvement would be a table with a year column and a status
   column, which needs dates I do not have.
2. **Every project `kind` is the same grammatical shape** (`Research · AI/ML`, `Databases/Web Dev`,
   `Infrastructure/DevOps`). Audit item P8, left unfixed. They should vary, or become a proper
   two-axis taxonomy, or go away.
3. **The About page is thin.** One paragraph is a deliberate choice, but the paragraph I drafted is
   built only from facts already in the repo. It should be replaced with something only Ronnie can
   write.
4. **Two of six projects have no public artefact**, and the pages say so plainly, which is good, but
   a reader still hits a dead end. A short architecture sketch or an annotated screenshot would give
   those two pages something to show.
5. **The hero is still a big name on a dark field.** It is well set now, but the composition is
   conventional. The riskier version puts the numbered project index on the first screen and demotes
   the name.
6. **The demos are 434 and 343 lines** and exceed the 150-line target. They were left intact on
   purpose: they are working interactive functionality, and splitting them to hit a line count would
   risk behaviour for no reader benefit.

---

## 5. Adversarial pass

Read as a sceptical designer whose only job is to prove a language model made this. The three
strongest arguments, and what was done about each.

### Argument 1: "The accent is used for a solid CTA button and a pulsing-style status dot, which is exactly the SaaS-landing-page vocabulary the rest of the site claims to reject."

**Fair, and partly conceded.** The pulse animation is gone. The solid accent button stays, because a
single primary action rendered in the single accent colour is a reasonable decision rather than a
generated one. What was fixed is the dishonesty: `DIRECTION.md` originally claimed the accent did
exactly four jobs while the code used it for six. The rule now lists what the code actually does,
and an audit of all 18 accent usages moved four of them (kind labels, kickers, definition terms,
active-nav text) to neutrals. A rule the code follows is worth more than a tidier rule it breaks.

### Argument 2: "A dark site with a green accent and a serif display face is itself a 2024 template. The aurora is a gradient blob wearing a costume."

**Partly conceded, and it is the strongest remaining argument.** The aurora is a blurred gradient.
What changed is that it is now one element, on one page, in one hue, at 0.16 alpha, instead of five
stacked gradients on `body` plus a bloom behind every section plus a fourteen-radial-gradient
starfield. The defence is subtraction and specificity: the palette is derived in OKLCH with measured
contrast, the neutrals are tinted to the aurora's own hue so the greys belong to it, and the display
face is Fraunces with `WONK` pinned on and `opsz` live, which is a deliberate and slightly strange
choice rather than a safe one. Karrik, with one weight and no bold, forces hierarchy to come from
size, case and space. None of that is what a model reaches for by default. But a sceptic is right
that dark-plus-green is well-trodden, and the honest answer is that the concept was Ronnie's before
this refactor started; the job here was to execute it with discipline, not replace it.

### Argument 3: "The copy is suspiciously well-balanced. Every project blurb is the same length and the same shape."

**Conceded and partially unfixable here.** The project descriptions are Ronnie's own writing and were
deliberately left alone: they are the best thing on the site, and they already do the thing models do
not, which is admit their own limits ("the hardness data itself is currently a small synthetic set",
"coverage honestly collapses under extrapolation"). What was in scope was fixed: the em dashes, the
straight apostrophes, the typo, the empty paragraph, the invented-sounding "Hit Forensics" reference,
and the four generic labels. What remains is that all six `kind` strings share one grammatical shape,
which is listed above as item 2 of the still-generic list. Rewriting the six project blurbs to vary
their rhythm would mean rewriting Ronnie's voice, which is the one thing this refactor should not do.
