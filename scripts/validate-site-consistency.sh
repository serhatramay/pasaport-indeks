#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INDEX_FILE="$ROOT_DIR/index.html"
COUNTRY_FILE="$ROOT_DIR/ulke.html"
COUNTRY_JS="$ROOT_DIR/js/country.js"
APP_JS="$ROOT_DIR/js/app.js"
DATA_FILE="$ROOT_DIR/js/data.js"

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
require_file "$APP_JS"
require_file "$DATA_FILE"

echo "1) Temel veri dogrulamasi..."
bash "$ROOT_DIR/scripts/validate-data.sh" || issues=1

echo "2) Asset surum tutarliligi..."
index_css_ver="$(extract_version "$INDEX_FILE" 'css/style\.css')"
country_css_ver="$(extract_version "$COUNTRY_FILE" 'css/style\.css')"
index_data_ver="$(extract_version "$INDEX_FILE" 'js/data\.js')"
country_data_ver="$(extract_version "$COUNTRY_FILE" 'js/data\.js')"
index_app_ver="$(extract_version "$INDEX_FILE" 'js/app\.js')"

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

if [[ -z "$index_app_ver" ]]; then
  echo "HATA: index.html icinde app.js versiyonu bulunamadi."
  issues=1
fi

echo "3) Metrik etiket tutarliligi..."
require_pattern "$INDEX_FILE" 'TR Hızlı Erişim' 'Ana sayfada "TR Hızlı Erişim" etiketi yok.'
require_pattern "$INDEX_FILE" 'ulke/turkiye/#country-visa-breakdown' 'Ana sayfada TR hizli erisim linki dogru hedefe gitmiyor.'
require_pattern "$COUNTRY_FILE" 'id="country-visa-breakdown"' 'ulke.html icinde country-visa-breakdown id eksik.'
require_pattern "$COUNTRY_JS" 'Toplam Erişim \(E-Vize Dahil\)' 'country.js icinde "Toplam Erişim (E-Vize Dahil)" etiketi eksik.'
require_pattern "$APP_JS" "stat-visa-free'\\)\\.textContent = turkiye\\.vizesiz \\+ turkiye\\.varistaSiz" 'app.js icinde TR hizli erisim formulu (vizesiz + varista) eksik.'
require_pattern "$COUNTRY_JS" 'const totalAccess = counts\.vizesiz \+ counts\.varista \+ counts\.evize' 'country.js icinde toplam erisim formulu (vizesiz + varista + evize) eksik.'
require_pattern "$APP_JS" 'return `ulke/\$\{slug\}/`;' 'app.js ulke detay linkleri temiz URL yapisina gecmemis.'
require_pattern "$COUNTRY_JS" 'function getCleanCountryPath' 'country.js temiz URL fonksiyonu eksik.'

echo "4) TR metrik sayi tutarliligi..."
if ! rg -q 'kod: "TR"' "$DATA_FILE"; then
  echo "HATA: data.js icinde TR satiri bulunamadi."
  issues=1
else
  tr_values="$(perl -ne '
    if(/kod: "TR".*vizesiz: ([0-9]+), varistaSiz: ([0-9]+), evize: ([0-9]+), vizeGerekli: ([0-9]+), puan: ([0-9]+)/){
      print "$1 $2 $3 $4 $5\n";
      exit 0;
    }
  ' "$DATA_FILE")"
  if [[ -z "$tr_values" ]]; then
    echo "HATA: TR satiri parse edilemedi."
    issues=1
  else
    read -r tr_vizesiz tr_varista tr_evize tr_vize tr_puan <<<"$tr_values"
    tr_fast=$((tr_vizesiz + tr_varista))
    tr_total=$((tr_vizesiz + tr_varista + tr_evize))
    if [[ "$tr_puan" -ne "$tr_total" ]]; then
      echo "HATA: TR puani toplam erisimle uyusmuyor. puan=$tr_puan toplam=$tr_total"
      issues=1
    fi
    if [[ "$tr_fast" -gt "$tr_total" ]]; then
      echo "HATA: TR hizli erisim toplam erisimden buyuk olamaz. hizli=$tr_fast toplam=$tr_total"
      issues=1
    fi
    echo "OK: TR hizli=$tr_fast toplam=$tr_total puan=$tr_puan"
  fi
fi

echo "5) Filtre davranis kurallari..."
require_pattern "$INDEX_FILE" 'data-filter="all"' 'Ana sayfada "Tümü" filtresi bulunamadi.'
require_pattern "$INDEX_FILE" 'data-filter="visa-free"' 'Ana sayfada "Yuksek Vizesiz" filtresi bulunamadi.'
require_pattern "$INDEX_FILE" 'data-filter="top-20"' 'Ana sayfada "Ilk 20" filtresi bulunamadi.'
require_pattern "$APP_JS" "passportFilterState\\.mode === 'top-20'" 'app.js icinde top-20 filtre mantigi bulunamadi.'
require_pattern "$APP_JS" "slice\\(0, 20\\)" 'app.js top-20 limiti 20 olarak bulunamadi.'
require_pattern "$APP_JS" "passportFilterState\\.mode === 'visa-free'" 'app.js icinde vizesiz filtre mantigi bulunamadi.'
require_pattern "$APP_JS" 'VISA_FREE_HIGHLIGHT_THRESHOLD = [0-9]+' 'app.js icinde vizesiz esik degeri bulunamadi.'

