# AUDIT

Every AI tell found in the files that produce user-visible output, with `file:line`
evidence and severity. Verified against the source, not inferred.

## The honest starting position

This site is not generic AI output, and an audit that pretended otherwise would be
useless. It already has a committed concept (polar night, aurora curtains, starfield,
penguin mark), a characterful display face that is not Inter, projects laid out as
editorial index rows rather than a three-card grid, and project copy that admits its own
weaknesses. "The hardness data itself is currently a small synthetic set" and "coverage
honestly collapses under extrapolation" are sentences a language model does not volunteer.

What reads as machine-made is the lack of discipline in executing that concept: six
accent colors all doing the same job, blurred radial blooms behind every section, glow
as the default surface treatment, a gradient-filled animated H1, scroll-triggered
fade-ins with a staggered delay, and eight custom properties that are declared and never
referenced. The fix is subtraction.

Counts below are exact.

---

## Typography

| # | Tell | Evidence | Severity |
|---|---|---|---|
| T1 | Google Fonts CDN, 3 families, 11 static weights requested | `src/layouts/BaseLayout.astro:73-78` | high |
| T2 | Fraunces is requested with the `opsz 9..144` axis in the URL, then **no CSS anywhere sets `font-variation-settings`**. Four static weights are pulled from a variable font and the axes are never touched | `BaseLayout.astro:76` vs every `font-family` declaration | high |
| T3 | No modular scale. 23 distinct font sizes: 6, 3.8, 2.3, 2, 1.5, 1.35, 1.15, 1.08, 1.05, 1.02, 0.95, 0.92, 0.9, 0.86, 0.85, 0.84, 0.82, 0.8, 0.78, 0.76, 0.74, 0.72, 0.7, 0.68 rem | across `BaseLayout.astro` and both demos | high |
| T4 | Mono is the UI face, not the code face. It sets nav, kickers, buttons, meta, tags, captions, aside labels and the footer | `BaseLayout.astro:260, 433, 477, 530, 564, 694, 766, 795, 838, 896, 921, 945` | med |
| T5 | No italics anywhere in the site chrome, despite three families loaded | no `font-style: italic` in any source file | med |
| T6 | Measure is controlled in `ch` in exactly one place and in `px` in four others | `62ch` at `:739`; `620px :586`, `760px :801`, `860px :817`, `880px :354` | med |
| T7 | No `tabular-nums`, although the similarity demo renders two numeric columns | `SimilarityDemo.astro` `.sim-bar-val`, `.sim-twin-pct` | med |
| T8 | `text-wrap: balance` used once, on `.page-title`; no `pretty` on any paragraph | `BaseLayout.astro:580` | low |
| T9 | Line-height does not shrink with size in a considered way: 1.65, 1.6, 1.55, 1.5, 1.45, 1.04, 1, 0.92 assigned ad hoc | across file | low |

## Color

| # | Tell | Evidence | Severity |
|---|---|---|---|
| C1 | **Six accent colors doing one job**: `--green --cyan --blue --violet --gold --red` | `BaseLayout.astro:94-99` | high |
| C2 | **Eight tokens declared and never referenced.** Verified 0 `var()` uses each: `--night`, `--night-veil`, `--paper`, `--paper-deep`, `--paper-ink`, `--paper-muted`, `--blue`, `--red`, `--gold` | `:85-99` | high |
| C3 | Green-to-cyan-to-purple gradient, on the H1, animated on a 14s loop | `.hero-line :396-411` | high |
| C4 | Mesh-gradient blooms behind **every** section, blurred 48-52px | `.page-section::before :309-322`, `.hero::before :335-349` | high |
| C5 | ~40 raw `rgba()` literals instead of tokens | throughout | high |
| C6 | Hardcoded hexes bypassing the token layer: `#04111c`, `#061826`, `#0d0a1e`, `#c7ffe0`, `#9fd0ff`, `#ecd8ff` | `:128, 396-404` | med |
| C7 | Neutrals are not tinted to one hue. `--ink #f5f7ec` is yellow-green, `--ink-muted #b8c6c6` is cyan, `--ink-soft #84989a` is blue-grey. Three different hue families in one neutral ramp | `:82-84` | med |
| C8 | Not defined in OKLCH; no contrast ratio has been checked | all | med |
| C9 | The focus ring is `--cyan` while every other interactive state is `--green`: two colors for one job | `:209` vs `:290, 511, 539` | med |

## Layout

