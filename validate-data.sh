#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_FILE="$ROOT_DIR/js/data.js"

if [[ ! -f "$DATA_FILE" ]]; then
  echo "Hata: data dosyasi bulunamadi: $DATA_FILE"
  exit 1
fi

echo "Veri dogrulama basladi: $DATA_FILE"
issues=0

declared_count="$(sed -n '1s/.*(\([0-9][0-9]*\) Ulke).*/\1/p' "$DATA_FILE")"
actual_count="$(rg -c '^\s*\{\s*kod:' "$DATA_FILE")"

if [[ -n "$declared_count" && "$declared_count" != "$actual_count" ]]; then
  echo "UYARI: Beyan edilen ulke sayisi ($declared_count) ile kayit sayisi ($actual_count) farkli."
  issues=1
fi

dup_kod="$(rg -o 'kod: "[A-Z]{2}"' "$DATA_FILE" | sed 's/kod: "//;s/"//' | sort | uniq -cd | sort -nr || true)"
if [[ -n "$dup_kod" ]]; then
  echo "HATA: Tekrarlanan ISO2 kodlari bulundu:"
  echo "$dup_kod"
  issues=1
fi

dup_iso3="$(rg -o 'iso3: "[A-Z]{3}"' "$DATA_FILE" | sed 's/iso3: "//;s/"//' | sort | uniq -cd | sort -nr || true)"
if [[ -n "$dup_iso3" ]]; then
  echo "HATA: Tekrarlanan ISO3 kodlari bulundu:"
  echo "$dup_iso3"
  issues=1
fi

math_report="$(
  perl -ne '
    if(/\{\s*kod: "([A-Z]{2})".*vizesiz: (\d+), varistaSiz: (\d+), evize: (\d+), vizeGerekli: (\d+), puan: (\d+),/){
      $rows++;
      $total=$2+$3+$4+$5;
      $point=$2+$3+$4;
      if($total!=198){print "HATA: toplam!=198 line $. kod=$1 total=$total\n"; $bad_total++}
      if($point!=$6){print "HATA: puan uyusmuyor line $. kod=$1 hesap=$point puan=$6\n"; $bad_point++}
    }
    END{
      $bad_total ||= 0;
      $bad_point ||= 0;
      print "rows=$rows bad_total=$bad_total bad_point=$bad_point\n";
    }
  ' "$DATA_FILE"
)"
echo "$math_report"

if grep -q 'HATA:' <<<"$math_report"; then
  issues=1
fi

if [[ "$issues" -ne 0 ]]; then
  echo "Sonuc: Dogrulama BASARISIZ."
  exit 1
fi

echo "Sonuc: Dogrulama BASARILI."
