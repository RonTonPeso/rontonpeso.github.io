#!/usr/bin/env python3
"""
Build the self-hosted webfonts in public/fonts from the upstream sources.

Run after `pnpm build`, because the glyph set is derived from the rendered HTML
in dist/ rather than guessed. Requires the fonttools venv:

    python3 -m venv .venv && .venv/bin/pip install "fonttools[woff]" brotli
    .venv/bin/python scripts/build-fonts.py --sources <dir>

All three families are SIL OFL 1.1, which is what makes subsetting legal here.
Monaspace is the only one with a Reserved Font Name, so its subset is renamed:
OFL clause 3 forbids a Modified Version from carrying the reserved name.
"""

from __future__ import annotations

import argparse
import html
import pathlib
import re
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts"
DIST = ROOT / "dist"

# Punctuation the copy pass introduces that will not appear in the current HTML.
# Note the absence of U+2197: neither Fraunces nor Karrik draws it, and it means
# "external link" anyway, which the project rows are not. They use U+2192.
EXTRA = "‘’“”–—…·©→×°′″†‡§¶«»‹›€£"

# Layout/format characters that must survive subsetting even though they never
# appear as visible text.
CONTROL = " ​  "


def used_charset() -> set[str]:
    """Every character the site can render, scraped from the built HTML."""
    if not DIST.exists():
        sys.exit("dist/ not found. Run `pnpm build` first.")

    chars: set[str] = set()
    for page in DIST.rglob("*.html"):
        raw = page.read_text(encoding="utf-8", errors="replace")
        # Inline <script> bodies matter: both demos generate visible text at
        # runtime (track titles, ps output, man pages) that appears nowhere in
        # the static markup.
        text = re.sub(r"<(?!/?script)[^>]+>", " ", raw)
        chars.update(html.unescape(text))

    chars.update(EXTRA)
    chars.update(CONTROL)
    # Always keep the full printable ASCII range; it costs almost nothing and
    # stops a future copy edit from silently losing a glyph.
    chars.update(chr(c) for c in range(0x20, 0x7F))
    return {c for c in chars if c.isprintable() or c in CONTROL}


def kb(path: pathlib.Path) -> float:
    return round(path.stat().st_size / 1024, 1)


def set_names(font: TTFont, family: str, subfamily: str, weight: int) -> None:
    """Give an instanced font honest names; instancing leaves the VF default behind."""
    full = f"{family} {subfamily}".strip()
    ps = full.replace(" ", "")
    for name_id, value in ((1, family), (2, subfamily), (3, f"{full}; subset"),
                           (4, full), (6, ps), (16, family), (17, subfamily)):
        font["name"].setName(value, name_id, 3, 1, 0x409)
        font["name"].setName(value, name_id, 1, 0, 0)
    font["OS/2"].usWeightClass = weight


