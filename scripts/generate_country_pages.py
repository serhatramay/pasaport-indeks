#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "js" / "data.js"
ULKE_TEMPLATE = ROOT / "ulke.html"
OUT_DIR = ROOT / "ulke"
SITEMAP = ROOT / "sitemap.xml"
BASE_URL = "https://serhatramay.github.io/pasaport-indeks"
LASTMOD = "2026-02-20"


def slugify_tr(value: str) -> str:
    text = value.lower().strip()
    table = str.maketrans({
        "ç": "c",
        "ğ": "g",
        "ı": "i",
        "ö": "o",
        "ş": "s",
        "ü": "u",
        "â": "a",
        "î": "i",
        "û": "u",
    })
    text = text.translate(table)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text or "ulke"


def parse_countries():
    raw = DATA_JS.read_text(encoding="utf-8")
    pattern = re.compile(r'\{\s*kod:\s*"([A-Z]{2})",\s*ulke:\s*"([^"]+)"')
    countries = []
    for code, name in pattern.findall(raw):
        countries.append({"code": code, "name": name, "slug": slugify_tr(name)})

    uniq = {}
    for item in countries:
        uniq[item["code"]] = item
    return sorted(uniq.values(), key=lambda x: x["slug"])


def render_country_html(template: str, country: dict) -> str:
    code = country["code"]
    name = country["name"]
    slug = country["slug"]
    canonical = f"{BASE_URL}/ulke/{slug}/"
    title = f"{name} Pasaport, Vize ve Yaşam Rehberi 2026 | Pasaport Endeksi"
    description = (
        f"{name} için pasaport gücü, vize dağılımı, yaşam maliyeti, asgari ücret, "
        f"uçuş ve seyahat planlama rehberi."
    )
    keywords = (
        f"{name} pasaport, {name} vize, {name} yaşam maliyeti, {name} asgari ücret, "
        f"{name} nasıl gidilir, {name} uçak bileti"
    )

    out = template
    out = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", out, count=1, flags=re.S)
    out = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{description}">',
        out,
        count=1,
    )
    if 'meta name="keywords"' not in out:
        out = out.replace(
            '<meta name="description" content="' + description + '">',
            '<meta name="description" content="' + description + '">\n    '
            + f'<meta name="keywords" content="{keywords}">'
        )
    else:
        out = re.sub(
            r'<meta name="keywords" content="[^"]*">',
            f'<meta name="keywords" content="{keywords}">',
            out,
            count=1,
        )

    out = re.sub(
        r'(<link rel="canonical" id="canonical-link" href=")[^"]*(">)',
        r"\1" + canonical + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<link rel="alternate" hreflang="tr-TR" href=")[^"]*(">)',
        r"\1" + canonical + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<link rel="alternate" hreflang="x-default" href=")[^"]*(">)',
        r"\1" + canonical + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<meta property="og:url" id="og-url" content=")[^"]*(">)',
        r"\1" + canonical + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<meta property="og:title" id="og-title" content=")[^"]*(">)',
        r"\1" + title + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<meta property="og:description" id="og-description" content=")[^"]*(">)',
        r"\1" + description + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<meta name="twitter:title" id="twitter-title" content=")[^"]*(">)',
        r"\1" + title + r"\2",
        out,
        count=1,
    )
    out = re.sub(
        r'(<meta name="twitter:description" id="twitter-description" content=")[^"]*(">)',
        r"\1" + description + r"\2",
        out,
        count=1,
    )

    jsonld = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "url": canonical,
        "inLanguage": "tr",
        "about": {"@type": "Place", "name": name},
    }
    out = re.sub(
        r'(<script type="application/ld\+json" id="country-jsonld">\s*)(.*?)(\s*</script>)',
        r"\1" + json.dumps(jsonld, ensure_ascii=False) + r"\3",
        out,
        count=1,
        flags=re.S,
    )

    out = re.sub(r"<body>", f'<body data-country-code="{code}" data-country-slug="{slug}">', out, count=1)
    out = out.replace('href="css/style.css', 'href="../../css/style.css')
    out = out.replace('src="js/data.js', 'src="../../js/data.js')
    out = out.replace('src="js/country-profiles.js', 'src="../../js/country-profiles.js')
    out = out.replace('src="js/country.js', 'src="../../js/country.js')
    out = out.replace('href="./"', 'href="../../"')
    out = out.replace('href="./#siralama"', 'href="../../#siralama"')
    out = out.replace('href="./"', 'href="../../"')
    out = out.replace('href="#ulke-ozet"', 'href="#ulke-ozet"')
    return out


def write_country_pages(countries):
    template = ULKE_TEMPLATE.read_text(encoding="utf-8")
    OUT_DIR.mkdir(exist_ok=True)
    for c in countries:
        page_dir = OUT_DIR / c["slug"]
        page_dir.mkdir(parents=True, exist_ok=True)
        html = render_country_html(template, c)
        (page_dir / "index.html").write_text(html, encoding="utf-8")


def write_sitemap(countries):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        "  <url>",
        f"    <loc>{BASE_URL}/</loc>",
        f"    <lastmod>{LASTMOD}</lastmod>",
        "    <changefreq>daily</changefreq>",
        "    <priority>1.0</priority>",
        "  </url>",
        "  <url>",
        f"    <loc>{BASE_URL}/ulke.html</loc>",
        f"    <lastmod>{LASTMOD}</lastmod>",
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.5</priority>",
        "  </url>",
    ]
    for c in countries:
        lines.extend([
            "  <url>",
            f"    <loc>{BASE_URL}/ulke/{c['slug']}/</loc>",
            f"    <lastmod>{LASTMOD}</lastmod>",
            "    <changefreq>weekly</changefreq>",
            "    <priority>0.8</priority>",
            "  </url>",
        ])
    lines.append("</urlset>")
    SITEMAP.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    countries = parse_countries()
    write_country_pages(countries)
    write_sitemap(countries)
    print(f"Generated {len(countries)} country pages under ulke/<slug>/")
    print("Sitemap updated with clean URLs.")


if __name__ == "__main__":
    main()
