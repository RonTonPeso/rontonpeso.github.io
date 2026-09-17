# DIRECTION

## 0. The standing principle: simplicity

This governs every decision below, and every future change to this site.

When two options both work, ship the simpler one. Fewer families, fewer weights, fewer tokens,
fewer files, fewer rules. A constraint that removes a choice is worth more than a feature that
adds one, which is why a body face with no bold is an asset here rather than a compromise.

Concretely, for anything added later:

- One accent. If something new needs a second color to work, the something new is wrong.
- No new font file without deleting one.
- No new spacing, size or radius value that is not already on the scale.
- No animation that does not mark a state change.
- If a section can be a paragraph, make it a paragraph. If it can be nothing, make it nothing.

The test is not "does this look designed." It is "can I remove this and lose nothing."


## 1. What this site is

A personal site for Ronnie Wang: Penn CS, BSE plus Masters, bioinformatics research in the
Cheng Lab, and six projects that range from a multi-threaded OS kernel to conformal prediction
intervals on nanocomposite hardness. The audience is engineers and recruiters who will give it
ninety seconds and are trying to answer one question: is this person careful?

The answer is already in the source. The materials informatics page says the hardness data is
currently synthetic, that the model lands mid-pack on Matbench, and that interval coverage
collapses under extrapolation. Three of the six projects admit they cannot share code. Nobody
writes that to impress you; they write it because it is true. That is the most valuable thing
on the site and the design is currently working against it, because a page that glows at you
in six colors is making a different argument than the words on it.

So: precise, legible, unhurried, and confident enough not to glow. The feeling should be an
instrument reading, not a product launch.

## 2. Three references

**Aurora keograms and magnetometer traces.** The instrument record of an aurora rather than a
photograph of one: a green trace on a black ground, plotted against time, with the numbers set
in a column beside it.
*Taking:* the black ground, the single chromatic event, numbers in a column, the sense that
something is being measured.
*Not taking:* the false-color rainbow scale those plots use to encode intensity. That rainbow is
precisely where the current six-accent palette came from, and dropping it is the central move of
this refactor.

**Tufte, Graphics Press book design.**
*Taking:* the data-ink principle applied literally, so the blooms, the glows and the decorative
shadows go; hairline rules instead of boxes; and metadata living as a sidenote in the margin
rather than inside a card. The project detail page already has a sticky aside, which is the
right instinct executed as a bordered box.
*Not taking:* the cream paper ground and the set-everything-in-a-serif approach. This site stays
dark, and body text stays in a grotesque.

**Jan Tschichold's Penguin Composition Rules (1947), and the Penguin horizontal-band grid.**
A real typographic discipline, and the reference is load-bearing rather than decorative, given
the penguin is already this site's mark and its favicon.
*Taking:* strict horizontal banding, the rule that nothing is centered without a reason, and one
color coding exactly one category.
*Not taking:* the orange, the white, and the literal cover format. This is not a pastiche.

## 3. The organizing idea

**The trace.**

One green line is the only accent on the site, and it does four jobs:

1. At the top of the home page it is the aurora, drawn once, as a curve.
2. Between project rows it is the hairline rule.
3. Under a link it is the underline.
4. In the terminal demo it is the cursor.

Nothing else is green. Everything else is an off-black ground and neutrals tinted toward the same
hue. If a green thing cannot be explained as one of those four jobs, it is deleted.

This single rule settles the palette, the hover states, the focus ring and the section dividers at
once, and it is why the six accents can go without leaving a hole. The aurora is not removed from
the site. It is promoted: it stops being a wash behind everything and becomes the one thing that
happens.

## 4. The rule broken, once, on purpose

The trace and Tschichold both demand strict alignment to the left column. Everything on this site
will hang off one edge.

The exception: on the home page, the word **penguins** in the blurb hangs out of the text column
and into the left margin. It is the only element on the entire site that breaks the grid, and it
is the least serious word on it. Perfect consistency reads as machine-made; this is the seam.

## 5. Type

Ronnie's picks, licenses verified 2026-09-17 before any file was downloaded.

