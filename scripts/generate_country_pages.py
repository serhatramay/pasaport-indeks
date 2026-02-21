#!/usr/bin/env python3
import html
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
    pattern = re.compile(
        r'\{\s*kod:\s*"([A-Z]{2})",\s*ulke:\s*"([^"]+)",\s*bayrak:\s*"([^"]+)",\s*'
        r'vizesiz:\s*([0-9]+),\s*varistaSiz:\s*([0-9]+),\s*evize:\s*([0-9]+),\s*'
        r'vizeGerekli:\s*([0-9]+),\s*puan:\s*([0-9]+),\s*sira:\s*([0-9]+),\s*'
        r'nufus:\s*"([^"]+)",\s*iso3:\s*"([A-Z]{3})"\s*\}'
    )
    countries = []
    for match in pattern.findall(raw):
        code, name, flag, vizesiz, varista, evize, vize, puan, sira, nufus, iso3 = match
        countries.append({
            "code": code,
            "name": name,
            "flag": flag,
            "slug": slugify_tr(name),
            "vizesiz": int(vizesiz),
            "varista": int(varista),
            "evize": int(evize),
            "vize": int(vize),
            "puan": int(puan),
            "sira": int(sira),
            "nufus": nufus,
            "iso3": iso3,
        })

    uniq = {}
    for item in countries:
        uniq[item["code"]] = item
    return sorted(uniq.values(), key=lambda x: x["slug"])


def build_faq_items(country: dict):
    name = country["name"]
    total_access = country["vizesiz"] + country["varista"] + country["evize"]
    fast_access = country["vizesiz"] + country["varista"]
    items = [
        (
            f"{name} pasaportu ile toplam kaç ülkeye erişim var?",
            f"{name} pasaportu ile toplam {total_access} ülkeye erişim bulunur. "
            f"Bu toplam, vizesiz + varışta vize + e-vize kategorilerinin toplamıdır.",
        ),
        (
            f"{name} pasaportu ile hızlı erişim kaç ülke?",
            f"Hızlı erişim (vizesiz + varışta vize) toplamı {fast_access} ülkedir.",
        ),
        (
            f"{name} için e-vize ve klasik vize dağılımı nasıl?",
            f"E-vize gereken ülke sayısı {country['evize']}, önceden vize gereken ülke sayısı {country['vize']}.",
        ),
        (
            f"{name} pasaportunun dünya sırası kaç?",
            f"{name} pasaportu bu veri modelinde dünya sıralamasında #{country['sira']} konumundadır.",
        ),
        (
            "Bu sayfadaki pasaport puanı nasıl hesaplanıyor?",
            "Pasaport puanı = vizesiz ülke + varışta vize ülke + e-vize ülke.",
        ),
    ]
    return items


def render_country_html(template: str, country: dict) -> str:
    code = country["code"]
    name = country["name"]
    flag = country["flag"]
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
    og_image = f"{BASE_URL}/img/og-image.svg"
    faq_items = build_faq_items(country)
    faq_html = "".join(
        f'<details class="faq-item"><summary>{html.escape(question)}</summary><p>{html.escape(answer)}</p></details>'
        for question, answer in faq_items
    )
    faq_jsonld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {"@type": "Answer", "text": answer},
            }
            for question, answer in faq_items
        ],
    }

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
        r'(<meta property="og:image" content=")[^"]*(">)',
        r"\1" + og_image + r"\2",
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
    out = re.sub(
        r'(<meta name="twitter:image" content=")[^"]*(">)',
        r"\1" + og_image + r"\2",
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
    breadcrumb_jsonld = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Pasaport Endeksi",
                "item": f"{BASE_URL}/",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Ülkeler",
                "item": f"{BASE_URL}/#siralama",
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": name,
                "item": canonical,
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Vize Durumu",
                "item": f"{canonical}#country-visa-breakdown",
            },
        ],
    }
    out = re.sub(
        r'(<script type="application/ld\+json" id="country-jsonld">\s*)(.*?)(\s*</script>)',
        r"\1" + json.dumps(jsonld, ensure_ascii=False) + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<script type="application/ld\+json" id="country-breadcrumb-jsonld">\s*)(.*?)(\s*</script>)',
        r"\1" + json.dumps(breadcrumb_jsonld, ensure_ascii=False) + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<script type="application/ld\+json" id="country-faq-jsonld">\s*)(.*?)(\s*</script>)',
        r"\1" + json.dumps(faq_jsonld, ensure_ascii=False) + r"\3",
        out,
        count=1,
        flags=re.S,
    )

    out = re.sub(r"<body>", f'<body data-country-code="{code}" data-country-slug="{slug}">', out, count=1)
    out = re.sub(
        r'(<div class="passport-country" id="passport-country">)(.*?)(</div>)',
        r"\1" + html.escape(name.upper()) + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<div class="passport-code" id="passport-code">)(.*?)(</div>)',
        r"\1" + html.escape(code) + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<div class="passport-stamp" id="passport-flag">)(.*?)(</div>)',
        r"\1" + html.escape(flag) + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<h1 id="country-title">)(.*?)(</h1>)',
        r"\1" + html.escape(f"{name} Pasaport, Vize ve Yaşam Rehberi") + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<a id="breadcrumb-country-link" href=")([^"]*)(">\s*)(.*?)(\s*</a>)',
        r"\1" + canonical + r"\3" + html.escape(name) + r"\5",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<p class="hero-subtitle" id="country-subtitle">)(.*?)(</p>)',
        r"\1" + html.escape(f"{name} pasaportunun global erişim gücü, vize dağılımı ve seyahat profili.") + r"\3",
        out,
        count=1,
        flags=re.S,
    )
    out = re.sub(
        r'(<div class="country-faq-list" id="country-faq-list">)(.*?)(</div>)',
        r"\1" + faq_html + r"\3",
        out,
        count=1,
        flags=re.S,
    )
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
