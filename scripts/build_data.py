#!/usr/bin/env python3
import csv
import datetime as dt
import pathlib
import re
import urllib.request

CSV_URL = "https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv"
ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "js" / "data.js"


ROW_RE = re.compile(
    r'\{\s*kod:\s*"(?P<kod>[^"]+)",\s*ulke:\s*"(?P<ulke>[^"]+)",\s*bayrak:\s*"(?P<bayrak>[^"]+)",\s*'
    r'vizesiz:\s*(?P<vizesiz>\d+),\s*varistaSiz:\s*(?P<varista>\d+),\s*evize:\s*(?P<evize>\d+),\s*'
    r'vizeGerekli:\s*(?P<vize>\d+),\s*puan:\s*(?P<puan>\d+),\s*sira:\s*(?P<sira>\d+),\s*'
    r'nufus:\s*"(?P<nufus>[^"]*)",\s*iso3:\s*"(?P<iso3>[^"]+)"\s*\}'
)

TURKIYE_GECMIS_RE = re.compile(
    r"(// Turkiye pasaportu yillik puan gecmisi\s*const TURKIYE_GECMIS = \[[\s\S]*?\];)",
    re.MULTILINE,
)


def map_requirement(raw):
    value = (raw or "").strip().lower().replace('"', "")
    if not value:
        return None
    if value.isdigit():
        return "vizesiz"
    if value == "visa free" or "visa free" in value or "no visa" in value:
        return "vizesiz"
    if value == "eta" or "electronic travel authorization" in value:
        return "vizesiz"
    if value == "visa on arrival":
        return "varista"
    if value == "e-visa":
        return "evize"
    if value == "visa required":
        return "vize"
    return None


def parse_existing():
    text = DATA_FILE.read_text(encoding="utf-8")
    rows = []
    for m in ROW_RE.finditer(text):
        d = m.groupdict()
        rows.append(
            {
                "kod": d["kod"],
                "ulke": d["ulke"],
                "bayrak": d["bayrak"],
                "nufus": d["nufus"],
                "iso3": d["iso3"],
                "old_counts": {
                    "vizesiz": int(d["vizesiz"]),
                    "varista": int(d["varista"]),
                    "evize": int(d["evize"]),
                    "vize": int(d["vize"]),
                },
            }
        )

    if not rows:
        raise RuntimeError("Mevcut data.js kayitlari parse edilemedi.")

    tr_hist = TURKIYE_GECMIS_RE.search(text)
    tr_hist_block = tr_hist.group(1) if tr_hist else ""
    return rows, tr_hist_block


def load_csv_matrix(valid_passports):
    req = urllib.request.Request(CSV_URL, headers={"User-Agent": "pasaport-indeks-build-script/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        csv_text = resp.read().decode("utf-8")

    matrix = {}
    all_destinations = set()

    reader = csv.DictReader(csv_text.splitlines())
    for row in reader:
        passport = (row.get("passport") or "").strip()
        destination = (row.get("destination") or "").strip()
        requirement = row.get("requirement")

        if passport not in valid_passports:
            continue
        if not destination:
            continue
        if passport == destination:
            continue

        status = map_requirement(requirement)
        if not status:
            continue

        matrix.setdefault(passport, {})[destination] = status
        all_destinations.add(destination)

    return matrix, len(all_destinations)


def compute_rows(existing_rows, matrix):
    enriched = []
    for row in existing_rows:
        src = matrix.get(row["iso3"])
        if src:
            counts = {"vizesiz": 0, "varista": 0, "evize": 0, "vize": 0}
            for status in src.values():
                counts[status] += 1
        else:
            counts = row["old_counts"]

        score = counts["vizesiz"] + counts["varista"] + counts["evize"]
        enriched.append(
            {
                "kod": row["kod"],
                "ulke": row["ulke"],
                "bayrak": row["bayrak"],
                "vizesiz": counts["vizesiz"],
                "varistaSiz": counts["varista"],
                "evize": counts["evize"],
                "vizeGerekli": counts["vize"],
                "puan": score,
                "nufus": row["nufus"],
                "iso3": row["iso3"],
            }
        )

    enriched.sort(key=lambda x: (-x["puan"], -x["vizesiz"], -x["varistaSiz"], -x["evize"], x["ulke"]))
    rank = 0
    last_score = None
    for item in enriched:
        if item["puan"] != last_score:
            rank += 1
            last_score = item["puan"]
        item["sira"] = rank
    return enriched


def build_output(rows, tr_hist_block, coverage_target):
    today = dt.date.today().isoformat()
    lines = []
    lines.append("// Pasaport Endeksi - Ulke Verileri (%d Ulke)" % len(rows))
    lines.append("// Kaynak: Kamuya acik vize verileri, %s guncellemesi" % dt.date.today().year)
    lines.append("const DATA_INFO = {")
    lines.append(f'  generatedAt: "{today}",')
    lines.append('  sourceName: "passport-index-dataset (ilyankou)",')
    lines.append('  sourceUrl: "https://github.com/ilyankou/passport-index-dataset",')
    lines.append('  methodology: "Pasaport puanı = vizesiz + varışta vize + e-vize.",')
    lines.append(f"  coverageTarget: {coverage_target},")
    lines.append('  note: "Farklı endeksler farklı metodoloji kullanır; bu tablo iç metodoloji ile hesaplanır.",')
    lines.append("  comparisons: [")
    lines.append('    { key: "local", label: "Pasaport Endeksi (Bu Site)", sourceType: "Açık CSV veri + iç puanlama", refreshModel: "Elle/scriptten üretim", checkedAt: "%s", url: "https://serhatramay.github.io/pasaport-indeks/" },' % today)
    lines.append('    { key: "henley", label: "Henley Passport Index", sourceType: "Kendi metodolojisi", refreshModel: "Periyodik editoryal güncelleme", checkedAt: "%s", url: "https://www.henleyglobal.com/passport-index" },' % today)
    lines.append('    { key: "arton", label: "Arton Capital Passport Index", sourceType: "Kendi metodolojisi", refreshModel: "Canlı/periodik güncelleme", checkedAt: "%s", url: "https://www.passportindex.org/" }' % today)
    lines.append("  ]")
    lines.append("};")
    lines.append("")
    lines.append("const PASAPORT_DATA = [")

    for row in rows:
        lines.append(
            '  { kod: "%s", ulke: "%s", bayrak: "%s", vizesiz: %d, varistaSiz: %d, evize: %d, vizeGerekli: %d, puan: %d, sira: %d, nufus: "%s", iso3: "%s" },'
            % (
                row["kod"],
                row["ulke"],
                row["bayrak"],
                row["vizesiz"],
                row["varistaSiz"],
                row["evize"],
                row["vizeGerekli"],
                row["puan"],
                row["sira"],
                row["nufus"],
                row["iso3"],
            )
        )

    lines.append("];")
    lines.append("")
    if tr_hist_block:
        lines.append(tr_hist_block)
        lines.append("")
    lines.append("// %d ulke verisi tamamlandi" % len(rows))
    lines.append("")
    return "\n".join(lines)


def main():
    existing_rows, tr_hist_block = parse_existing()
    valid_passports = {r["iso3"] for r in existing_rows}
    matrix, destination_count = load_csv_matrix(valid_passports)
    rows = compute_rows(existing_rows, matrix)
    output = build_output(rows, tr_hist_block, max(198, destination_count))
    DATA_FILE.write_text(output, encoding="utf-8")
    print("data.js guncellendi: %d ulke, coverageTarget=%d" % (len(rows), max(198, destination_count)))


if __name__ == "__main__":
    main()