| # | Tell | Evidence | Severity |
|---|---|---|---|
| L1 | One vertical rhythm value repeated for the whole site: `.page-section { padding: 7rem 0 }` | `:306` | high |
| L2 | Every section is `width: min(var(--page), calc(100% - 2rem)); margin: 0 auto`. Centered column, forever | `:304-305, 329-331` | high |
| L3 | No spacing scale. 28 distinct rem values in use: 0.25, 0.45, 0.5, 0.55, 0.6, 0.7, 0.75, 0.82, 0.85, 0.9, 1, 1.1, 1.25, 1.3, 1.4, 1.5, 1.7, 1.9, 2, 2.1, 2.4, 2.6, 2.8, 3, 5, 6, 7, 9 | throughout | high |
| L4 | **`/` and `/projects` render identical lists.** All six projects are `featured: true`, so `featuredProjects` is a copy of `projects`. Both headings read "Projects" | `data/projects.ts:118`, `pages/index.astro:56`, `pages/projects.astro:10` | high |
| L5 | Uniform density. No page has a dense region next to a quiet one | whole site | med |
| L6 | Perfect symmetry. Nothing hangs off the grid, nothing breaks a margin | whole site | med |
| L7 | Magic numbers that correspond to nothing real: `calc(100vh - 68px)` on `.hero` against `calc(100vh - 58px)` on `.project-detail` and `.text-page`. The nav is `position: absolute` and out of flow, so neither offset is any element's height | `:330, 813, 854, 1093` | med |

## Components

| # | Tell | Evidence | Severity |
|---|---|---|---|
| K1 | Glow is the default surface treatment. 14 separate glow `box-shadow`/`text-shadow` declarations | `:243, 252, 264, 284, 291, 292, 459, 492, 498, 555, 582, 660, 687` + `TerminalDemo.astro:336` | high |
| K2 | `transform: translateY(-2px)` lift on hover for both button variants. The `hover:scale-105` family | `:497, 509` | high |
| K3 | Eight radius values, none from the scale. `--radius: 8px` is declared and then bypassed by `12px`, `14px`, `11px`, `10px`, `9px`, `5px`, `999px`, `50%` | `:102` vs `:658, 1139`, `TerminalDemo.astro:306`, `SimilarityDemo.astro:161, 190, 202` | high |
| K4 | Blurred green-cyan-violet gradient glow behind the about photo | `.about-photo::before :871-880` | high |
| K5 | Rainbow traffic-light dots in the terminal chrome, three accents used decoratively to carry no information | `TerminalDemo.astro` `.dot-a/.dot-b/.dot-c` | med |
| K6 | No `::selection` style anywhere. `caret-color` set only inside the terminal input | `TerminalDemo.astro` only | med |
| K7 | Nested radii copied rather than reduced: `.similarity-demo` 14px contains `.sim-card` 11px contains `.sim-bar-track` 999px, unrelated to the 1.4rem padding between them | `SimilarityDemo.astro:161, 190, 202` | low |

## Motion

| # | Tell | Evidence | Severity |
|---|---|---|---|
| M1 | **Scroll-triggered fade-in-up with staggered children.** The single clearest tell on the site: `translateY(24px)`, 720ms, `calc(var(--card-index) * 80ms)` stagger, driven by an IntersectionObserver | `:961-973` and the inline script `:1186-1208`; `ProjectsGrid.astro:15` sets `data-reveal` and `--card-index` | high |
| M2 | Hero entrance stagger at 120 / 320 / 440 / 560ms, 820ms duration | `:358-376` | high |
| M3 | `name-shimmer`: a 14s infinite gradient drift across the H1. Animation where nothing changed state | `:410, 1021-1029` | high |
| M4 | Three further infinite ambient loops: `aurora-drift` 28s, `twinkle` 7s, `scroll-sweep` 2.2s | `:975, 987, 1044` | med |
| M5 | `reveal-up` 740ms on the about photo, a fourth entrance pattern | `:868, 997-1007` | med |
| M6 | Easing is `ease` or `ease-in-out` everywhere. No tokens, no entrance/exit distinction | every `transition:` declaration | med |
| M7 | `prefers-reduced-motion` is a blanket `animation-duration: 1ms !important` override, which is a shortened duration, not a genuine no-motion path | `:1147-1156` | med |
| M8 | `.project-row` animates `padding-left` on hover, which is a layout property, not transform/opacity | `:618, 646-649` | low |

## Copy