threshold="$(rg -o 'VISA_FREE_HIGHLIGHT_THRESHOLD = [0-9]+' "$APP_JS" | awk '{print $3}' | head -n1 || true)"
if [[ -z "$threshold" ]]; then
  echo "HATA: Vizesiz esik degeri parse edilemedi."
  issues=1
else
  total_rows="$(rg -c '^\s*\{\s*kod:' "$DATA_FILE")"
  high_rows="$(THRESHOLD="$threshold" perl -ne '
    BEGIN{
      $t = $ENV{THRESHOLD} || 0;
      $c = 0;
    }
    if(/^\s*\{\s*kod: "[A-Z]{2}".*vizesiz: ([0-9]+),/){
      $c++ if $1 >= $t;
    }
    END{
      print "$c\n";
    }
  ' "$DATA_FILE")"
  if [[ "$high_rows" -le 0 ]]; then
    echo "HATA: Vizesiz filtresi icin esigi gecen ulke yok. esik=$threshold"
    issues=1
  fi
  if [[ "$high_rows" -ge "$total_rows" ]]; then
    echo "HATA: Vizesiz filtresi tum ulkeleri kapsiyor. esik=$threshold total=$total_rows"
    issues=1
  fi
  echo "OK: Filtre sayilari total=$total_rows visa_free_threshold=$threshold high=$high_rows top20=20"
fi

echo "6) Rota ve detay baglanti dogrulamasi..."
require_pattern "$INDEX_FILE" 'id="rota-planlayici"' 'Ana sayfada rota bolum id="rota-planlayici" eksik.'
require_pattern "$INDEX_FILE" 'href="#rota-planlayici"' 'Ust menu Rota linki yanlis hedefe gidiyor.'
if rg -q 'trip-city-summary|Birden fazla şehir seçebilirsin' "$INDEX_FILE"; then
  echo "HATA: Rota bolumunde kaldirilmasi gereken sehir aciklama/ozet metni hala var."
  issues=1
fi
require_pattern "$COUNTRY_JS" 'planner-links' 'country.js icinde rota kaynak linkleri bolumu eksik.'
require_pattern "$COUNTRY_JS" 'Uçuş Ara' 'country.js icinde "Uçuş Ara" baglantisi eksik.'
require_pattern "$COUNTRY_JS" 'Konaklama Ara' 'country.js icinde "Konaklama Ara" baglantisi eksik.'
require_pattern "$COUNTRY_JS" 'Haritada Aç' 'country.js icinde "Haritada Aç" baglantisi eksik.'

echo "7) Temiz URL sayfalari ve sitemap..."
require_pattern "$ROOT_DIR/sitemap.xml" '/ulke/' 'sitemap temiz URL ulke girdileri icermiyor.'
require_pattern "$ROOT_DIR/sitemap.xml" '<loc>https://serhatramay.github.io/pasaport-indeks/ulke/turkiye/</loc>' 'sitemap icinde turkiye temiz URL kaydi yok.'
if [[ ! -f "$ROOT_DIR/ulke/turkiye/index.html" ]]; then
  echo "HATA: ulke/turkiye/index.html dosyasi bulunamadi."
  issues=1
fi
if [[ ! -f "$ROOT_DIR/scripts/generate_country_pages.py" ]]; then
  echo "HATA: scripts/generate_country_pages.py dosyasi bulunamadi."
  issues=1
fi

echo "8) Detay sayfa icerik kalite ve UI tutarliligi..."
require_pattern "$COUNTRY_FILE" 'id="country-knowledge-grid"' 'ulke.html icinde knowledge grid alani eksik.'
require_pattern "$COUNTRY_JS" 'İçerik Kalitesi Özeti' 'country.js icinde icerik kalite ozeti karti eksik.'
require_pattern "$COUNTRY_JS" 'grid\.dataset\.editorialStatus' 'country.js icinde editorial status dataset isaretleme eksik.'
require_pattern "$COUNTRY_JS" 'knowledge-card-economy' 'country.js icinde ekonomi kart sinifi eksik.'
require_pattern "$COUNTRY_JS" 'knowledge-card-policy' 'country.js icinde politika kart sinifi eksik.'
require_pattern "$COUNTRY_FILE" 'id="breadcrumb-continent-link"' 'ulke.html icinde breadcrumb kitasal link eksik.'
require_pattern "$COUNTRY_JS" 'breadcrumbContinentLink' 'country.js icinde breadcrumb kitasal link guncellemesi eksik.'
require_pattern "$ROOT_DIR/css/style.css" 'knowledge-card-quality' 'style.css icinde kalite karti stili eksik.'
require_pattern "$ROOT_DIR/css/style.css" 'quality-pill' 'style.css icinde kalite rozet stili eksik.'

if [[ "$issues" -ne 0 ]]; then
  echo "Sonuc: Tutarlilik dogrulamasi BASARISIZ."
  exit 1
fi

echo "Sonuc: Tutarlilik dogrulamasi BASARILI."
