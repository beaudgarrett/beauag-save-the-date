#!/usr/bin/env python3
"""
Prepare web-ready images for the Beau & AG wedding website.

Reads the original files in /source-images and writes optimized derivatives to
/public/images. Photographs are never cropped (except the social-sharing card),
recolored or filtered; they are only re-encoded and offered in two widths.

  Original file                              -> Web name            Used in
  IMG_1062(2).jpeg                           -> 01-hero-ring        Home hero (B&W)
  IMG_1056(1).jpeg                           -> 02-our-story        Our Story
  IMG_1061.jpeg                              -> 03-venue            The Venue
  E483CEBF-DE48-4955-AE67-F57BF2B7F855.jpeg  -> monogram.png        Header, footer, favicon
  IMG_1057.jpeg                              -> 05-closing-pergola  Closing photograph

To swap in higher-resolution originals later, replace the files in
/source-images (keeping their names) and run:  npm run images
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-images"
OUT = ROOT / "public" / "images"
PUBLIC = ROOT / "public"

CREAM = (0xF6, 0xF0, 0xE5)
BROWN = (0x49, 0x39, 0x2E)

PHOTOS = {
    "IMG_1062(2).jpeg": "01-hero-ring",
    "IMG_1056(1).jpeg": "02-our-story",
    "IMG_1061.jpeg": "03-venue",
    "IMG_1057.jpeg": "05-closing-pergola",
}
MONOGRAM_SRC = "E483CEBF-DE48-4955-AE67-F57BF2B7F855.jpeg"
SMALL_WIDTH = 720


def load(name: str) -> Image.Image:
    im = Image.open(SRC / name)
    icc = im.info.get("icc_profile")
    im = ImageOps.exif_transpose(im).convert("RGB")
    if icc:
        im.info["icc_profile"] = icc
    return im


def save_variants(im: Image.Image, stem: str) -> dict:
    icc = im.info.get("icc_profile")
    extra = {"icc_profile": icc} if icc else {}
    w, h = im.size
    im.save(OUT / f"{stem}.jpg", "JPEG", quality=88, progressive=True, optimize=True, subsampling=0, **extra)
    im.save(OUT / f"{stem}.webp", "WEBP", quality=86, method=6, **extra)
    if w > SMALL_WIDTH:
        small = im.resize((SMALL_WIDTH, round(h * SMALL_WIDTH / w)), Image.LANCZOS)
        small.save(OUT / f"{stem}-{SMALL_WIDTH}.webp", "WEBP", quality=84, method=6, **extra)
    return {"width": w, "height": h}


def extract_monogram() -> Image.Image:
    """Lift the black BA artwork off its paper background as an alpha mask.

    The letterforms are untouched: every pixel's opacity is derived directly
    from how dark it is in the original artwork.
    """
    rgb = np.asarray(Image.open(SRC / MONOGRAM_SRC).convert("RGB")).astype(np.float32)
    lum = rgb.mean(axis=2)
    paper = float(np.median(lum))
    ink = float(np.percentile(lum, 0.2))
    alpha = np.clip((paper - 6 - lum) / (paper - 6 - ink), 0, 1)
    alpha[alpha < 0.03] = 0

    ys, xs = np.where(alpha > 0.05)
    pad = 10
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad + 1, alpha.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad + 1, alpha.shape[1])
    alpha = alpha[y0:y1, x0:x1]

    a = Image.fromarray((alpha * 255).round().astype(np.uint8), "L")
    out = Image.new("RGBA", a.size, BROWN + (0,))
    out.putalpha(a)
    return out


def tinted(mark: Image.Image, color: tuple) -> Image.Image:
    out = Image.new("RGBA", mark.size, color + (0,))
    out.putalpha(mark.getchannel("A"))
    return out


def icon(mark: Image.Image, size: int, scale: float = 0.72) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), CREAM + (255,))
    w, h = mark.size
    f = (size * scale) / max(w, h)
    m = mark.resize((max(1, round(w * f)), max(1, round(h * f))), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


def social_card(mark: Image.Image) -> None:
    """1200x630 sharing card: monogram on cream beside the pergola portrait."""
    card = Image.new("RGB", (1200, 630), CREAM)
    photo = load("IMG_1057.jpeg")
    # Show the couple from just above their heads down past the waist.
    pw = 560
    scale = pw / photo.width
    resized = photo.resize((pw, round(photo.height * scale)), Image.LANCZOS)
    top = round(250 * scale)
    card.paste(resized.crop((0, top, pw, top + 630)), (1200 - pw, 0))
    m_h = 250
    m = mark.resize((round(mark.width * m_h / mark.height), m_h), Image.LANCZOS)
    card.paste(m, ((1200 - pw - m.width) // 2, (630 - m.height) // 2), m)
    card.save(PUBLIC / "og-image.jpg", "JPEG", quality=88, progressive=True, optimize=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src, stem in PHOTOS.items():
        dims = save_variants(load(src), stem)
        print(f"{src:45s} -> {stem}  {dims['width']}x{dims['height']}")

    mark = extract_monogram()
    mark.save(OUT / "monogram.png", optimize=True)
    tinted(mark, CREAM).save(OUT / "monogram-cream.png", optimize=True)
    print(f"{MONOGRAM_SRC:45s} -> monogram.png  {mark.width}x{mark.height}")

    icon(mark, 180).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
    icon(mark, 512).save(PUBLIC / "icon-512.png", optimize=True)
    icon(mark, 32, 0.86).save(PUBLIC / "favicon-32.png", optimize=True)
    icon(mark, 64, 0.86).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    social_card(mark)
    print("icons + og-image.jpg written")


if __name__ == "__main__":
    main()