| # | Tell | Evidence | Severity |
|---|---|---|---|
| P1 | **An empty `<p>` renders on the live About page**, plus trailing whitespace inside the paragraph above it | `pages/about.astro:46-50` | high |
| P2 | The About page is a stub. One sentence, then nothing | `about.astro:44-50` | high |
| P3 | **Demo copy names a project that does not exist on this site.** "Hit Forensics' Q6" and "447k tracks" appear in the demo attached to a project titled "Spotify Billboard Analytics", which never mentions either | `components/demos/SimilarityDemo.astro:2, 11` | high |
| P4 | Em dashes, 4 instances | `SimilarityDemo.astro:2, 41, 80`; `TerminalDemo.astro:21` | med |
| P5 | Straight apostrophes in prose throughout | `data/projects.ts:44, 63, 107`; `about.astro:44` | med |
| P6 | Typo: "buliding" | `data/projects.ts:107` | med |
| P7 | Generic kickers and labels: "About the engineer", "Project field note", "Interactive artifact" (twice), "Stack and signals" | `about.astro:16`, `[slug].astro:24, 52`, both demos | med |
| P8 | Every project `kind` is the same grammatical shape, a slashed noun pair: "Research · AI/ML", "Databases/Web Dev", "AI/ML", "Infrastructure/DevOps", "Mobile Dev - Penn Labs", "Systems". One of them uses a hyphen instead of a slash | `projects.ts` | low |
| P9 | The About `h1` is the single word "About", restating the nav item that got you there | `about.astro:17` | low |
| P10 | Hardcoded `© 2026` | `BaseLayout.astro:1183` | low |

## Code hygiene

| # | Tell | Evidence | Severity |
|---|---|---|---|
| H1 | A 1,210-line layout component holding all site-wide CSS in one `<style is:global>` | `BaseLayout.astro` | high |
| H2 | **Orphaned 1.4 MB asset**: `public/profile_grey copy.png` is referenced nowhere in `src/` | — | high |
| H3 | Unoptimized images. `delta_ronnie_wang_copy.jpg` is 1.3 MB served raw through a plain `<img>`; `forest_bush_logo.png` is 700 KB to fill a 3.4rem box. Astro's `<Image>` is used nowhere | `about.astro:21`, `ProjectsGrid.astro:17` | high |
| H4 | **`.hero-meta` is `aria-hidden="true"`**, hiding "Philadelphia, PA", "UPenn" and the availability status from screen readers. That is real content, not decoration | `pages/index.astro:20` | high |
| H5 | The About page's Email and GitHub links carry no class, so the global `a { color: inherit; text-decoration: none }` renders them indistinguishable from body text | `about.astro:53-55` | high |
| H6 | `Record<string, any>` | `components/DemoRenderer.astro:8` | med |
| H7 | The same 3-line `basePath` snippet is duplicated in 4 files. `base` is never set in `astro.config.mjs`, so every copy is a no-op | `BaseLayout.astro:8-10`, `about.astro:4-6`, `ProjectsGrid.astro:5-7`, `[slug].astro:14-16` | med |
| H8 | Dead CSS: `.project-label` (`:561`) matches no markup; `.row-logo img` (`:678`) can never match, because the `<img>` **is** `.row-logo` and is never its descendant | — | med |
| H9 | Orphaned rule from removed copy: `.hero-blurb .hl-peng` (`:422`). The penguin span it styled no longer exists in the markup, though `CLAUDE.md` still specifies that blurb | `:422` vs `index.astro:18` | med |
| H10 | No 404 page, no skip link, no favicon set (one PNG), `twitter:card` is `summary` pointing at a square penguin with no purpose-built OG image | `:67-72`, `src/pages/` | med |
| H11 | Markup classes with no rule anywhere: `.meta-item`, `.row-body`, `.row-logo--filler`, `.terminal-output`, `.sim-bars` | — | low |
| H12 | Type fields declared, rendered against, never set by any project: `embedUrl`, `demoUrl` | `projects.ts:14-15` | low |
| H13 | `src/.DS_Store` is committed | — | low |
| H14 | No `color-scheme` declared, no print styles | — | low |

---

## Checked, and NOT a problem

Recorded so this audit stays honest.

- **Demo CSS bundling.** Both demo components declare overlapping `.demo-*` selectors, but only
  `TerminalDemo.astro` defines them. This looked like it would leave the Spotify page unstyled.
  It does not: Astro merges both `is:global` blocks into a single route stylesheet,
  `dist/_astro/_slug_.BPjfKImK.css`, which is served on all six project pages and does contain
  `.demo-h2`. The only real cost is that 4.8 KB of demo CSS ships to the four project pages
  that have no demo.
- **The scroll-reveal has a correct no-JS path.** `:1188-1190` only adds the `reveal-ready` class
  from JavaScript, and bails out entirely under `prefers-reduced-motion`, so content is never
  hidden for users who cannot run the animation. The pattern is a tell; the implementation of it
  is careful.
- **The descender fix is real engineering.** `.hero-line`'s `padding-bottom: 0.34em` /
  `margin-bottom: -0.34em` pair (`:394-395`) exists because `background-clip: text` was cropping
  the "g". Four commits went into that. The gradient it protects should go, but the reasoning
  was sound.