def run_subset(src: pathlib.Path, dest: pathlib.Path, text: str, *,
               rename: str | None = None, licence: tuple[str, str] | None = None):
    font = TTFont(src)

    opts = subset.Options()
    opts.flavor = "woff2"
    opts.desubroutinize = True
    opts.layout_features = ["kern", "liga", "clig", "calt", "ccmp", "locl", "mark", "mkmk", "tnum"]
    opts.name_IDs = ["*"]
    opts.name_legacy = True
    opts.notdef_outline = True
    opts.recalc_bounds = True
    opts.drop_tables += ["DSIG"]

    subsetter = subset.Subsetter(options=opts)
    subsetter.populate(text=text)
    subsetter.subset(font)

    if rename:
        # OFL 1.1 clause 3 restricts the Reserved Font Name to the *name* fields:
        # a Modified Version may not present itself as "Monaspace". It does NOT
        # let us strip the copyright notice (nameID 0) or the licence (13, 14) --
        # clauses 1 and 2 require those to travel with the font. So scrub the
        # identity records only, and assert the attribution survived.
        # 5 = version string and 19 = sample text also embed the family name here.
        IDENTITY = (1, 2, 3, 4, 5, 6, 16, 17, 18, 19, 20, 21, 25)
        # Everything at 256+ names a named instance or axis of the variable font;
        # all axes are pinned, so those records describe a font that no longer exists.
        for record in list(font["name"].names):
            stale = record.nameID >= 256
            named = record.nameID in IDENTITY and "Monaspace" in record.toUnicode()
            if stale or named:
                font["name"].removeNames(record.nameID, record.platformID,
                                         record.platEncID, record.langID)
        leaked = [r.nameID for r in font["name"].names
                  if r.nameID in IDENTITY and "Monaspace" in r.toUnicode()]
        assert not leaked, f"reserved name still in nameIDs {leaked}"
        # Attribution must survive. Monaspace carries its copyright in nameID 7
        # rather than the usual 0, so check both and require the licence too.
        notices = {r.nameID: r.toUnicode() for r in font["name"].names}
        assert any("Copyright" in notices.get(i, "") for i in (0, 7)), "copyright lost"
        assert "Open Font License" in notices.get(13, ""), "licence record lost"

    if licence:
        desc, url = licence
        font["name"].setName(desc, 13, 3, 1, 0x409)
        font["name"].setName(url, 14, 3, 1, 0x409)

    font.flavor = "woff2"
    font.save(dest)
    font.close()
    return dest


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", required=True, type=pathlib.Path,
                    help="directory holding the downloaded upstream font files")
    args = ap.parse_args()
    src_dir = args.sources

    OUT.mkdir(parents=True, exist_ok=True)
    text = "".join(sorted(used_charset()))
    print(f"glyph set: {len(text)} characters scraped from dist/\n")

    report: list[tuple[str, float, float]] = []

    # --- Fraunces: display -------------------------------------------------
    # Pin the two character axes and the weight; keep opsz live, because the
    # hero at 9.5rem and a row title at 2.3rem should not share letterforms.
    fr_src = src_dir / "Fraunces-VF.ttf"
    before = kb(fr_src)
    pinned = instancer.instantiateVariableFont(
        TTFont(fr_src), {"SOFT": 50, "WONK": 1, "wght": 700}, inplace=False, updateFontNames=False
    )
    set_names(pinned, "Fraunces Display", "Bold", 700)
    tmp = OUT / "_fraunces-pinned.ttf"
    pinned.save(tmp)
    pinned.close()
    dest = run_subset(tmp, OUT / "fraunces-display.woff2", text)
    tmp.unlink()
    report.append(("Fraunces (opsz live, SOFT 50 / WONK 1 / wght 700)", before, kb(dest)))

    # --- Karrik: body ------------------------------------------------------
    # Karrik's upstream TTFs ship with no licence records at all (only nameIDs
    # 1-6), so the subsets would carry no attribution. Add the licence and its
    # URL, which are facts, and let public/fonts/Karrik-OFL.txt carry the rest.
    # No copyright line is invented: upstream declares none.
    for style, src_name in (("regular", "Karrik-Regular.ttf"), ("italic", "Karrik-Italic.ttf")):
        src = src_dir / src_name
        before = kb(src)
        dest = run_subset(src, OUT / f"karrik-{style}.woff2", text, licence=(
            "This Font Software is licensed under the SIL Open Font License, Version 1.1. "
            "Karrik by Jean-Baptiste Morizot and Lucas Le Bihan, Velvetyne Type Foundry.",
            "https://scripts.sil.org/OFL"))
        report.append((f"Karrik {style}", before, kb(dest)))

    # --- Monaspace Radon: mono, demo pages only ----------------------------
    mono_src = src_dir / "MonaspaceRadon-VF.ttf"
    before = kb(mono_src)
    mono = TTFont(mono_src)
    axes = {a.axisTag for a in mono["fvar"].axes}
    pins = {tag: val for tag, val in (("wght", 400), ("wdth", 100), ("slnt", 0)) if tag in axes}
    pinned = instancer.instantiateVariableFont(mono, pins, inplace=False, updateFontNames=False)
    set_names(pinned, "Radon Terminal", "Regular", 400)
    tmp = OUT / "_mono-pinned.ttf"
    pinned.save(tmp)
    pinned.close()
    dest = run_subset(tmp, OUT / "radon-mono.woff2", text, rename="Radon Terminal")
    tmp.unlink()
    report.append((f"Monaspace Radon (pinned {', '.join(sorted(pins))})", before, kb(dest)))

    print(f"{'face':<52} {'before':>9} {'after':>9}  saved")
    print("-" * 84)
    total_before = total_after = 0.0
    for name, b, a in report:
        total_before += b
        total_after += a
        print(f"{name:<52} {b:>8.1f}K {a:>8.1f}K  {100 * (1 - a / b):>5.1f}%")
    print("-" * 84)
    print(f"{'total':<52} {total_before:>8.1f}K {total_after:>8.1f}K  "
          f"{100 * (1 - total_after / total_before):>5.1f}%")


if __name__ == "__main__":
    main()
