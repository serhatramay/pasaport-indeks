# pasaport-indeks
Türkiye'nin Türkçe Pasaport Güç Endeksi. Ülkelerin vize durumu, pasaport sıralaması ve karşılaştırma aracı.

## Metodoloji
- Puan formülü: `puan = vizesiz + varistaSiz + evize`
- Kapsam kontrolü: `vizesiz + varistaSiz + evize + vizeGerekli = 198`
- Sıralama: puan yüksekten düşüğe (eşitlikte aynı sıra)

Not:
- Farklı pasaport endeksleri farklı metodoloji kullandığı için sıralamalar birebir aynı olmayabilir.

## Veri Kaynağı
- Ana kaynak CSV:
  `https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv`
- Harita ve detay görünümü mümkün olduğunda aynı CSV mantığını kullanır.

## Veri Güncelleme Akışı
1. `js/data.js` dosyasını script ile üret:
```bash
python3 scripts/build_data.py
```
2. Hızlı doğrulama çalıştır:
```bash
./scripts/validate-data.sh
```
3. Sayfalar arası tutarlılık doğrulaması çalıştır:
```bash
./scripts/validate-site-consistency.sh
```
4. Değişiklikleri commit/publish et.

## Doğrulama Kontrolleri
- Beyan edilen ülke sayısı vs gerçek kayıt sayısı
- Tekrarlanan `kod` (ISO2) ve `iso3`
- `puan = vizesiz + varistaSiz + evize`
- `vizesiz + varistaSiz + evize + vizeGerekli = 198`
- `index.html` ve `ulke.html` için asset versiyon tutarlılığı (`css/style.css`, `js/data.js`)
- Ana/Detay etiketlerinin tutarlılığı (`TR Hızlı Erişim`, `Toplam Erişim (E-Vize Dahil)`)
