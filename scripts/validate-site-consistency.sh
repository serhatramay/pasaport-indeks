#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INDEX_FILE="$ROOT_DIR/index.html"
COUNTRY_FILE="$ROOT_DIR/ulke.html"
COUNTRY_JS="$ROOT_DIR/js/country.js"

issues=0

require_file() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    echo "HATA: Dosya bulunamadi: $file"
    exit 1
  fi
}

require_pattern() {
  local file="$1"
  local pattern="$2"
  local message="$3"
  if ! rg -q "$pattern" "$file"; then
    echo "HATA: $message"
    issues=1
  fi
}

extract_version() {
  local file="$1"
  local asset="$2"
  local ver
  ver="$(rg -o "${asset}\?v=[0-9-]+" "$file" | sed -E 's/.*\?v=//' | head -n1 || true)"
  echo "$ver"
}

echo "Site tutarlilik dogrulamasi basladi..."

require_file "$INDEX_FILE"
require_file "$COUNTRY_FILE"
require_file "$COUNTRY_JS"

echo "1) Temel veri dogrulamasi..."
"$ROOT_DIR/scripts/validate-data.sh" || issues=1

echo "2) Asset surum tutarliligi..."
index_css_ver="$(extract_version "$INDEX_FILE" 'css/style\.css')"
country_css_ver="$(extract_version "$COUNTRY_FILE" 'css/style\.css')"
index_data_ver="$(extract_version "$INDEX_FILE" 'js/data\.js')"
country_data_ver="$(extract_version "$COUNTRY_FILE" 'js/data\.js')"

if [[ -z "$index_css_ver" || -z "$country_css_ver" ]]; then
  echo "HATA: CSS versiyonu bir dosyada bulunamadi."
  issues=1
elif [[ "$index_css_ver" != "$country_css_ver" ]]; then
  echo "HATA: CSS versiyonlari farkli. index=$index_css_ver ulke=$country_css_ver"
  issues=1
fi

if [[ -z "$index_data_ver" || -z "$country_data_ver" ]]; then
  echo "HATA: data.js versiyonu bir dosyada bulunamadi."
  issues=1
elif [[ "$index_data_ver" != "$country_data_ver" ]]; then
  echo "HATA: data.js versiyonlari farkli. index=$index_data_ver ulke=$country_data_ver"
  issues=1
fi

echo "3) Metrik etiket tutarliligi..."
require_pattern "$INDEX_FILE" 'TR Hızlı Erişim' 'Ana sayfada "TR Hızlı Erişim" etiketi yok.'
require_pattern "$INDEX_FILE" 'ulke\.html\?code=TR#country-visa-breakdown' 'Ana sayfada TR hizli erisim linki dogru hedefe gitmiyor.'
require_pattern "$COUNTRY_FILE" 'id="country-visa-breakdown"' 'ulke.html icinde country-visa-breakdown id eksik.'
require_pattern "$COUNTRY_JS" 'Toplam Erişim \(E-Vize Dahil\)' 'country.js icinde "Toplam Erişim (E-Vize Dahil)" etiketi eksik.'

if [[ "$issues" -ne 0 ]]; then
  echo "Sonuc: Tutarlilik dogrulamasi BASARISIZ."
  exit 1
fi

echo "Sonuc: Tutarlilik dogrulamasi BASARILI."
