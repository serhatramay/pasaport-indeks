# pasaport-indeks
Türkiye'nin ilk Türkçe Pasaport Güç Endeksi. Ülkelerin vize durumu, pasaport sıralaması ve karşılaştırma aracı.

## Veri Dogrulama
`js/data.js` icin hizli kalite kontrolu:

```bash
./scripts/validate-data.sh
```

Kontroller:
- Beyan edilen ulke sayisi vs gercek kayit sayisi
- Tekrarlanan `kod` (ISO2) ve `iso3`
- `puan = vizesiz + varistaSiz + evize`
- `vizesiz + varistaSiz + evize + vizeGerekli = 198`

## Harita Vize Verisi
- Harita, ulke-ulke vize durumlarini CSV kaynagindan yukler:
- `https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv`
- Kaynakta olmayan veya yuklenemeyen kayitlar haritada `Veri yok` olarak gorunur.

## Sprint-1 Yol Haritasi
- Ulke detay modulu (`ulke.html` + `js/country.js`) ile tek ulke analiz ekrani
- Ana sayfadan detay sayfasina gecis (`Detay` linkleri)
- Sıralama satirlarini tiklanabilir/klavye erisilebilir hale getirme
- Gercek vize iliski verisi icin `VISA_MAP` kapsamini genisletme
- Veri guncelleme akisi: kaynak dosya -> dogrulama -> yayin adimlari