| Role | Face | Instance shipped | Source | License |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | Fraunces | variable, `WONK 1` / `SOFT 50` pinned, `wght 700`, `opsz` left live | [undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) | SIL OFL 1.1 |
| **Body** | Karrik | 400 + 400 italic (all it ships) | [phantomfoundry/karrik_fonts](https://gitlab.com/phantomfoundry/karrik_fonts) via [velvetyne.fr](https://velvetyne.fr/fonts/karrik/) | SIL OFL 1.1 |
| **Label / meta** | Karrik, 12px uppercase, tracked +0.08em | reuse, no new file | same | same |
| **Mono** | Monaspace Radon | 400, `wdth`/`slnt` pinned | [githubnext/monaspace](https://github.com/githubnext/monaspace) v1.400 | SIL OFL 1.1 |

**All three are OFL 1.1, so subsetting and instancing are permitted.** This matters: the face I
had recommended instead (Switzer, Fontshare) is under the ITF Free Font License, whose Section 02
prohibits subsetting, format conversion and metadata changes by name. Ronnie's picks removed that
conflict without anyone having to trade the brief against a EULA.

### Why each one

**Fraunces** stays because it is already here, it is not a default, and its variable axes have
never been used: the current CSS requests `opsz 9..144` in a Google Fonts URL and then never sets
`font-variation-settings` once, pulling four static weights out of a variable font. Pinning
`WONK 1` and `SOFT 50` commits to the face's actual character rather than hedging toward a
neutral serif, and leaving `opsz` live is the one axis that earns its bytes, because the hero at
9.5rem and a row title at 2.3rem should not be the same letterforms. One file.

**Karrik** (Jean-Baptiste Morizot and Lucas Le Bihan, Velvetyne, 2020) ships Regular and Italic
and nothing else. That is the point, not a limitation. With no bold available, hierarchy has to
come from size, case, spacing and the one accent, which is exactly the discipline "the trace"
already demands. Karrik's irregular, slightly mismatched forms come from anonymous foundry
specimens, so it carries real voice at body size without shouting. It also fixes audit item
**T5**: the site currently loads three families and has no italics at all.

**Monaspace Radon** is a handwriting-flavoured mono, and it goes only where a terminal actually
is: the two project pages with demos, loaded by the demo components themselves. Nav links,
buttons, tags and the footer stop being mono, which is audit item **T4**. One flag on Ronnie's
pick rather than a silent substitution: Radon is the most characterful face in the Monaspace
family, and the PennOS demo sets it at 0.86rem in a dense scrolling window. I will set it and
look at it before committing; if it costs legibility at that size, the fallback is Monaspace
Neon, same family, same license, same metrics.

### Typographic rules applied everywhere

Modular scale at **1.25**, defined once as tokens, replacing the current 23 ad-hoc sizes.
Line-height shrinks as size grows: ~1.6 at body, ~1.05 at display. Negative tracking from
-0.01em to -0.03em on display sizes, +0.08em on uppercase labels. Measure held between 60 and 72
characters in `ch`, not `px`. `text-wrap: balance` on headings, `pretty` on paragraphs.
`tabular-nums` on the similarity demo's two numeric columns. Curly quotes, apostrophes and proper
dashes throughout. Bullets and the project index numbers hang into the margin.

Self-hosted, WOFF2 only, `font-display: swap`, Fraunces preloaded and nothing else,
size-adjusted fallbacks so the swap does not reflow. Before/after KB reported in `REFACTOR.md`.

## 6. Color

Built in OKLCH, defined once, with nothing in markup referencing a raw color again.

- **Ground:** off-black tinted toward the aurora hue, replacing `#02060a`. Not pure black.
- **Neutrals:** the whole ramp tinted to that one hue, replacing the current three-hue-family mess
  where `--ink` is yellow-green, `--ink-muted` is cyan and `--ink-soft` is blue-grey.
- **Accent:** one, the aurora green, doing the four jobs listed in Section 3, on well under 10% of
  the surface.
- **Deleted:** `--cyan`, `--blue`, `--violet`, `--gold`, `--red`, and the eight tokens that were
  never referenced at all.
- **Semantic colors:** none. This site has no forms, no errors and no success states, so inventing
  a semantic palette would be decoration. The two projects with no public repo get a muted neutral,
  not a second accent.
- **Gradients:** none. The one remaining candidate, the aurora itself, is a mask over a single
  hue rather than a two-color blend, and nothing sits behind text.
- **Contrast:** 4.5:1 for body, 3:1 for large text and UI boundaries, fixed by adjusting lightness
  in OKLCH rather than by reaching for a different hue.

## 7. Two calls, decided

**The starfield is cut** (`body::after`, 14 radial gradients plus the `twinkle` loop). It was a
second ambient atmosphere system doing the same job as the aurora. Under "the trace", one aurora
event survives; two competing decorative systems do not.

**No light mode.** `color-scheme: dark` is declared honestly. A polar-night site does not have a
light theme, and re-deriving one would fight the concept rather than serve it. The
readable-content requirement is met instead by a genuine print stylesheet, which is black on
white, because paper is not a polar night.
